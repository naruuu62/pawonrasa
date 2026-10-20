'use client';

import React, { useState } from 'react';
import { FlavorProfile, GuestCharacter, Recipe } from '@/types';
import FlavorRadar from './FlavorRadar';

interface GuestPortraitProps {
  recipe: Recipe;
  guest: GuestCharacter;
  currentFlavors: FlavorProfile;
  addedCount: number;
}

export default function GuestPortrait({
  recipe,
  guest,
  currentFlavors,
  addedCount
}: GuestPortraitProps) {
  const [viewMode, setViewMode] = useState<'meters' | 'radar'>('meters');

  // Dynamic dialogue reaction
  let dynamicDialogue = guest.dialogueIdle;
  if (addedCount === 0) {
    dynamicDialogue = `“Kualinyo masih kosong nih, Cung. Masukkan bumbu rahasia khas ${recipe.origin} biar harum!”`;
  } else if (addedCount > 0 && addedCount < 3) {
    dynamicDialogue = `“Aroma bumbunyo mulai tercium pelan... jangan lupa nanas dan rimpang kuncinyo ya!”`;
  } else {
    dynamicDialogue = `“Harum Nian, Cung! Asam manis nanasnyo mulai meresap, kuah kuningnyo gurih sedap!”`;
  }

  return (
    <div className="flex flex-col gap-3 h-full overflow-y-auto pr-0.5">
      {/* 1. Customer Portrait & Dialogue Speech Card */}
      <div className="bg-surface-container-low p-3.5 rounded-2xl shadow-sm flex flex-col gap-2 relative border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
            Pemesan Meja #04
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[10px] font-extrabold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            Pelanggan Menanti
          </span>
        </div>

        {/* Portrait & Character Meta */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 rounded-2xl bg-surface-container-highest shadow-[0_3px_0_0_#ca8a04] flex items-center justify-center shrink-0 overflow-hidden ring-2 ring-primary-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2zd0Pbl3MUWK4SPNe0YWMOfFFxmcpk_RgJ1PJSFX6K099v0SZf_CvIvPEy5A8FVzrtnwUO04G_II9Ah376klRB7CUZ_b7ZmrJjAh-CZp-M_ikq4OrTb4YOXDSsfFlT6B_fYFrnubclkY8e8VKTIAXb597LOPyJu_OCxWjyxe3nAhDrwM80euSbvG-oV-YUAfNaAU4kKrsVas1iyzQONkU3id0XVTutI3YctIwX_zwwBEihOYuHzBM"
              alt={guest.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-sm font-extrabold text-on-surface truncate">
              {guest.name}
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              {guest.title}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] text-primary-container font-extrabold">⭐⭐⭐⭐⭐ 5.0</span>
              <span className="text-[10px] text-tertiary font-bold ml-0.5">(Puas)</span>
            </div>
          </div>
        </div>

        {/* Dialogue Speech Bubble */}
        <div className="relative mt-1 p-2.5 rounded-xl bg-surface-container-lowest shadow-[0_2px_0_0_#ca8a04] text-on-surface border border-outline-variant/30">
          <div className="absolute -top-1.5 left-6 w-3 h-3 bg-surface-container-lowest rotate-45 border-l border-t border-outline-variant/30"></div>
          <p className="text-xs text-on-surface font-medium italic leading-relaxed">
            {dynamicDialogue}
          </p>
        </div>
      </div>

      {/* 2. Lidah Rasa AI Flavor Meters & Radar */}
      <div className="bg-surface-container-low p-3.5 rounded-2xl shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
        <div className="flex items-center justify-between pb-1 border-b border-outline-variant/30">
          <div className="flex items-center gap-1.5">
            <span className="text-base">⚖️</span>
            <span className="text-xs font-extrabold text-on-surface">Lidah Rasa AI</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode(viewMode === 'meters' ? 'radar' : 'meters')}
              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-primary hover:bg-surface-container transition-all"
            >
              {viewMode === 'meters' ? 'Tampil Radar 🎯' : 'Tampil Bar 📊'}
            </button>
          </div>
        </div>

        {viewMode === 'meters' ? (
          <div className="flex flex-col gap-2 pt-0.5">
            {/* Asam */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-on-surface font-bold flex items-center gap-1">
                  <span>🍍</span> Asam Nanas
                </span>
                <span className="text-primary font-black">
                  {currentFlavors.sour}% <span className="text-on-surface-variant font-normal">/ {recipe.targetFlavors.sour}%</span>
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-primary-container transition-all duration-300"
                  style={{ width: `${Math.min(100, currentFlavors.sour)}%` }}
                ></div>
              </div>
            </div>

            {/* Gurih */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-on-surface font-bold flex items-center gap-1">
                  <span>🐟</span> Gurih Kaldu
                </span>
                <span className="text-primary font-black">
                  {currentFlavors.savory}% <span className="text-on-surface-variant font-normal">/ {recipe.targetFlavors.savory}%</span>
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${Math.min(100, currentFlavors.savory)}%` }}
                ></div>
              </div>
            </div>

            {/* Pedas */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-on-surface font-bold flex items-center gap-1">
                  <span>🌶️</span> Pedas Rawit
                </span>
                <span className="text-secondary font-black">
                  {currentFlavors.spicy}% <span className="text-on-surface-variant font-normal">/ {recipe.targetFlavors.spicy}%</span>
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-300"
                  style={{ width: `${Math.min(100, currentFlavors.spicy)}%` }}
                ></div>
              </div>
            </div>

            {/* Manis */}
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-on-surface font-bold flex items-center gap-1">
                  <span>🍯</span> Manis Alami
                </span>
                <span className="text-on-surface font-black">
                  {currentFlavors.sweet}% <span className="text-on-surface-variant font-normal">/ {recipe.targetFlavors.sweet}%</span>
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden p-0.5 shadow-inner">
                <div
                  className="h-full rounded-full bg-primary-fixed-dim transition-all duration-300"
                  style={{ width: `${Math.min(100, currentFlavors.sweet)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-1">
            <FlavorRadar current={currentFlavors} target={recipe.targetFlavors} size={150} />
          </div>
        )}

        {/* Trivia Tips Box */}
        <div className="mt-1 p-2 rounded-xl bg-surface-container flex items-start gap-1.5">
          <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">lightbulb</span>
          <p className="text-[11px] text-on-surface-variant leading-tight">
            <strong className="text-on-surface">Tips Dapur:</strong> Masukkan nanas saat kuah mulai mendidih agar rasa asamnya segar dan serat ikan empuk sempurna.
          </p>
        </div>
      </div>
    </div>
  );
}
