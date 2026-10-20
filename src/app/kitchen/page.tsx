'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { RECIPES } from '@/data/recipes';
import { INGREDIENTS } from '@/data/ingredients';
import { CookingSession, HeatLevel, AIJudgmentResponse } from '@/types';
import ClayPot from '@/components/ClayPot';
import GuestPortrait from '@/components/GuestPortrait';
import EvaluationModal from '@/components/EvaluationModal';
import { calculateRealtimeFlavors, calculateDynamicBrothColor } from '@/lib/tasteEngine';
import { addRewardsToProfile, loadChefProfile } from '@/lib/playerStorage';
import { soundFx } from '@/lib/sound';
import { IngredientSvg } from '@/components/IngredientSvgs';

function KitchenContent() {
  const searchParams = useSearchParams();
  const recipeParam = searchParams.get('recipe');

  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(
    recipeParam && RECIPES.some(r => r.id === recipeParam) ? recipeParam : 'pindang-patin'
  );

  const currentRecipe = RECIPES.find(r => r.id === selectedRecipeId) || RECIPES[0];

  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [heatLevel, setHeatLevel] = useState<HeatLevel>('medium');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isJudging, setIsJudging] = useState<boolean>(false);
  const [judgmentResult, setJudgmentResult] = useState<AIJudgmentResponse | null>(null);

  // Dynamic Countdown Timer Logic
  const getInitialTime = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 180; // 03:00
      case 2: return 165; // 02:45
      case 3: return 150; // 02:30
      default: return 165;
    }
  };

  const [timeLeft, setTimeLeft] = useState<number>(() => getInitialTime(currentRecipe.difficulty));
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Reset timer whenever recipe changes
  useEffect(() => {
    const initial = getInitialTime(currentRecipe.difficulty);
    setTimeLeft(initial);
    setIsTimerActive(true);
  }, [selectedRecipeId, currentRecipe.difficulty]);

  // When recipe param changes
  useEffect(() => {
    if (recipeParam && RECIPES.some(r => r.id === recipeParam)) {
      setSelectedRecipeId(recipeParam);
      setAddedIngredients([]);
      setJudgmentResult(null);
    }
  }, [recipeParam]);

  // Countdown Interval Effect
  useEffect(() => {
    if (!isTimerActive || isJudging || judgmentResult) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, isJudging, judgmentResult]);

  // Handle adding ingredient
  const handleAddIngredient = (ingredientId: string) => {
    soundFx.playDropIngredient();
    setAddedIngredients(prev => [...prev, ingredientId]);
  };

  // Handle removing ingredient
  const handleRemoveIngredient = (index: number) => {
    soundFx.playWoodClick();
    setAddedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleResetPot = () => {
    soundFx.playWoodClick();
    setAddedIngredients([]);
    setJudgmentResult(null);
    setTimeLeft(getInitialTime(currentRecipe.difficulty));
    setIsTimerActive(true);
  };

  // Dynamic Broth Color
  const brothColor = calculateDynamicBrothColor(addedIngredients, currentRecipe.baseSoupColor);

  // Realtime Flavor Profile
  const currentFlavors = calculateRealtimeFlavors(addedIngredients, heatLevel);

  // Filtered ingredients for the bamboo pantry shelf
  const filteredIngredients = INGREDIENTS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Handle serving to customer
  const handleServe = async () => {
    setIsTimerActive(false);
    setIsJudging(true);
    const player = loadChefProfile();
    const session: CookingSession = {
      recipeId: currentRecipe.id,
      addedIngredients,
      stoveHeatLevel: heatLevel,
      playerId: player.id,
      playerName: player.name,
      playerRegion: player.region
    };

    try {
      const response = await fetch('/api/taste-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      });

      const data: AIJudgmentResponse = await response.json();
      setJudgmentResult(data);

      // Save rewards
      addRewardsToProfile(data.exp_earned, data.coins_earned, currentRecipe.id);
    } catch (e) {
      console.error('Failed to evaluate taste:', e);
    } finally {
      setIsJudging(false);
    }
  };

  // Automatically serve when timer runs out (0 seconds)
  useEffect(() => {
    if (timeLeft === 0 && !isJudging && !judgmentResult) {
      handleServe();
    }
  }, [timeLeft, isJudging, judgmentResult]);

  const handleCookAgain = () => {
    setAddedIngredients([]);
    setJudgmentResult(null);
    setTimeLeft(getInitialTime(currentRecipe.difficulty));
    setIsTimerActive(true);
  };

  // Timer & Coin Display Calculation
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isUrgent = timeLeft <= 30 && timeLeft > 0;
  const isTimeOut = timeLeft === 0;

  const initialTime = getInitialTime(currentRecipe.difficulty);
  const baseCoins = currentRecipe.difficulty * 60;
  const speedBonusCoins = Math.round((timeLeft / initialTime) * 30);
  const estimatedTotalCoins = baseCoins + speedBonusCoins;

  return (
    <div className="flex-1 w-full bg-background min-h-[calc(100vh-80px)] flex flex-col p-3 sm:p-5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-3 flex-1">
        
        {/* Top Kitchen Status Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-surface-container-low px-4 py-3 rounded-2xl shadow-sm border border-outline-variant/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-[0_3px_0_0_#ca8a04] shrink-0">
              <span className="material-symbols-outlined text-[24px]">soup_kitchen</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-on-surface truncate">
                  Studio Dapur PawonRasa
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-extrabold">
                  Resep Aktif
                </span>
              </div>
              <span className="text-xs text-on-surface-variant truncate">
                Tantangan Pesanan: Kuah Kuning {currentRecipe.name} • {currentRecipe.origin}
              </span>
            </div>
          </div>

          {/* Kitchen Meta Chips & Recipe Switcher */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* Quick Switch Recipe buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-surface-container px-2 py-1 rounded-xl">
              {RECIPES.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    soundFx.playWoodClick();
                    setSelectedRecipeId(r.id);
                    setAddedIngredients([]);
                    setJudgmentResult(null);
                  }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all ${
                    selectedRecipeId === r.id
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {r.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Dynamic Countdown Timer Chip */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                isUrgent
                  ? 'bg-red-50 text-red-700 border border-red-300 shadow-[0_2px_0_0_#b91c1c] animate-pulse'
                  : isTimeOut
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-[0_2px_0_0_#ca8a04]'
                  : 'bg-surface-container text-on-surface shadow-[0_2px_0_0_#ca8a04]'
              }`}
              title={isUrgent ? 'Waktu memasak hampir habis! Tamu sudah lapar!' : 'Sisa waktu tantangan memasak'}
            >
              <span className={`material-symbols-outlined text-[16px] ${
                isUrgent ? 'text-red-600 animate-spin' : 'text-secondary'
              }`}>
                {isUrgent ? 'alarm' : 'timer'}
              </span>
              <span className="text-xs font-black tracking-wider">{formattedTime}</span>
              {isUrgent && (
                <span className="text-[10px] font-black uppercase text-red-600 hidden md:inline">Cepat!</span>
              )}
            </div>

            {/* Dynamic Estimated Coins Chip */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container shadow-[0_2px_0_0_#ca8a04]"
              title={`Estimasi Hadiah: ${baseCoins} Koin resep + ${speedBonusCoins} Koin bonus kecepatan`}
            >
              <span className="material-symbols-outlined text-primary text-[16px]">monetization_on</span>
              <span className="text-xs text-on-surface font-extrabold">+{estimatedTotalCoins} Koin</span>
            </div>

            <button
              onClick={handleResetPot}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-on-surface text-xs font-bold transition-all shadow-[0_2px_0_0_#ca8a04] active:translate-y-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>Mulai Ulang</span>
            </button>
          </div>
        </div>

        {/* Main 3-Column Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-start">
          
          {/* 1. LEFT PANEL: INGREDIENT PANTRY (3 Cols / 25%) */}
          <section className="lg:col-span-3 flex flex-col gap-2.5 bg-surface-container-low p-3.5 rounded-2xl shadow-sm border border-outline-variant/30 h-full max-h-[720px] overflow-hidden">
            {/* Shelf Header */}
            <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🎋</span>
                  <span className="text-sm font-extrabold text-on-surface">Rak Rempah</span>
                </div>
                <span className="text-[10px] text-on-surface-variant font-medium">Klik bahan segar untuk meracik</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-black">
                {addedIngredients.length} Masuk
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'protein', label: 'Protein' },
                { id: 'rempah_basah', label: 'Rimpang' },
                { id: 'rempah_kering', label: 'Biji' },
                { id: 'sayur_buah', label: 'Asam/Buah' },
                { id: 'penyedap', label: 'Perasa' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundFx.playWoodClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 2-Column Chunky Tactile Cards Grid */}
            <div className="grid grid-cols-2 gap-2 overflow-y-auto flex-1 pr-1">
              {filteredIngredients.map(item => {
                const countInPot = addedIngredients.filter(id => id === item.id).length;
                const isRequired = currentRecipe.requiredIngredients.includes(item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleAddIngredient(item.id)}
                    className="group flex flex-col items-center justify-between p-2 bg-surface-container-lowest rounded-xl shadow-[0_3px_0_0_#ca8a04] hover:shadow-[0_1px_0_0_#ca8a04] hover:translate-y-0.5 active:translate-y-1 transition-all text-left w-full h-32 sm:h-36 border border-outline-variant/30"
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="px-1.5 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[9px] font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">add</span>
                        {isRequired ? 'Kunci' : 'Rempah'}
                      </span>
                      {countInPot > 0 && (
                        <span className="w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-black flex items-center justify-center">
                          {countInPot}
                        </span>
                      )}
                    </div>

                    {/* Illustrated Icon / Visual Vector from Stitch */}
                    <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform shadow-inner">
                      <IngredientSvg id={item.id} className="w-full h-full object-contain drop-shadow" />
                    </div>

                    <div className="w-full text-center">
                      <span className="text-xs text-on-surface font-extrabold block truncate">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-on-surface-variant truncate block">
                        {item.localName}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Shelf Tip */}
            <div className="p-2 rounded-xl bg-surface-container flex items-start gap-1.5 border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">lightbulb</span>
              <p className="text-[10px] text-on-surface-variant leading-tight">
                <strong className="text-on-surface">Tips Dapur:</strong> Masukkan bumbu kunci untuk mendongkrak akurasi rasa leluhur hingga 100%!
              </p>
            </div>
          </section>

          {/* 2. CENTER STAGE: ACTIVE COOKING POT (6 Cols / 50%) */}
          <section className="lg:col-span-6 flex flex-col items-center justify-between bg-surface-container-low p-3.5 sm:p-5 rounded-2xl shadow-sm border border-outline-variant/30 min-h-[580px] relative overflow-hidden">
            <ClayPot
              recipe={currentRecipe}
              addedIngredients={addedIngredients}
              heatLevel={heatLevel}
              onRemoveIngredient={handleRemoveIngredient}
              onChangeHeat={setHeatLevel}
              onServe={handleServe}
              brothColor={brothColor}
            />
          </section>

          {/* 3. RIGHT PANEL: CUSTOMER & AI TASTE RADAR (3 Cols / 25%) */}
          <section className="lg:col-span-3 flex flex-col h-full max-h-[720px]">
            <GuestPortrait
              recipe={currentRecipe}
              guest={currentRecipe.guest}
              currentFlavors={currentFlavors}
              addedCount={addedIngredients.length}
            />
          </section>

        </div>
      </div>

      {/* Loading Tasting Overlay */}
      {isJudging && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-surface-container-lowest border-4 border-primary rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center max-w-sm">
            <div className="text-5xl animate-bounce mb-3">🍲</div>
            <h3 className="text-lg font-black text-inverse-surface mb-1">
              “Lidah Rasa AI” Sedang Mencicipi...
            </h3>
            <p className="text-xs text-on-surface-variant font-medium">
              Mengevaluasi keselarasan rempah, kelembutan bahan, dan keseimbangan rasa menurut tetua adat...
            </p>
          </div>
        </div>
      )}

      {/* Screen 3: Popup Modal Hasil & Evaluasi AI */}
      {judgmentResult && (
        <EvaluationModal
          recipe={currentRecipe}
          guest={currentRecipe.guest}
          result={judgmentResult}
          addedIngredients={addedIngredients}
          brothColor={brothColor}
          onCookAgain={handleCookAgain}
          onClose={() => setJudgmentResult(null)}
        />
      )}
    </div>
  );
}

export default function KitchenPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-background min-h-screen">
        <div className="text-center font-bold text-on-surface">
          <div className="text-4xl animate-bounce mb-2">🍲</div>
          Menyiapkan Studio Dapur PawonRasa...
        </div>
      </div>
    }>
      <KitchenContent />
    </Suspense>
  );
}
