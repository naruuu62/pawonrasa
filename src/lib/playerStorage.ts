import { ChefProfile } from '@/types';
import { syncProfileToSupabase } from './supabase';

const STORAGE_KEY = 'pawonrasa_chef_profile_v3';

export const CHEF_TITLES = [
  { minLevel: 1, title: 'Juru Masak Pemula' },
  { minLevel: 2, title: 'Juru Masak Madya' },
  { minLevel: 3, title: 'Pande Rasa Keraton' },
  { minLevel: 5, title: 'Patih Gastronomi Sriwijaya' },
  { minLevel: 8, title: 'Mahaguru Dapur Nusantara' }
];

export function getTitleForLevel(level: number): string {
  const match = [...CHEF_TITLES].reverse().find(t => level >= t.minLevel);
  return match ? match.title : 'Juru Masak Pemula';
}

function generatePlayerId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return 'chef_' + crypto.randomUUID().slice(0, 8);
  }
  return 'chef_' + Math.random().toString(36).substring(2, 10);
}

export function getInitialProfile(): ChefProfile {
  return {
    id: generatePlayerId(),
    name: 'Koki Pawon',
    avatar: '🧑🏽‍🍳',
    region: 'Jawa',
    level: 1,
    title: 'Juru Masak Pemula',
    exp: 150,
    expToNextLevel: 300,
    coins: 80,
    completedRecipes: ['pindang-patin'],
    unlockedCodexCards: ['kluwek', 'kunyit_parut', 'asam_kandis']
  };
}

export function loadChefProfile(): ChefProfile {
  if (typeof window === 'undefined') return getInitialProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Migrasi dari v2 jika ada
      const legacyRaw = localStorage.getItem('pawonrasa_chef_profile_v2');
      let profile = getInitialProfile();
      if (legacyRaw) {
        try {
          const legacy = JSON.parse(legacyRaw);
          profile = {
            ...profile,
            level: legacy.level || 1,
            title: legacy.title || 'Juru Masak Pemula',
            exp: legacy.exp || 150,
            expToNextLevel: legacy.expToNextLevel || 300,
            coins: legacy.coins || 80,
            completedRecipes: legacy.completedRecipes || ['pindang-patin'],
            unlockedCodexCards: legacy.unlockedCodexCards || ['kluwek', 'kunyit_parut', 'asam_kandis']
          };
        } catch {}
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      syncProfileToSupabase(profile).catch(() => {});
      return profile;
    }

    const parsed: ChefProfile = JSON.parse(raw);
    if (!parsed.id) {
      parsed.id = generatePlayerId();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return getInitialProfile();
  }
}

export function saveChefProfile(profile: ChefProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    // Dispatch custom event for same-window reactive updates
    window.dispatchEvent(new Event('pawonrasa_profile_updated'));

    // Asynchronous background sync ke Supabase
    syncProfileToSupabase(profile).catch(err => {
      console.warn('Background sync ke Supabase tertunda:', err);
    });
  } catch (e) {
    console.error('Failed to save chef profile', e);
  }
}

export function updateChefIdentity(name: string, region: string, avatar?: string): ChefProfile {
  const current = loadChefProfile();
  const updated: ChefProfile = {
    ...current,
    name: name.trim() || current.name || 'Koki Pawon',
    region: region.trim() || current.region || 'Nusantara',
    avatar: avatar || current.avatar || '🧑🏽‍🍳'
  };
  saveChefProfile(updated);
  return updated;
}

export function addRewardsToProfile(expEarned: number, coinsEarned: number, recipeId: string): {
  newProfile: ChefProfile;
  didLevelUp: boolean;
  newTitle?: string;
} {
  const current = loadChefProfile();
  let updatedExp = current.exp + expEarned;
  let updatedLevel = current.level;
  let expThreshold = updatedLevel * 200;
  let didLevelUp = false;

  while (updatedExp >= expThreshold) {
    updatedExp -= expThreshold;
    updatedLevel += 1;
    expThreshold = updatedLevel * 200;
    didLevelUp = true;
  }

  const updatedCompleted = Array.from(new Set([...current.completedRecipes, recipeId]));
  const newTitle = getTitleForLevel(updatedLevel);

  const newProfile: ChefProfile = {
    ...current,
    level: updatedLevel,
    title: newTitle,
    exp: updatedExp,
    expToNextLevel: expThreshold,
    coins: current.coins + coinsEarned,
    completedRecipes: updatedCompleted
  };

  saveChefProfile(newProfile);
  return { newProfile, didLevelUp, newTitle: didLevelUp ? newTitle : undefined };
}
