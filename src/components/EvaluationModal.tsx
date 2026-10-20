'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AIJudgmentResponse, GuestCharacter, Recipe } from '@/types';
import { soundFx } from '@/lib/sound';
import { X } from 'lucide-react';
import Link from 'next/link';
import { ServedDishSvg } from '@/components/ServedDishSvg';

interface EvaluationModalProps {
  recipe: Recipe;
  guest: GuestCharacter;
  result: AIJudgmentResponse;
  addedIngredients?: string[];
  brothColor?: string;
  onCookAgain: () => void;
  onClose: () => void;
}

export default function EvaluationModal({
  recipe,
  guest,
  result,
  addedIngredients = [],
  brothColor,
  onCookAgain,
  onClose
}: EvaluationModalProps) {
  useEffect(() => {
    // Confetti blast on great score
    if (result.accuracy_score >= 70) {
      soundFx.playVictoryChime();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#bb0112', '#ca8a04', '#006e2d', '#ffba46']
      });
    }
  }, [result.accuracy_score]);

  // Customer Reaction visual status
  let reactionTitle = 'Pelanggan Sangat Bahagia';
  let reactionEmoji = '🤩';
  if (result.customer_reaction === 'spicy_overload') {
    reactionTitle = 'Pelanggan Kepedasan';
    reactionEmoji = '🥵';
  } else if (result.customer_reaction === 'confused') {
    reactionTitle = 'Pelanggan Ragu-ragu';
    reactionEmoji = '😵‍💫';
  } else if (result.customer_reaction === 'disappointed') {
    reactionTitle = 'Pelanggan Kecewa';
    reactionEmoji = '🥺';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-[0_8px_0_0_#561f00] border-2 border-outline-variant flex flex-col gap-4">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-all flex items-center justify-center shadow-[0_2px_0_0_#d5c4ae] active:translate-y-0.5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center gap-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-black shadow-[0_2px_0_0_#003814]">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span className="uppercase tracking-wide">Status: Hidangan Siap Disantap</span>
          </div>

          <div className="mt-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-primary text-on-primary-container font-extrabold text-sm sm:text-base shadow-[0_3px_0_0_#422a00] flex items-center gap-2 border border-primary-fixed">
            <span className="material-symbols-outlined text-[20px] text-primary">auto_awesome</span>
            <span>Hidangan {recipe.name} Tersaji Sempurna!</span>
            <span className="material-symbols-outlined text-[20px] text-primary">auto_awesome</span>
          </div>
        </div>

        {/* Centerpiece: Completed Dish Visual in Terracotta Bowl (Dynamic SVG based on user ingredients!) */}
        <div className="relative w-full h-52 sm:h-60 my-1 flex flex-col items-center justify-center">
          <div className="absolute w-60 h-60 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-0 animate-pulse"></div>
          <div className="relative z-10 w-64 h-52 sm:w-72 sm:h-60 flex items-center justify-center group transition-transform duration-500 hover:scale-105">
            <ServedDishSvg
              ingredients={addedIngredients}
              brothColor={brothColor}
              recipeName={recipe.name}
              className="w-full h-full object-contain filter drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Score & Evaluation Bar */}
        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-surface-container-highest text-on-surface shadow-[0_2px_0_0_#ca8a04] w-full border border-primary-fixed/40">
          <span className="text-xl">🏆</span>
          <span className="text-xs sm:text-sm font-extrabold text-on-surface">Akurasi Rasa Leluhur:</span>
          <span className="text-lg sm:text-xl font-black text-primary ml-1">{result.accuracy_score}%</span>
          <span className="text-xs font-bold text-tertiary ml-1">({result.review_title})</span>
        </div>

        {/* Customer Reaction Box & Speech Bubble */}
        <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm flex flex-col gap-3 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center overflow-hidden ring-2 ring-primary-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2zd0Pbl3MUWK4SPNe0YWMOfFFxmcpk_RgJ1PJSFX6K099v0SZf_CvIvPEy5A8FVzrtnwUO04G_II9Ah376klRB7CUZ_b7ZmrJjAh-CZp-M_ikq4OrTb4YOXDSsfFlT6B_fYFrnubclkY8e8VKTIAXb597LOPyJu_OCxWjyxe3nAhDrwM80euSbvG-oV-YUAfNaAU4kKrsVas1iyzQONkU3id0XVTutI3YctIwX_zwwBEihOYuHzBM"
                  alt={guest.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-extrabold text-on-surface block leading-tight">{guest.name}</span>
                <span className="text-[11px] text-on-surface-variant">{guest.title}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
              <span>{reactionEmoji}</span>
              <span>{reactionTitle}</span>
            </div>
          </div>

          {/* Customer Dialogue */}
          <div className="relative p-3 rounded-xl bg-surface-container-lowest shadow-[0_2px_0_0_#ca8a04] text-on-surface text-xs italic font-medium border border-outline-variant/30 leading-relaxed">
            “{result.review_comment}”
          </div>
        </div>

        {/* Flavor Breakdown Progress Meters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
            <div className="text-[10px] text-on-surface-variant font-bold">Asam</div>
            <div className="text-sm font-black text-primary">{result.flavor_profile.sour}%</div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
            <div className="text-[10px] text-on-surface-variant font-bold">Gurih</div>
            <div className="text-sm font-black text-primary">{result.flavor_profile.savory}%</div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
            <div className="text-[10px] text-on-surface-variant font-bold">Pedas</div>
            <div className="text-sm font-black text-secondary">{result.flavor_profile.spicy}%</div>
          </div>
          <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30">
            <div className="text-[10px] text-on-surface-variant font-bold">Manis</div>
            <div className="text-sm font-black text-on-surface">{result.flavor_profile.sweet}%</div>
          </div>
        </div>

        {/* Cultural & Gastronomy Lore Parchment */}
        <div className="p-3 rounded-2xl bg-surface-container-high border border-outline-variant/40 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-primary">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
            <span>Khazanah Budaya & Rahasia Kuliner Terbuka:</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {result.cultural_trivia}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 w-full">
          <button
            onClick={() => {
              soundFx.playVictoryChime();
              onClose();
            }}
            className="w-full flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-secondary-container via-secondary to-secondary-container text-on-secondary font-extrabold text-xs sm:text-sm shadow-[0_4px_0_0_#93000b] hover:brightness-105 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">stars</span>
            <span>Klaim Hadiah (+{result.exp_earned} EXP, +{result.coins_earned} Koin)</span>
          </button>

          <button
            onClick={() => {
              soundFx.playWoodClick();
              onCookAgain();
            }}
            className="py-3 px-5 rounded-2xl bg-surface-container-lowest hover:bg-surface-variant text-on-surface font-extrabold text-xs shadow-[0_2px_0_0_#ca8a04] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>Masak Ulang</span>
          </button>
        </div>

      </div>
    </div>
  );
}
