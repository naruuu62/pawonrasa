'use client';

import React, { useState } from 'react';
import { HeatLevel, Ingredient, Recipe } from '@/types';
import { INGREDIENTS } from '@/data/ingredients';
import { soundFx } from '@/lib/sound';
import { Flame, X, ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';
import { IngredientSvg, SteamAnimationSvg } from '@/components/IngredientSvgs';

interface ClayPotProps {
  recipe: Recipe;
  addedIngredients: string[];
  heatLevel: HeatLevel;
  onRemoveIngredient: (index: number) => void;
  onChangeHeat: (level: HeatLevel) => void;
  onServe: () => void;
  brothColor: string;
  isSimmering?: boolean;
}

export default function ClayPot({
  recipe,
  addedIngredients,
  heatLevel,
  onRemoveIngredient,
  onChangeHeat,
  onServe,
  brothColor,
  isSimmering = true
}: ClayPotProps) {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleHeatChange = (level: HeatLevel) => {
    soundFx.playFlameSwitch(level);
    onChangeHeat(level);
  };

  const ingredientDetails = addedIngredients
    .map(id => INGREDIENTS.find(i => i.id === id))
    .filter(Boolean) as Ingredient[];

  // Floating slots configuration for ingredients in the pot
  const FLOATING_POSITIONS = [
    { left: '6%', top: '6%', width: 'w-24 h-16', anim: 'animate-bob-1' },
    { right: '6%', top: '8%', width: 'w-18 h-16', anim: 'animate-bob-2' },
    { left: '46%', bottom: '8%', width: 'w-20 h-14', anim: 'animate-bob-3' },
    { left: '16%', bottom: '12%', width: 'w-14 h-14', anim: 'animate-bob-2' },
    { right: '16%', bottom: '12%', width: 'w-14 h-14', anim: 'animate-bob-1' },
    { left: '48%', top: '6%', width: 'w-14 h-14', anim: 'animate-bob-3' },
    { left: '26%', top: '22%', width: 'w-14 h-14', anim: 'animate-bob-1' },
    { right: '26%', top: '22%', width: 'w-14 h-14', anim: 'animate-bob-2' },
    { left: '38%', bottom: '26%', width: 'w-12 h-12', anim: 'animate-bob-3' },
    { right: '38%', bottom: '26%', width: 'w-12 h-12', anim: 'animate-bob-1' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-between h-full w-full max-w-xl mx-auto px-2">
      {/* Pull-down Drawer: Petunjuk Resep Pusaka */}
      <div className="w-full relative z-30 mb-2">
        <button
          onClick={() => {
            soundFx.playWoodClick();
            setShowDrawer(!showDrawer);
          }}
          className="w-full flex items-center justify-between bg-surface-container-high border border-primary/20 px-3 py-1.5 rounded-2xl shadow-[0_2px_0_0_#ca8a04] text-xs font-extrabold text-on-surface hover:bg-surface-container transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px]">menu_book</span>
            <span className="truncate">Petunjuk Resep Pusaka: {recipe.name}</span>
          </div>
          {showDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDrawer && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-2xl p-3 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
            <h4 className="text-xs font-black text-on-surface mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[16px]">auto_awesome</span>
              Bahan Wajib Menurut Leluhur:
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {recipe.requiredIngredients.map(id => {
                const ing = INGREDIENTS.find(i => i.id === id);
                const isAdded = addedIngredients.includes(id);
                return (
                  <span
                    key={id}
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      isAdded
                        ? 'bg-tertiary-container/20 border-tertiary text-on-tertiary-container'
                        : 'bg-surface-container border-outline-variant text-on-surface-variant'
                    }`}
                  >
                    <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                      <IngredientSvg id={id} className="w-full h-full object-contain" />
                    </div>
                    <span>{ing?.name || id}</span>
                    {isAdded && <span className="text-tertiary">✓</span>}
                  </span>
                );
              })}
            </div>
            <div className="text-[11px] text-on-surface-variant bg-surface-container p-2.5 rounded-xl">
              💡 <strong>Suhu Ideal:</strong>{' '}
              {recipe.idealHeat === 'low'
                ? 'Api Kecil (Tanak) — Perlahan mematangkan serat daging'
                : recipe.idealHeat === 'medium'
                ? 'Api Sedang (Harum) — Menjaga asam alami nanas & aroma atsiri'
                : 'Api Besar (Golak) — Membakar aroma bumbu sangrai'}
            </div>
          </div>
        )}
      </div>

      {/* Status Chip Row & Active Tag Chips */}
      <div className="w-full flex flex-col items-center gap-1.5 z-10 mb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest shadow-[0_2px_0_0_#ca8a04]">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="text-[11px] font-extrabold text-on-surface uppercase tracking-wide">
              Status: Sedang Merebus
            </span>
          </div>
          <span className="text-[11px] font-bold text-on-surface-variant">
            Kuali Gerabah Tanah Liat #01
          </span>
        </div>

        {/* Floating Added Ingredients Badge Row */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center min-h-[28px] max-w-full">
          {ingredientDetails.length === 0 ? (
            <span className="text-[10px] text-on-surface-variant italic">
              Kuali masih kosong • Masukkan bumbu dari rak sebelah kiri
            </span>
          ) : (
            ingredientDetails.map((ing, idx) => (
              <span
                key={`${ing.id}-${idx}`}
                className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-primary text-[11px] font-bold shadow-[0_2px_0_0_#ca8a04] flex items-center gap-1.5 animate-in zoom-in-75"
              >
                <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                  <IngredientSvg id={ing.id} className="w-full h-full object-contain" />
                </div>
                <span className="truncate max-w-[80px]">{ing.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playWoodClick();
                    onRemoveIngredient(idx);
                  }}
                  title="Keluarkan bahan"
                  className="w-3.5 h-3.5 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary-container ml-0.5"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Main Center Stage: 2D Hand-Drawn Earthenware Claypot & Brazier */}
      <div className="relative w-full max-w-md h-72 my-auto flex items-center justify-center">
        {/* Ambient Warm Heat Glow */}
        <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-2xl pointer-events-none -z-0"></div>

        {/* Steam SVG Animation drifting upward from Stitch */}
        <div className="absolute -top-12 z-20 pointer-events-none opacity-85">
          <SteamAnimationSvg className="w-56 h-24" />
        </div>

        {/* Chunky Earthenware Claypot Assembly */}
        <div className="relative w-80 flex flex-col items-center">
          {/* Outer Pot Lid Handles */}
          <div className="absolute -left-5 top-12 w-6 h-10 rounded-l-2xl bg-primary shadow-[0_4px_0_0_#422a00] z-0"></div>
          <div className="absolute -right-5 top-12 w-6 h-10 rounded-r-2xl bg-primary shadow-[0_4px_0_0_#422a00] z-0"></div>

          {/* Main Clay Pot Body */}
          <div className={`relative w-72 h-44 rounded-[40px] bg-primary shadow-[0_8px_0_0_#422a00] flex flex-col items-center pt-2 z-10 overflow-hidden ${
            heatLevel === 'high' ? 'animate-pot-boil' : ''
          }`}>
            {/* Rim highlight */}
            <div className="w-64 h-5 rounded-full bg-primary-container opacity-40 mb-1"></div>

            {/* Broth Simmer Chamber */}
            <div 
              className="w-60 h-28 rounded-[28px] relative overflow-hidden shadow-inner flex items-center justify-center transition-colors duration-700"
              style={{ backgroundColor: brothColor || '#ca8a04' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ffea79_10%,_#eab308_55%,_#a16207_90%)] opacity-95"></div>
              <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_40%,_#fff_0%,_transparent_60%)] animate-pulse"></div>
              <div className="absolute -inset-2 opacity-20 rounded-full border-2 border-dashed border-white animate-spin" style={{ animationDuration: '22s' }}></div>

              {/* Dynamic Floating Ingredients inside Broth Chamber */}
              {ingredientDetails.length === 0 ? (
                <div className="z-20 text-[10px] sm:text-[11px] font-extrabold text-amber-950/80 bg-amber-100/75 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm animate-pulse border border-amber-400/40 pointer-events-none text-center">
                  Klik bahan di rak untuk memasukkan
                </div>
              ) : (
                ingredientDetails.map((item, idx) => {
                  const pos = FLOATING_POSITIONS[idx % FLOATING_POSITIONS.length];
                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      style={{
                        left: pos.left,
                        right: pos.right,
                        top: pos.top,
                        bottom: pos.bottom,
                        zIndex: 10 + idx,
                      }}
                      className={`absolute ${pos.width} ${pos.anim} cursor-pointer group flex items-center justify-center transition-all`}
                      title={`${item.name} (${item.localName}) — Klik untuk keluarkan`}
                      onClick={() => {
                        soundFx.playWoodClick();
                        onRemoveIngredient(idx);
                      }}
                    >
                      <div className="w-full h-full relative p-0.5 flex items-center justify-center">
                        <IngredientSvg
                          id={item.id}
                          className="w-full h-full object-contain drop-shadow transition-transform group-hover:scale-115"
                        />
                      </div>
                    </div>
                  );
                })
              )}

              {/* Bubbles animation */}
              <div className="absolute left-7 top-10 w-4 h-4 rounded-full bg-white/70 animate-bounce pointer-events-none z-20"></div>
              <div className="absolute right-10 top-7 w-3 h-3 rounded-full bg-white/60 animate-ping pointer-events-none z-20"></div>
              <div className="absolute left-28 bottom-3 w-3.5 h-3.5 rounded-full bg-white/75 animate-bounce pointer-events-none z-20"></div>
              <div className="absolute right-20 bottom-2.5 w-2.5 h-2.5 rounded-full bg-white/70 animate-ping pointer-events-none z-20"></div>

              {/* Status Ribbon in Broth */}
              <div className="z-30 px-2.5 py-0.5 rounded-full bg-primary/90 text-on-primary text-[10px] font-bold shadow-sm backdrop-blur-sm pointer-events-none border border-primary-fixed/30 mt-auto mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-ping"></span>
                Kuah {recipe.name.split(' ')[0]} Menggelegak
              </div>
            </div>
          </div>

          {/* Clay Charcoal Brazier (Anglo Tradisional) */}
          <div className="w-64 h-12 bg-surface-variant rounded-b-3xl shadow-[0_6px_0_0_#837562] -mt-2 z-0 flex items-center justify-center gap-3 relative">
            {/* Glowing Charcoal Embers Vents */}
            <div className={`w-12 h-4 rounded-full bg-secondary flex items-center justify-center transition-all ${
              heatLevel === 'high' ? 'shadow-[0_0_16px_#e02928] scale-110' : 'shadow-[0_0_10px_#bb0112]'
            }`}>
              <div className="w-6 h-2 rounded-full bg-primary-container animate-pulse"></div>
            </div>
            <div className={`w-12 h-4 rounded-full bg-secondary flex items-center justify-center transition-all ${
              heatLevel === 'high' ? 'shadow-[0_0_16px_#e02928] scale-110' : 'shadow-[0_0_10px_#bb0112]'
            }`}>
              <div className="w-6 h-2 rounded-full bg-primary-container animate-pulse"></div>
            </div>
            <div className={`w-12 h-4 rounded-full bg-secondary flex items-center justify-center transition-all ${
              heatLevel === 'high' ? 'shadow-[0_0_16px_#e02928] scale-110' : 'shadow-[0_0_10px_#bb0112]'
            }`}>
              <div className="w-6 h-2 rounded-full bg-primary-container animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls: Heat Control Levers & Big Red Serve Button */}
      <div className="w-full flex flex-col items-center gap-2 mt-auto pt-2 z-20">
        {/* Heat Control Levers */}
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 bg-surface-container-low px-2 sm:px-3 py-1.5 rounded-2xl shadow-[0_2px_0_0_#d5c4ae]">
          <span className="text-[10px] sm:text-[11px] font-extrabold text-on-surface-variant flex items-center gap-1 mr-0.5 sm:mr-1">
            <span className="material-symbols-outlined text-secondary text-[15px] sm:text-[16px]">local_fire_department</span>
            Api:
          </span>
          {(['low', 'medium', 'high'] as HeatLevel[]).map(level => {
            const isActive = heatLevel === level;
            const labels = {
              low: 'Kecil',
              medium: 'Sedang',
              high: 'Besar'
            };
            const fullLabels = {
              low: 'Kecil (Tanak)',
              medium: 'Sedang (Harum)',
              high: 'Besar (Golak)'
            };
            return (
              <button
                key={level}
                type="button"
                onClick={() => handleHeatChange(level)}
                className={`text-[11px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1 rounded-xl transition-all ${
                  isActive
                    ? level === 'high'
                      ? 'bg-secondary text-on-secondary shadow-[0_2px_0_0_#93000b]'
                      : level === 'medium'
                      ? 'bg-primary-container text-on-primary-container shadow-[0_2px_0_0_#422a00]'
                      : 'bg-tertiary text-on-tertiary shadow-[0_2px_0_0_#003814]'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="inline sm:hidden">{labels[level]}</span>
                <span className="hidden sm:inline">{fullLabels[level]}</span>
              </button>
            );
          })}
        </div>

        {/* Master Serve Button */}
        <button
          onClick={() => {
            soundFx.playVictoryChime();
            onServe();
          }}
          disabled={ingredientDetails.length === 0}
          className={`w-full max-w-sm py-3.5 px-6 text-sm font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 rounded-2xl shadow-[0_4px_0_0_#93000b] active:translate-y-1 active:shadow-none ${
            ingredientDetails.length === 0
              ? 'bg-surface-variant text-outline cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-secondary-container via-secondary to-secondary-container text-on-secondary hover:brightness-105'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">soup_kitchen</span>
          <span>SAJIKAN HIDANGAN KE PELANGGAN</span>
        </button>
      </div>
    </div>
  );
}
