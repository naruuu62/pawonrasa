export type HeatLevel = 'low' | 'medium' | 'high';

export interface FlavorProfile {
  savory: number; // 0 - 100 (Gurih)
  spicy: number;  // 0 - 100 (Pedas)
  sour: number;   // 0 - 100 (Asam)
  sweet: number;  // 0 - 100 (Manis)
}

export type IngredientCategory = 
  | 'rempah_basah' 
  | 'rempah_kering' 
  | 'protein' 
  | 'sayur_buah' 
  | 'penyedap';

export interface Ingredient {
  id: string;
  name: string;
  localName: string;
  category: IngredientCategory;
  categoryLabel: string;
  emoji: string;
  imageUrl?: string;
  color: string;
  description: string;
  flavorImpact: Partial<FlavorProfile>;
  soupColorEffect?: string; // Hex color contribution to broth
  originRegion: string;
  culturalNote: string;
  medicinalBenefit: string;
}

export interface GuestCharacter {
  id: string;
  name: string;
  title: string;
  avatar: string;
  personality: string;
  dialogueIdle: string;
  dialogueHappy: string;
  dialogueDisappointed: string;
  dialogueSpicy: string;
}

export interface Recipe {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  region: 'Sumatera' | 'Jawa' | 'Bali & NTB' | 'Sulawesi' | 'Maluku & Papua' | 'Kalimantan';
  difficulty: 1 | 2 | 3;
  cookTime: string;
  heroImage?: string;
  description: string;
  culturalStory: string;
  culturalTrivia: string;
  guest: GuestCharacter;
  idealHeat: HeatLevel;
  requiredIngredients: string[];
  optionalIngredients: string[];
  forbiddenIngredients: string[];
  targetFlavors: FlavorProfile;
  baseSoupColor: string;
}

export interface CookingSession {
  recipeId: string;
  addedIngredients: string[];
  stoveHeatLevel: HeatLevel;
  playerId?: string;
  playerName?: string;
  playerRegion?: string;
}

export interface ChefProfile {
  id?: string;
  name?: string;
  avatar?: string;
  region?: string;
  level: number;
  title: string;
  exp: number;
  expToNextLevel: number;
  coins: number;
  completedRecipes: string[];
  unlockedCodexCards: string[];
}

export interface AIJudgmentResponse {
  accuracy_score: number;
  customer_reaction: 'happy' | 'spicy_overload' | 'disappointed' | 'confused';
  review_title: string;
  review_comment: string;
  flavor_profile: FlavorProfile;
  cultural_trivia: string;
  exp_earned: number;
  coins_earned: number;
  mastery_unlocked?: boolean;
}

export interface SpiceCard {
  id: string;
  name: string;
  latinName: string;
  localName: string;
  region: string;
  category: string;
  emoji: string;
  tagline: string;
  history: string;
  harvestMethod: string;
  medicinalHealth: string;
  culinaryUse: string;
  rarity: 'Common' | 'Pusaka' | 'Legendaris';
}

export interface SpicePort {
  id: string;
  name: string;
  era: string;
  region: string;
  coordinates: { x: number; y: number }; // percentage on SVG map
  primaryCommodity: string;
  historicalTradeLore: string;
  connectedRecipeId: string;
  signatureDishName: string;
  rulerKingdom: string;
}

export interface LeaderboardUser {
  id?: string;
  rank: number;
  name: string;
  title: string;
  avatar: string;
  region: string;
  exp: number;
  masteredCount: number;
  badge: string;
  accuracyRate?: number;
  is_bot?: boolean;
  isCurrentUser?: boolean;
}
