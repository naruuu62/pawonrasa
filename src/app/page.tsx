'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RECIPES } from '@/data/recipes';
import { Recipe } from '@/types';
import { soundFx } from '@/lib/sound';
import { Star, MapPin, X } from 'lucide-react';

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('Semua');
  const [selectedModalRecipe, setSelectedModalRecipe] = useState<Recipe | null>(null);

  const heroRecipe = RECIPES.find(r => r.id === 'pindang-patin') || RECIPES[0];
  const regions = ['Semua', 'Sumatera', 'Jawa', 'Bali & NTB', 'Sulawesi'];

  const filteredRecipes = RECIPES.filter(r => {
    if (selectedRegion === 'Semua') return true;
    return r.region === selectedRegion;
  });

  return (
    <div className="flex-1 w-full bg-background min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-6">
        
        {/* Top Announcement Toast / Cultural Fact */}
        <div className="w-full bg-surface-container-high rounded-2xl p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 shadow-sm border border-transparent">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container text-on-primary-container shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
            </span>
            <p className="text-xs sm:text-sm text-on-surface line-clamp-2 sm:line-clamp-none">
              <span className="font-extrabold text-inverse-surface">Pawon Pagi:</span> Nanas dalam Pindang Palembang melunakkan serat ikan patin sekaligus memberi acidity alami tanpa cuka kimia!
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              Dapur Aktif: 1.482 Chef Online
            </span>
          </div>
        </div>

        {/* 1. HERO BANNER: Tantangan Spesial Harian */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-inverse-surface via-on-surface to-secondary text-surface p-5 sm:p-8 lg:p-10">
          {/* Decorative Backdrop Flourishes */}
          <div className="absolute -right-20 -bottom-24 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 top-0 w-64 h-64 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>

          {/* Subdued Batik Motif Overlay */}
          <svg className="absolute right-0 top-0 h-full w-auto opacity-10 pointer-events-none text-surface" fill="none" viewBox="0 0 400 400">
            <path d="M400,0 C300,120 280,240 400,400 C280,350 200,280 180,180 C160,80 250,20 400,0 Z" fill="currentColor"></path>
            <path d="M300,50 C220,150 200,280 320,400" stroke="currentColor" strokeDasharray="8 8" strokeWidth="4"></path>
          </svg>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy & Quest Info */}
            <div className="lg:col-span-7 flex flex-col gap-4 items-start">
              {/* Quest Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary shadow-md animate-pulse">
                <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                <span className="text-xs font-bold tracking-wide uppercase">Tantangan Spesial Harian (+150 EXP)</span>
              </div>

              {/* Headline & Deck */}
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-surface tracking-tight leading-tight">
                  Kuasai Rahasia <span className="text-primary-fixed-dim drop-shadow-sm">{heroRecipe.name}</span>
                </h1>
                <p className="text-xs sm:text-sm lg:text-base text-surface-container max-w-xl leading-relaxed">
                  {heroRecipe.description}
                </p>
              </div>

              {/* Reward Chips Grid */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-surface shadow-sm">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">bolt</span>
                  <span className="text-xs font-bold">+150 EXP Reputasi</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-surface shadow-sm">
                  <span className="material-symbols-outlined text-primary-fixed-dim text-[20px]">hotel_class</span>
                  <span className="text-xs font-bold">Resep Bintang {heroRecipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest/15 backdrop-blur-md text-surface shadow-sm">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">military_tech</span>
                  <span className="text-xs font-bold">Lencana Ahli Patin</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <Link
                  href={`/kitchen?recipe=${heroRecipe.id}`}
                  onClick={() => soundFx.playWoodClick()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary-container text-on-primary-container font-extrabold text-sm sm:text-base shadow-[0_4px_0_0_#422a00] hover:brightness-105 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                  <span>Mulai Masak Sekarang</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    soundFx.playWoodClick();
                    setSelectedModalRecipe(heroRecipe);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 backdrop-blur-md text-surface font-bold text-sm shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  <span>Lihat Bahan Resep</span>
                </button>
              </div>
            </div>

            {/* Right Column: Tactile Claypot Visual Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-square rounded-3xl p-5 bg-gradient-to-b from-surface-container-low/90 to-surface-container-high/90 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Steam Particles Animation (SVG) */}
                <div className="absolute inset-0 pointer-events-none flex justify-center items-start pt-6 z-20 opacity-80">
                  <svg className="w-32 h-28" fill="none" viewBox="0 0 100 80">
                    <path className="animate-pulse" d="M30 70 Q 20 45, 35 30 T 25 5" stroke="#ffffff" strokeLinecap="round" strokeWidth="3">
                      <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M30 70 Q 20 45, 35 30 T 25 5; M30 70 Q 40 45, 25 30 T 35 5; M30 70 Q 20 45, 35 30 T 25 5"></animate>
                    </path>
                    <path d="M50 72 Q 65 50, 48 28 T 60 4" stroke="#ffffff" strokeLinecap="round" strokeWidth="3.5">
                      <animate attributeName="d" dur="2.5s" repeatCount="indefinite" values="M50 72 Q 65 50, 48 28 T 60 4; M50 72 Q 40 50, 58 28 T 45 4; M50 72 Q 65 50, 48 28 T 60 4"></animate>
                    </path>
                    <path className="animate-pulse" d="M70 70 Q 60 42, 75 25 T 68 5" stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5">
                      <animate attributeName="d" dur="3.5s" repeatCount="indefinite" values="M70 70 Q 60 42, 75 25 T 68 5; M70 70 Q 80 42, 65 25 T 78 5; M70 70 Q 60 42, 75 25 T 68 5"></animate>
                    </path>
                  </svg>
                </div>

                {/* Header of Card */}
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-extrabold shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">timer</span> 5 Menit Masak
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px] text-secondary">local_fire_department</span> Api Sedang
                  </span>
                </div>

                {/* High Quality Claypot Dish Image from Stitch */}
                <div className="relative w-full h-48 sm:h-52 my-auto flex items-center justify-center z-10 group overflow-hidden rounded-2xl shadow-md">
                  <img
                    src="/images/hero-pindang.jpg"
                    alt="Pindang Patin Palembang"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/dish-pindang.png';
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-inverse-surface/90 text-primary-fixed-dim px-3 py-1 rounded-xl text-[11px] font-bold shadow-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">soup_kitchen</span> Gerabah Tradisional
                  </div>
                </div>

                {/* Footer of Card: Target Flavors */}
                <div className="z-10 bg-surface-container-lowest/80 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-around text-center border border-outline-variant/40 shadow-sm">
                  <div>
                    <div className="text-[10px] text-on-surface-variant font-bold">Asam</div>
                    <div className="text-xs font-extrabold text-primary">{heroRecipe.targetFlavors.sour}%</div>
                  </div>
                  <div className="w-px h-6 bg-outline-variant/50"></div>
                  <div>
                    <div className="text-[10px] text-on-surface-variant font-bold">Pedas</div>
                    <div className="text-xs font-extrabold text-secondary">{heroRecipe.targetFlavors.spicy}%</div>
                  </div>
                  <div className="w-px h-6 bg-outline-variant/50"></div>
                  <div>
                    <div className="text-[10px] text-on-surface-variant font-bold">Wangi</div>
                    <div className="text-xs font-extrabold text-tertiary">{heroRecipe.targetFlavors.savory}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Feature Navigation Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          <Link
            href="/codex?tab=resep"
            onClick={() => soundFx.playWoodClick()}
            className="group bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] transition-all flex items-center gap-3.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[26px]">soup_kitchen</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-inverse-surface">
                Katalog Resep Pusaka
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Masakan leluhur & bumbu rahasia
              </p>
            </div>
          </Link>

          <Link
            href="/codex?tab=jamu"
            onClick={() => soundFx.playWoodClick()}
            className="group bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] transition-all flex items-center gap-3.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[26px]">local_florist</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-inverse-surface">
                Khasiat Jamu Tradisional
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Alkimia herbal UNESCO & petuah seduh
              </p>
            </div>
          </Link>

          <Link
            href="/codex?tab=rempah"
            onClick={() => soundFx.playWoodClick()}
            className="group bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] transition-all flex items-center gap-3.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[26px]">menu_book</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-inverse-surface">
                Kitab Rempah 3D
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Koleksi tanaman pusaka Nusantara
              </p>
            </div>
          </Link>

          <Link
            href="/spice-route"
            onClick={() => soundFx.playWoodClick()}
            className="group bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] transition-all flex items-center gap-3.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[26px]">sailing</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-inverse-surface">
                Peta Jalur Rempah
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Rute pelayaran maritim kuno 1500 M
              </p>
            </div>
          </Link>

          <Link
            href="/leaderboard"
            onClick={() => soundFx.playWoodClick()}
            className="group bg-surface-container-low hover:bg-surface-container p-4 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] transition-all flex items-center gap-3.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 shrink-0 shadow-sm group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-[26px]">military_tech</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-inverse-surface">
                Papan Peringkat Jawara
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Adu ketangkasan koki se-Nusantara
              </p>
            </div>
          </Link>
        </section>

        {/* 3. Katalog Resep Nusantara */}
        <section className="flex flex-col gap-4 pt-2">
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-inverse-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[26px]">restaurant_menu</span>
                  Katalog Resep Kepulauan Nusantara
                </h2>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  Pilih menu autentik untuk diuji oleh tetua adat di Studio Dapur PawonRasa
                </p>
              </div>

              <Link
                href="/codex?tab=resep"
                onClick={() => soundFx.playWoodClick()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-bold border border-outline-variant/30 shadow-sm transition-all shrink-0 self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
                <span>Buka Ensiklopedia Resep & Kisah</span>
              </Link>
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {regions.map(reg => (
                <button
                  key={reg}
                  onClick={() => {
                    soundFx.playWoodClick();
                    setSelectedRegion(reg);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    selectedRegion === reg
                      ? 'bg-primary-container text-on-primary-container shadow-[0_2px_0_0_#422a00]'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container shadow-[0_2px_0_0_#d5c4ae]'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className="group bg-surface-container-lowest rounded-3xl p-4 shadow-[0_4px_0_0_#d5c4ae] border border-outline-variant/30 hover:border-primary-container hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div className="flex flex-col gap-3">
                  {/* Card Image Banner from Stitch */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container">
                    <img
                      src={recipe.heroImage || '/images/recipe-pindang.jpg'}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/dish-pindang.png';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full text-inverse-surface text-xs font-bold shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-primary-container">location_on</span>
                      {recipe.origin.split(',')[0]}
                    </div>
                    {recipe.id === 'pindang-patin' && (
                      <div className="absolute top-2.5 right-2.5 bg-tertiary text-on-tertiary px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        Tantangan Hari Ini
                      </div>
                    )}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-inverse-surface/85 backdrop-blur-sm text-surface px-3 py-1.5 rounded-xl text-xs font-bold">
                      <span className="flex items-center gap-1 text-white">
                        <span className="material-symbols-outlined text-[14px]">schedule</span> {recipe.cookTime.split(' ')[0]}
                      </span>
                      <div className="flex items-center gap-0.5 text-primary-fixed-dim">
                        {[1, 2, 3].map(star => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= recipe.difficulty
                                ? 'text-primary-container fill-primary-container'
                                : 'text-surface-variant/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-inverse-surface group-hover:text-primary-container transition-colors">
                        {recipe.name}
                      </h3>
                      <span className="text-tertiary text-xs font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Siap Masak
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Customer Guest Snippet */}
                  <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center gap-2.5 border border-outline-variant/20">
                    <span className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-sm shrink-0 shadow-sm">
                      {recipe.guest.avatar}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-black text-on-surface truncate">
                        {recipe.guest.name}
                      </div>
                      <div className="text-[9px] text-on-surface-variant italic truncate">
                        “{recipe.guest.dialogueIdle}”
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playWoodClick();
                      setSelectedModalRecipe(recipe);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-inverse-surface text-xs font-bold transition-all shadow-sm active:translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">menu_book</span>
                    <span>Buka Resep</span>
                  </button>

                  <Link
                    href={`/kitchen?recipe=${recipe.id}`}
                    onClick={() => soundFx.playWoodClick()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container text-on-primary-container text-xs font-black shadow-[0_2px_0_0_#422a00] active:translate-y-0.5 active:shadow-none hover:brightness-105 transition-all"
                  >
                    <span>Mulai Masak</span>
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Recipe Details Modal */}
      {selectedModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-outline-variant flex flex-col gap-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedModalRecipe(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-2xl shrink-0 shadow-inner">
                🍲
              </div>
              <div className="min-w-0 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
                    {selectedModalRecipe.region}
                  </span>
                  <span className="text-[10px] font-bold text-on-surface-variant">
                    ⏱️ {selectedModalRecipe.cookTime}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-inverse-surface mt-1 truncate">{selectedModalRecipe.name}</h3>
                <p className="text-xs text-primary font-bold truncate">{selectedModalRecipe.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              {selectedModalRecipe.description}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                Bahan Wajib Menurut Resep Tradisional:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedModalRecipe.requiredIngredients.map((ing) => (
                  <span key={ing} className="text-xs bg-surface-container text-on-surface font-semibold px-2.5 py-1 rounded-full capitalize">
                    🌿 {ing.replace(/-/g, ' ').replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-low p-3.5 rounded-2xl text-xs text-on-surface-variant leading-relaxed border border-outline-variant/30">
              💡 <strong>Kearifan Lokal:</strong> {selectedModalRecipe.culturalStory}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
              <Link
                href={`/kitchen?recipe=${selectedModalRecipe.id}`}
                onClick={() => {
                  soundFx.playWoodClick();
                  setSelectedModalRecipe(null);
                }}
                className="w-full py-3 rounded-2xl bg-primary-container text-on-primary-container font-extrabold text-center text-sm shadow-[0_3px_0_0_#422a00] hover:brightness-105 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Masuk ke Studio Masak Sekarang</span>
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              </Link>

              <Link
                href={`/codex?tab=resep&recipe=${selectedModalRecipe.id}`}
                onClick={() => {
                  soundFx.playWoodClick();
                  setSelectedModalRecipe(null);
                }}
                className="w-full py-2.5 rounded-2xl bg-surface-container text-on-surface font-bold text-center text-xs hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
                <span>Buka Resep & Cerita Filosofi Lengkap di Kitab Pusaka</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
