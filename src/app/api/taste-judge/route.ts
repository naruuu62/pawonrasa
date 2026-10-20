import { NextRequest, NextResponse } from 'next/server';
import { CookingSession, AIJudgmentResponse } from '@/types';
import { calculateLocalScore } from '@/lib/tasteEngine';
import { RECIPES } from '@/data/recipes';
import { INGREDIENTS } from '@/data/ingredients';
import { recordCookingSessionSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body: CookingSession = await req.json();

    if (!body || !body.recipeId) {
      return NextResponse.json({ error: 'Data sesi memasak tidak valid' }, { status: 400 });
    }

    const recipe = RECIPES.find(r => r.id === body.recipeId) || RECIPES[0];
    const addedIngredientsFull = (body.addedIngredients || [])
      .map(id => INGREDIENTS.find(i => i.id === id)?.name)
      .filter(Boolean);

    const apiKey = process.env.GEMINI_API_KEY;
    let finalJudgment: AIJudgmentResponse | null = null;

    // If Gemini API Key is present, attempt call to Gemini 2.5 Flash
    if (apiKey) {
      try {
        const prompt = `Anda adalah "Lidah Rasa AI", juri kuliner tradisional Nusantara yang bertindak ramah, hangat, dan bijaksana ala game 2D indie cozy (seperti Good Pizza Great Pizza / Coffee Talk).
Nama Masakan yang dituju: ${recipe.name} (${recipe.origin})
Karakter Tamu: ${recipe.guest.name} (${recipe.guest.title})
Bahan Wajib Leluhur: ${recipe.requiredIngredients.join(', ')}
Tingkat Api Ideal: ${recipe.idealHeat}

Bahan yang dimasukkan pemain: [${addedIngredientsFull.join(', ')}]
Tingkat Api Kompor Pemain: ${body.stoveHeatLevel}

Tugas:
Analisis kecocokan kombinasi bahan dan api kompor pemain terhadap resep autentik asli.
Keluarkan respon HANYA dalam format JSON murni tanpa markdown triple-backticks dengan schema persis berikut:
{
  "accuracy_score": number (0-100),
  "customer_reaction": "happy" | "spicy_overload" | "disappointed" | "confused",
  "review_title": string (pendek dan bersemangat, e.g. "Harum dan Otentik!"),
  "review_comment": string (2-3 kalimat ulasan hangat dari sudut pandang tetua adat),
  "flavor_profile": { "savory": number (0-100), "spicy": number (0-100), "sour": number (0-100), "sweet": number (0-100) },
  "cultural_trivia": string (fakta budaya gastronomi nusantara tentang bahan/resep ini),
  "exp_earned": number (30-150),
  "coins_earned": number (10-50)
}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.3
              }
            }),
            signal: AbortSignal.timeout(5000) // 5s timeout for fast response
          }
        );

        if (res.ok) {
          const geminiData = await res.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed: AIJudgmentResponse = JSON.parse(rawText);
            parsed.coins_earned = parsed.coins_earned || Math.round((parsed.accuracy_score / 100) * 45);
            finalJudgment = parsed;
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call timed out or failed, falling back to local culinary engine:', geminiError);
      }
    }

    // Zero-Friction Local Culinary Fallback Engine jika Gemini belum/gagal
    if (!finalJudgment) {
      finalJudgment = calculateLocalScore(body);
    }

    // Rekam sesi memasak ke database Supabase secara asinkron
    if (body.playerId && finalJudgment) {
      recordCookingSessionSupabase({
        playerId: body.playerId,
        playerName: body.playerName || 'Koki Pawon',
        recipeId: recipe.id,
        recipeName: recipe.name,
        accuracyScore: finalJudgment.accuracy_score,
        customerReaction: finalJudgment.customer_reaction,
        reviewTitle: finalJudgment.review_title,
        reviewComment: finalJudgment.review_comment,
        heatLevel: body.stoveHeatLevel,
        ingredientsUsed: addedIngredientsFull as string[],
        expEarned: finalJudgment.exp_earned,
        coinsEarned: finalJudgment.coins_earned
      }).catch(err => {
        console.warn('Gagal mencatat cooking session ke Supabase:', err);
      });
    }

    return NextResponse.json(finalJudgment);
  } catch (err) {
    console.error('Taste judge API unexpected error:', err);
    // Absolute safety fallback
    return NextResponse.json({
      accuracy_score: 85,
      customer_reaction: 'happy',
      review_title: 'Harum dan Hangat!',
      review_comment: 'Kuah masakan sudah memiliki aroma rempah yang membangkitkan selera makan!',
      flavor_profile: { savory: 75, spicy: 50, sour: 70, sweet: 35 },
      cultural_trivia: 'Rempah nusantara diracik dengan harmoni untuk menyeimbangkan suhu tubuh.',
      exp_earned: 90,
      coins_earned: 30
    });
  }
}
