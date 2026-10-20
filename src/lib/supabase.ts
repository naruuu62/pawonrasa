import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ChefProfile, LeaderboardUser } from '@/types';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || !url.startsWith('https://')) {
    return null;
  }

  try {
    supabaseInstance = createClient(url, anonKey);
    return supabaseInstance;
  } catch (err) {
    console.warn('Gagal menginisialisasi client Supabase:', err);
    return null;
  }
}

// Sinkronisasi profil koki ke Supabase (tabel public.profiles dan public.leaderboard)
export async function syncProfileToSupabase(profile: ChefProfile): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase || !profile.id) return false;

  try {
    // 1. Upsert ke tabel profiles
    const { error: profileErr } = await supabase.from('profiles').upsert({
      id: profile.id,
      name: profile.name || 'Koki Pawon',
      avatar: profile.avatar || '🧑🏽‍🍳',
      region: profile.region || 'Nusantara',
      level: profile.level,
      title: profile.title,
      exp: profile.exp,
      coins: profile.coins,
      completed_recipes: profile.completedRecipes || [],
      unlocked_codex_cards: profile.unlockedCodexCards || [],
      updated_at: new Date().toISOString()
    });

    if (profileErr) {
      console.warn('Supabase profiles upsert error:', profileErr.message);
    }

    // 2. Upsert ke tabel leaderboard
    const { error: lbErr } = await supabase.from('leaderboard').upsert({
      id: profile.id,
      name: profile.name || 'Koki Pawon',
      title: profile.title || 'Juru Masak Pemula',
      avatar: profile.avatar || '🧑🏽‍🍳',
      region: profile.region || 'Nusantara',
      exp: profile.exp,
      mastered_count: (profile.completedRecipes || []).length,
      accuracy_rate: Math.min(99, 70 + Math.floor(profile.level * 4)),
      is_bot: false,
      badge: profile.level >= 5 ? '⭐ Koki Mahir Nusantara' : '🏅 Koki Berbakat',
      updated_at: new Date().toISOString()
    });

    if (lbErr) {
      console.warn('Supabase leaderboard upsert error:', lbErr.message);
    }

    return !profileErr && !lbErr;
  } catch (e) {
    console.warn('Exception saat sinkronisasi Supabase:', e);
    return false;
  }
}

// Simpan sesi memasak ke tabel public.cooking_sessions
export async function recordCookingSessionSupabase(data: {
  playerId: string;
  playerName: string;
  recipeId: string;
  recipeName: string;
  accuracyScore: number;
  customerReaction: string;
  reviewTitle?: string;
  reviewComment?: string;
  heatLevel: string;
  ingredientsUsed: string[];
  expEarned: number;
  coinsEarned: number;
}): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('cooking_sessions').insert({
      player_id: data.playerId,
      player_name: data.playerName,
      recipe_id: data.recipeId,
      recipe_name: data.recipeName,
      accuracy_score: data.accuracyScore,
      customer_reaction: data.customerReaction,
      review_title: data.reviewTitle,
      review_comment: data.reviewComment,
      heat_level: data.heatLevel,
      ingredients_used: data.ingredientsUsed,
      exp_earned: data.expEarned,
      coins_earned: data.coinsEarned
    });

    if (error) {
      console.warn('Supabase cooking_sessions insert error:', error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('Exception saat mencatat sesi masak ke Supabase:', e);
    return false;
  }
}

// Tarik data leaderboard langsung dari Supabase
export async function fetchLiveLeaderboard(): Promise<LeaderboardUser[] | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('exp', { ascending: false })
      .limit(50);

    if (error || !data || data.length === 0) {
      if (error) console.warn('Supabase fetch leaderboard error:', error.message);
      return null;
    }

    // Beri nomor peringkat dinamis 1, 2, 3...
    return data.map((item: any, index: number) => ({
      id: item.id,
      rank: index + 1,
      name: item.name,
      title: item.title,
      avatar: item.avatar || '🧑🏽‍🍳',
      region: item.region || 'Nusantara',
      exp: item.exp || 0,
      masteredCount: item.mastered_count || 0,
      badge: item.badge || '🏅 Koki Berbakat',
      accuracyRate: item.accuracy_rate || 90,
      is_bot: Boolean(item.is_bot)
    }));
  } catch (e) {
    console.warn('Exception fetch live leaderboard:', e);
    return null;
  }
}
