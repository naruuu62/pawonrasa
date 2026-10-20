import { CookingSession, AIJudgmentResponse, FlavorProfile, HeatLevel } from '@/types';
import { RECIPES } from '@/data/recipes';
import { INGREDIENTS } from '@/data/ingredients';

export function calculateRealtimeFlavors(addedIngredientIds: string[], heatLevel: HeatLevel): FlavorProfile {
  let savory = 10;
  let spicy = 5;
  let sour = 5;
  let sweet = 10;

  addedIngredientIds.forEach(id => {
    const ing = INGREDIENTS.find(i => i.id === id);
    if (ing && ing.flavorImpact) {
      if (ing.flavorImpact.savory) savory += ing.flavorImpact.savory;
      if (ing.flavorImpact.spicy) spicy += ing.flavorImpact.spicy;
      if (ing.flavorImpact.sour) sour += ing.flavorImpact.sour;
      if (ing.flavorImpact.sweet) sweet += ing.flavorImpact.sweet;
    }
  });

  // Stove heat modifies spice and savory extraction
  if (heatLevel === 'high') {
    spicy = Math.round(spicy * 1.25);
    savory = Math.round(savory * 1.1);
  } else if (heatLevel === 'low') {
    sour = Math.round(sour * 1.15);
    sweet = Math.round(sweet * 1.1);
  }

  return {
    savory: Math.min(100, Math.max(0, savory)),
    spicy: Math.min(100, Math.max(0, spicy)),
    sour: Math.min(100, Math.max(0, sour)),
    sweet: Math.min(100, Math.max(0, sweet))
  };
}

export function calculateDynamicBrothColor(addedIngredientIds: string[], baseColor: string): string {
  if (addedIngredientIds.includes('kluwek')) {
    return '#1c1917'; // Deep black broth (Rawon)
  }
  if ((addedIngredientIds.includes('santan') || addedIngredientIds.includes('santan_kelapa')) &&
      (addedIngredientIds.includes('kunyit') || addedIngredientIds.includes('kunyit_parut'))) {
    return '#d97706'; // Rich yellow curry / opor / betutu
  }
  if (addedIngredientIds.includes('santan') || addedIngredientIds.includes('santan_kelapa')) {
    return '#fef3c7'; // Creamy santan
  }
  if (addedIngredientIds.filter(i => i === 'cabai_rawit' || i === 'cabai' || i === 'cabe').length >= 2) {
    return '#b91c1c'; // Fiery red
  }
  if (addedIngredientIds.includes('kunyit') || addedIngredientIds.includes('kunyit_parut')) {
    return '#eab308'; // Glowing turmeric yellow (Pindang)
  }
  if (addedIngredientIds.includes('kemiri') || addedIngredientIds.includes('kemiri_bakar')) {
    return '#d97706'; // Warm creamy amber
  }
  return baseColor || '#f59e0b';
}

export function calculateLocalScore(session: CookingSession): AIJudgmentResponse {
  const recipe = RECIPES.find(r => r.id === session.recipeId) || RECIPES[0];
  const added = session.addedIngredients || [];
  const heat = session.stoveHeatLevel;

  // 1. Calculate matching required ingredients
  const requiredCount = recipe.requiredIngredients.length;
  const matchedRequired = recipe.requiredIngredients.filter(req => added.includes(req));
  const missingRequired = recipe.requiredIngredients.filter(req => !added.includes(req));

  // 2. Check forbidden ingredients
  const hasForbidden = recipe.forbiddenIngredients.some(f => added.includes(f));

  // 3. Optional harmony bonus
  const matchedOptional = recipe.optionalIngredients.filter(opt => added.includes(opt));

  // Base accuracy calculation
  let score = Math.round((matchedRequired.length / requiredCount) * 80);

  // Bonus for optional harmony
  score += Math.min(12, matchedOptional.length * 4);

  // Heat penalty / bonus
  if (heat === recipe.idealHeat) {
    score += 8;
  } else if (Math.abs(['low', 'medium', 'high'].indexOf(heat) - ['low', 'medium', 'high'].indexOf(recipe.idealHeat)) === 2) {
    score -= 15; // Extreme temperature difference (e.g. rawon on high boil instead of low tanak)
  } else {
    score -= 5;
  }

  // Forbidden penalty
  if (hasForbidden) {
    score = Math.max(15, score - 35);
  }

  // Clamp score
  score = Math.min(100, Math.max(15, score));

  // Compute flavor radar
  const flavor = calculateRealtimeFlavors(added, heat);

  // Determine customer reaction and comments
  let reaction: AIJudgmentResponse['customer_reaction'] = 'happy';
  let title = 'Cita Rasa Leluhur Sempurna!';
  let comment = '';

  if (hasForbidden) {
    reaction = 'confused';
    title = 'Kombinasi Bumbu Tak Biasa!';
    comment = `Aroma masakan ini sedikit membingungkan karena adanya bumbu yang tidak lazim dalam pakem ${recipe.name}. Karakter kuah pusaka jadi tersamar.`;
  } else if (flavor.spicy > 85 && heat === 'high') {
    reaction = 'spicy_overload';
    title = 'Apinya Berkobar Terlalu Sengit!';
    comment = `Sensasi pedasnya menyengat lidah sampai berkeringat deras! Rasa gurih dan asamnya agak tenggelam di balik kobaran cabai dan api besar.`;
  } else if (score >= 85) {
    reaction = 'happy';
    title = 'Harum, Seimbang, dan Otentik!';
    comment = recipe.guest.dialogueHappy;
  } else if (score >= 65) {
    reaction = 'happy';
    title = 'Sudah Mendekati Resep Leluhur!';
    const missingNames = missingRequired
      .map(id => INGREDIENTS.find(i => i.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    comment = `Karakter kuah sudah sedap, namun akan lebih autentik jika ditambahkan ${missingNames || 'sedikit penyeimbang rasa'} dan dimatangkan pada suhu ${recipe.idealHeat === 'low' ? 'api kecil (tanak)' : recipe.idealHeat === 'medium' ? 'api sedang (harum)' : 'api besar (golak)'}.`;
  } else {
    reaction = 'disappointed';
    title = 'Kurang Harmoni Rempah Tradisional';
    const missingNames = missingRequired
      .map(id => INGREDIENTS.find(i => i.id === id)?.name)
      .filter(Boolean)
      .join(' dan ');
    comment = `Kuah masakan masih terasa hambar atau amis. Tetua adat merindukan aroma ${missingNames || 'rempah utama'} yang menjadi jiwa masakan ini.`;
  }

  const expEarned = Math.round((score / 100) * 120);
  const coinsEarned = Math.round((score / 100) * 45);

  return {
    accuracy_score: score,
    customer_reaction: reaction,
    review_title: title,
    review_comment: comment,
    flavor_profile: flavor,
    cultural_trivia: recipe.culturalTrivia,
    exp_earned: expEarned,
    coins_earned: coinsEarned,
    mastery_unlocked: score >= 85
  };
}
