'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { SPICE_CARDS } from '@/data/codex';
import { RECIPES } from '@/data/recipes';
import { TRADITIONAL_JAMU, JamuItem } from '@/data/jamu';
import { Recipe } from '@/types';
import { soundFx } from '@/lib/sound';
import { 
  Heart, 
  RotateCw, 
  MapPin, 
  Search, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  Droplets,
  Soup,
  Coffee,
  X,
  Zap,
  Shield,
  Eye,
  SlidersHorizontal,
  FlameKindling
} from 'lucide-react';
import { IngredientSvg } from '@/components/IngredientSvgs';
import { ServedDishSvg } from '@/components/ServedDishSvg';

// Color map for Jamu visual elixir jars
const JAMU_THEMES: Record<string, { bg: string; border: string; glow: string; text: string; accent: string }> = {
  'beras-kencur': {
    bg: 'from-amber-100 via-stone-50 to-amber-200',
    border: 'border-amber-300',
    glow: 'shadow-amber-200/50',
    text: 'text-amber-900',
    accent: 'bg-amber-600'
  },
  'kunyit-asam': {
    bg: 'from-amber-400 via-yellow-300 to-amber-500',
    border: 'border-amber-500',
    glow: 'shadow-amber-400/50',
    text: 'text-amber-950',
    accent: 'bg-amber-700'
  },
  'wedang-uwuh': {
    bg: 'from-rose-500 via-red-600 to-amber-600',
    border: 'border-rose-400',
    glow: 'shadow-rose-400/50',
    text: 'text-rose-950',
    accent: 'bg-rose-700'
  },
  'temulawak-madu': {
    bg: 'from-orange-400 via-amber-300 to-yellow-500',
    border: 'border-orange-400',
    glow: 'shadow-orange-300/50',
    text: 'text-orange-950',
    accent: 'bg-orange-600'
  },
  'wedang-jahe-serai': {
    bg: 'from-amber-500 via-orange-500 to-amber-600',
    border: 'border-orange-500',
    glow: 'shadow-orange-400/50',
    text: 'text-amber-950',
    accent: 'bg-amber-800'
  },
  'paitan-brotowali': {
    bg: 'from-emerald-700 via-teal-800 to-emerald-950',
    border: 'border-emerald-600',
    glow: 'shadow-emerald-500/50',
    text: 'text-emerald-950',
    accent: 'bg-emerald-800'
  }
};

function CodexContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabQuery = searchParams.get('tab');
  const validTab: 'rempah' | 'resep' | 'jamu' =
    tabQuery === 'resep' || tabQuery === 'jamu' || tabQuery === 'rempah'
      ? tabQuery
      : 'rempah';

  const [activeTab, setActiveTab] = useState<'rempah' | 'resep' | 'jamu'>(validTab);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Semua');
  const [selectedJamuCategory, setSelectedJamuCategory] = useState<string>('Semua');

  // Interactive Inspection Modals
  const [selectedRecipeDetail, setSelectedRecipeDetail] = useState<Recipe | null>(null);
  const [selectedJamuDetail, setSelectedJamuDetail] = useState<JamuItem | null>(null);

  // Sync state if URL query params change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'resep' || tab === 'jamu' || tab === 'rempah') {
      setActiveTab(tab);
    }
    const recipeId = searchParams.get('recipe');
    if (recipeId) {
      const found = RECIPES.find(r => r.id === recipeId);
      if (found) {
        setSelectedRecipeDetail(found);
      }
    }
  }, [searchParams]);

  const handleTabChange = (tabId: 'rempah' | 'resep' | 'jamu') => {
    soundFx.playWoodClick();
    setActiveTab(tabId);
    router.replace(`/codex?tab=${tabId}`, { scroll: false });
  };

  // Flip Rempah Card
  const toggleFlip = (id: string) => {
    soundFx.playWoodClick();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFlipAll = () => {
    soundFx.playWoodClick();
    const allFlipped = Object.keys(flippedCards).length === SPICE_CARDS.length && Object.values(flippedCards).every(Boolean);
    const newState: Record<string, boolean> = {};
    SPICE_CARDS.forEach(c => {
      newState[c.id] = !allFlipped;
    });
    setFlippedCards(newState);
  };

  // Filter Rempah
  const filteredSpiceCards = useMemo(() => {
    return SPICE_CARDS.filter(card => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        card.name.toLowerCase().includes(q) ||
        card.latinName.toLowerCase().includes(q) ||
        card.region.toLowerCase().includes(q) ||
        card.medicinalHealth.toLowerCase().includes(q);
      const matchesRegion =
        selectedRegion === 'Semua' || card.region.toLowerCase().includes(selectedRegion.toLowerCase());
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Filter Resep Pusaka
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter(recipe => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        recipe.name.toLowerCase().includes(q) ||
        recipe.origin.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.culturalStory.toLowerCase().includes(q);
      const matchesRegion =
        selectedRegion === 'Semua' || recipe.region.toLowerCase().includes(selectedRegion.toLowerCase());
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Filter Jamu Tradisional
  const filteredJamu = useMemo(() => {
    return TRADITIONAL_JAMU.filter(jamu => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        jamu.name.toLowerCase().includes(q) ||
        jamu.subtitle.toLowerCase().includes(q) ||
        jamu.origin.toLowerCase().includes(q) ||
        jamu.benefits.some(b => b.toLowerCase().includes(q)) ||
        jamu.ingredients.some(i => i.toLowerCase().includes(q));
      const matchesCategory =
        selectedJamuCategory === 'Semua' || jamu.category === selectedJamuCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedJamuCategory]);

  return (
    <div className="flex-1 w-full bg-background min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-6">
        
        {/* Cultural Header Showcase Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-surface-container p-6 sm:p-8 shadow-[0_6px_0_0_#561f00] border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute -right-16 -bottom-16 w-60 h-60 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-secondary-fixed/40 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-secondary text-on-secondary text-xs font-bold w-fit shadow-[0_2px_0_0_#410002]">
              <span className="material-symbols-outlined text-[16px] animate-pulse">auto_stories</span>
              <span className="uppercase tracking-wider">Arsip Budaya Gastronomi Nusantara</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1 flex items-center gap-2">
              Pojok Budaya & Kitab Pusaka Rasa
              <Sparkles className="w-7 h-7 text-primary-container" />
            </h1>
            
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Koleksi ensiklopedia interaktif: rasakan denyut sejarah ribuan tahun kepulauan rempah, cita rasa resep legendaris, dan rahasia alkimia jamu tradisional warisan UNESCO.
            </p>
          </div>

          {/* Heritage Stats Badge */}
          <div className="relative z-10 bg-surface-container-lowest p-4 rounded-2xl shadow-[0_3px_0_0_#d5c4ae] border border-outline-variant/30 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-3xl shadow-inner border border-primary/20">
              {activeTab === 'rempah' ? '🌿' : activeTab === 'resep' ? '🍲' : '🍯'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">Koleksi Terbuka</span>
              <span className="text-lg font-black text-on-surface leading-tight">
                {activeTab === 'rempah' && `${SPICE_CARDS.length} Kartu Rempah`}
                {activeTab === 'resep' && `${RECIPES.length} Menu Keramat`}
                {activeTab === 'jamu' && `${TRADITIONAL_JAMU.length} Racikan Jamu`}
              </span>
              <span className="text-[11px] text-tertiary font-bold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">verified</span> 100% Autentik Nusantara
              </span>
            </div>
          </div>
        </section>

        {/* Navigation Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap">
          {[
            { id: 'rempah', label: `Kitab Rempah (${SPICE_CARDS.length})`, icon: 'menu_book', tag: '3D Kartu' },
            { id: 'resep', label: `Katalog Resep (${RECIPES.length})`, icon: 'soup_kitchen', tag: 'Pusaka' },
            { id: 'jamu', label: `Khasiat Jamu (${TRADITIONAL_JAMU.length})`, icon: 'local_florist', tag: 'UNESCO' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 active:scale-95 ${
                activeTab === tab.id
                  ? 'bg-primary-container text-on-primary-container shadow-[0_3px_0_0_#422a00] font-black'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container shadow-[0_2px_0_0_#d5c4ae]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] sm:text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                activeTab === tab.id ? 'bg-primary text-on-primary' : 'bg-surface-container-high'
              }`}>
                {tab.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'rempah'
                  ? 'Cari rempah, nama latin, atau khasiat alami (cth: Kluwek, Andaliman, Maluku)...'
                  : activeTab === 'resep'
                  ? 'Cari hidangan pusaka, kurator adat, atau bumbu (cth: Pindang, Rawon, Patin)...'
                  : 'Cari jamu herbal atau manfaat kesehatan (cth: Beras Kencur, Masuk Angin, Pegal)...'
              }
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface-container-lowest text-on-surface text-xs sm:text-sm font-medium shadow-sm outline-none placeholder:text-outline border border-outline-variant/30 focus:ring-2 focus:ring-primary-container"
            />
          </div>

          <div className="md:col-span-4 flex gap-2">
            {activeTab !== 'jamu' ? (
              <div className="relative w-full">
                <select
                  value={selectedRegion}
                  onChange={e => {
                    soundFx.playWoodClick();
                    setSelectedRegion(e.target.value);
                  }}
                  className="w-full appearance-none px-4 py-3 rounded-2xl bg-surface-container-lowest text-on-surface text-xs font-bold shadow-sm outline-none cursor-pointer pr-10 border border-outline-variant/30 focus:ring-2 focus:ring-primary-container"
                >
                  <option value="Semua">Semua Kepulauan (Nusantara)</option>
                  <option value="Sumatera">Sumatera</option>
                  <option value="Jawa">Jawa & Madura</option>
                  <option value="Maluku">Kepulauan Maluku & Banda</option>
                  <option value="Bali">Bali & Nusa Tenggara</option>
                  <option value="Sulawesi">Sulawesi</option>
                  <option value="Kalimantan">Kalimantan</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">expand_more</span>
              </div>
            ) : (
              <div className="relative w-full">
                <select
                  value={selectedJamuCategory}
                  onChange={e => {
                    soundFx.playWoodClick();
                    setSelectedJamuCategory(e.target.value);
                  }}
                  className="w-full appearance-none px-4 py-3 rounded-2xl bg-surface-container-lowest text-on-surface text-xs font-bold shadow-sm outline-none cursor-pointer pr-10 border border-outline-variant/30 focus:ring-2 focus:ring-primary-container"
                >
                  <option value="Semua">Semua Khasiat Jamu</option>
                  <option value="Penghangat">🔥 Penghangat & Flu</option>
                  <option value="Detoks & Kebugaran">✨ Detoks & Kebugaran</option>
                  <option value="Stamina & Pegal">🌾 Stamina & Pegal Linu</option>
                  <option value="Imunitas Alami">🛡️ Imunitas & Organ Hati</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[20px]">expand_more</span>
              </div>
            )}

            {activeTab === 'rempah' && (
              <button
                onClick={handleFlipAll}
                className="shrink-0 px-4 py-3 rounded-2xl bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-bold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap active:translate-y-0.5"
              >
                <RotateCw className="w-3.5 h-3.5 text-primary" />
                <span className="hidden sm:inline">Balik Semua</span>
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: KITAB REMPAH ALAMI (3D FLIPPING TRADING CARDS)                     */}
        {/* ========================================================================= */}
        {activeTab === 'rempah' && (
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">auto_stories</span>
                <h2 className="text-base sm:text-lg font-extrabold text-on-surface">Pustaka Kartu Rempah Pusaka</h2>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                Klik kartu untuk membalik & membaca rahasia
              </span>
            </div>

            {filteredSpiceCards.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
                <p className="text-sm font-bold text-on-surface-variant">Tidak ada kartu rempah yang cocok dengan pencarian.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpiceCards.map(card => {
                  const isFlipped = !!flippedCards[card.id];

                  return (
                    <div
                      key={card.id}
                      onClick={() => toggleFlip(card.id)}
                      className="perspective-1000 h-[470px] cursor-pointer group"
                    >
                      <div
                        className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform shadow-[0_6px_0_0_#d5c4ae] rounded-3xl ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                      >
                        {/* FRONT FACE (COLLECTIBLE ARTWORK) */}
                        <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-surface-container-lowest to-surface-container-low rounded-3xl p-5 border-2 border-outline-variant/40 flex flex-col justify-between group-hover:border-primary-container group-hover:shadow-lg transition-all overflow-hidden">
                          {/* Top Badges */}
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-[10px] font-extrabold bg-surface-container text-on-surface px-2.5 py-1 rounded-full flex items-center gap-1 border border-outline-variant/30">
                                <MapPin className="w-3 h-3 text-secondary" />
                                {card.region}
                              </span>
                              <span
                                className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                                  card.rarity === 'Legendaris'
                                    ? 'bg-secondary text-on-secondary shadow-sm'
                                    : card.rarity === 'Pusaka'
                                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                                    : 'bg-tertiary text-on-tertiary shadow-sm'
                                }`}
                              >
                                ★ {card.rarity}
                              </span>
                            </div>

                            {/* Center Visual Artwork with Glowing Halo */}
                            <div className="flex flex-col items-center text-center my-3">
                              <div className="relative w-32 h-32 rounded-3xl bg-surface-container-lowest border-2 border-outline-variant/40 flex items-center justify-center p-4 shadow-inner mb-3 group-hover:scale-105 group-hover:rotate-1 transition-all">
                                <div className="absolute inset-2 bg-primary/10 rounded-2xl blur-md pointer-events-none"></div>
                                <IngredientSvg id={card.id} className="relative z-10 w-full h-full object-contain drop-shadow-md" />
                              </div>
                              <h3 className="text-xl font-black text-on-surface leading-tight">
                                {card.name}
                              </h3>
                              <span className="text-xs font-semibold text-primary italic mt-0.5">
                                {card.latinName}
                              </span>
                              
                              <div className="mt-3 p-2 rounded-xl bg-surface-container/60 border border-outline-variant/20 w-full">
                                <p className="text-xs font-bold text-on-surface-variant italic">
                                  “{card.tagline}”
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Front Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-[11px] font-bold text-on-surface-variant">
                            <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface text-[10px]">
                              {card.category}
                            </span>
                            <span className="flex items-center gap-1 text-secondary font-black group-hover:translate-x-0.5 transition-transform">
                              <RotateCw className="w-3.5 h-3.5" /> Sentuh untuk Balik
                            </span>
                          </div>
                        </div>

                        {/* BACK FACE (SECRET ANCESTRAL LORE) */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-surface-container-lowest rounded-3xl p-5 border-2 border-primary/40 flex flex-col justify-between overflow-y-auto shadow-inner">
                          <div>
                            {/* Back Header */}
                            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30 mb-2.5">
                              <div>
                                <h4 className="text-sm font-extrabold text-on-surface">
                                  {card.name}
                                </h4>
                                <span className="text-[10px] font-bold text-primary">
                                  Nama Lokal: {card.localName}
                                </span>
                              </div>
                              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center p-1.5 border border-outline-variant/30">
                                <IngredientSvg id={card.id} className="w-full h-full object-contain" />
                              </div>
                            </div>

                            {/* Historical Lore */}
                            <div className="mb-2.5">
                              <span className="text-[10px] font-extrabold text-secondary uppercase tracking-wider flex items-center gap-1">
                                📜 Sejarah & Tradisi:
                              </span>
                              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                                {card.history}
                              </p>
                            </div>

                            {/* Medicinal Benefit */}
                            <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/30 mb-2.5">
                              <span className="text-[10px] font-black text-emerald-800 flex items-center gap-1">
                                <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Khasiat Alami:
                              </span>
                              <p className="text-[11px] font-bold text-on-surface mt-0.5">
                                {card.medicinalHealth}
                              </p>
                            </div>

                            {/* Culinary Application */}
                            <div className="text-xs text-on-surface-variant">
                              <strong className="text-on-surface">Masakan Pusaka:</strong> {card.culinaryUse}
                            </div>
                          </div>

                          {/* Back Footer */}
                          <div className="flex items-center justify-between pt-2.5 border-t border-outline-variant/30 text-[11px] font-bold text-on-surface-variant">
                            <span>Koleksi Kartu #{card.id}</span>
                            <span className="flex items-center gap-1 text-primary font-black">
                              <RotateCw className="w-3.5 h-3.5" /> Balik Depan
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: KATALOG RESEP PUSAKA (VISUAL PLATED DISH CARDS)                    */}
        {/* ========================================================================= */}
        {activeTab === 'resep' && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Soup className="w-5 h-5 text-primary" />
                <h2 className="text-base sm:text-lg font-extrabold text-on-surface">Koleksi Masakan Pusaka Nusantara</h2>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                Klik resep untuk melihat rahasia bumbu leluhur
              </span>
            </div>

            {filteredRecipes.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
                <p className="text-sm font-bold text-on-surface-variant">Tidak ada resep pusaka yang cocok dengan pencarian.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRecipes.map(recipe => (
                  <div 
                    key={recipe.id}
                    className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_0_#d5c4ae] border border-outline-variant/30 flex flex-col justify-between gap-5 hover:border-primary/50 hover:shadow-lg transition-all group"
                  >
                    <div>
                      {/* Top Visual Dish Showcase with Clay Bowl Preview */}
                      <div className="relative rounded-2xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high p-4 border border-outline-variant/30 overflow-hidden mb-4">
                        <div className="flex items-start justify-between gap-3 relative z-10">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-extrabold bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full shadow-sm">
                                {recipe.region}
                              </span>
                              <span className="text-[10px] font-black bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-full shadow-sm">
                                Kesulitan: {'★'.repeat(recipe.difficulty)}
                              </span>
                              <span className="text-[10px] font-bold bg-surface-container-lowest text-on-surface px-2 py-0.5 rounded-full border border-outline-variant/30">
                                ⏱️ {recipe.cookTime}
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black text-on-surface mt-2 group-hover:text-primary transition-colors">
                              {recipe.name}
                            </h3>
                            <p className="text-xs font-semibold text-primary italic mt-0.5">
                              {recipe.origin}
                            </p>
                          </div>

                          {/* Guest Portrait Badge */}
                          <div className="flex flex-col items-center shrink-0 bg-surface-container-lowest/90 backdrop-blur-sm p-2 rounded-2xl border border-outline-variant/30 shadow-sm">
                            <span className="text-3xl">{recipe.guest.avatar}</span>
                            <span className="text-[10px] font-extrabold text-on-surface mt-1">{recipe.guest.name}</span>
                            <span className="text-[9px] text-on-surface-variant font-bold max-w-[80px] text-center truncate">{recipe.guest.title}</span>
                          </div>
                        </div>

                        {/* Visual Clay Pot Preview */}
                        <div className="w-full h-36 flex items-center justify-center my-1 relative">
                          <div className="w-48 h-32 scale-90 sm:scale-100 transition-transform group-hover:scale-105">
                            <ServedDishSvg 
                              ingredients={recipe.requiredIngredients} 
                              brothColor={recipe.baseSoupColor} 
                              recipeName={recipe.name}
                            />
                          </div>
                        </div>

                        {/* Guest dialogue speech bubble */}
                        <div className="bg-surface-container-lowest/95 backdrop-blur-sm p-2.5 rounded-xl border border-outline-variant/30 flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                          <span className="text-base">💬</span>
                          <span className="line-clamp-1 italic text-[11px] text-on-surface">
                            {recipe.guest.dialogueIdle}
                          </span>
                        </div>
                      </div>

                      {/* Flavor Radar Meters Bar */}
                      <div className="mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                          Profil Keharmonisan Rasa:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="bg-surface-container-low p-2 rounded-xl text-center border border-outline-variant/20">
                            <div className="flex items-center justify-between text-[11px] font-black text-amber-900 mb-1">
                              <span>🍲 Gurih</span>
                              <span>{recipe.targetFlavors.savory}%</span>
                            </div>
                            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                              <div className="bg-amber-600 h-full rounded-full" style={{ width: `${recipe.targetFlavors.savory}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-surface-container-low p-2 rounded-xl text-center border border-outline-variant/20">
                            <div className="flex items-center justify-between text-[11px] font-black text-red-700 mb-1">
                              <span>🌶️ Pedas</span>
                              <span>{recipe.targetFlavors.spicy}%</span>
                            </div>
                            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-600 h-full rounded-full" style={{ width: `${recipe.targetFlavors.spicy}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-surface-container-low p-2 rounded-xl text-center border border-outline-variant/20">
                            <div className="flex items-center justify-between text-[11px] font-black text-yellow-700 mb-1">
                              <span>🍋 Asam</span>
                              <span>{recipe.targetFlavors.sour}%</span>
                            </div>
                            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                              <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${recipe.targetFlavors.sour}%` }}></div>
                            </div>
                          </div>

                          <div className="bg-surface-container-low p-2 rounded-xl text-center border border-outline-variant/20">
                            <div className="flex items-center justify-between text-[11px] font-black text-orange-800 mb-1">
                              <span>🍯 Manis</span>
                              <span>{recipe.targetFlavors.sweet}%</span>
                            </div>
                            <div className="w-full bg-surface-variant h-1.5 rounded-full overflow-hidden">
                              <div className="bg-orange-500 h-full rounded-full" style={{ width: `${recipe.targetFlavors.sweet}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Required Ingredients Visual Chips */}
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant block mb-1">
                          Bumbu Wajib Leluhur:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {recipe.requiredIngredients.map(ingId => (
                            <span 
                              key={ingId} 
                              className="px-2.5 py-1 rounded-xl bg-surface-container text-on-surface border border-outline-variant/30 text-[11px] font-bold flex items-center gap-1.5"
                            >
                              <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                                <IngredientSvg id={ingId} className="w-full h-full object-contain" />
                              </span>
                              <span>{ingId.replace(/_/g, ' ')}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          soundFx.playWoodClick();
                          setSelectedRecipeDetail(recipe);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-secondary" />
                        <span>Kisah & Rahasia Bumbu</span>
                      </button>

                      <Link
                        href={`/kitchen?recipe=${recipe.id}`}
                        onClick={() => soundFx.playWoodClick()}
                        className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-[0_2px_0_0_#422a00] hover:brightness-105 active:translate-y-0.5 transition-all"
                      >
                        <FlameKindling className="w-3.5 h-3.5" />
                        <span>Masak di Studio</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: KHASIAT JAMU TRADISIONAL (INTERACTIVE HERBAL APOTHECARY)           */}
        {/* ========================================================================= */}
        {activeTab === 'jamu' && (
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-secondary" />
                <h2 className="text-base sm:text-lg font-extrabold text-on-surface">Kedai Jamu Tradisional Nusantara</h2>
              </div>
              <span className="text-xs font-bold text-on-surface-variant">
                Warisan Budaya Takbenda Dunia UNESCO
              </span>
            </div>

            {filteredJamu.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
                <p className="text-sm font-bold text-on-surface-variant">Tidak ada ramuan jamu yang cocok dengan pencarian.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJamu.map(jamu => {
                  const theme = JAMU_THEMES[jamu.id] || {
                    bg: 'from-amber-100 to-amber-200',
                    border: 'border-amber-300',
                    glow: 'shadow-amber-200/50',
                    text: 'text-amber-900',
                    accent: 'bg-amber-600'
                  };

                  return (
                    <div 
                      key={jamu.id}
                      className="bg-surface-container-lowest rounded-3xl p-5 shadow-[0_6px_0_0_#d5c4ae] border border-outline-variant/30 flex flex-col justify-between gap-4 hover:border-secondary transition-all group"
                    >
                      <div>
                        {/* Authentic Traditional Jamu Photography Card Header */}
                        <div className="relative rounded-2xl overflow-hidden mb-3.5 border border-outline-variant/30 shadow-sm group-hover:shadow-md transition-shadow">
                          <div className="relative w-full h-44 overflow-hidden bg-surface-container">
                            <img 
                              src={jamu.image} 
                              alt={jamu.name}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                            
                            {/* Top Badges */}
                            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface shadow-xs border border-outline-variant/30">
                                {jamu.category}
                              </span>
                              <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                                <MapPin className="w-3 h-3 text-secondary" /> {jamu.origin.split(' ')[0]}
                              </span>
                            </div>

                            {/* Title Over Jamu Image */}
                            <div className="absolute bottom-2.5 left-3 right-3 text-white">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xl">{jamu.emoji}</span>
                                <h3 className="text-lg font-black leading-tight drop-shadow-md text-white">
                                  {jamu.name}
                                </h3>
                              </div>
                              <p className="text-[11px] font-medium text-white/90 italic line-clamp-1 drop-shadow mt-0.5">
                                {jamu.subtitle}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Taste Sensory Notes */}
                        <div className="bg-surface-container-low p-2.5 rounded-xl border border-outline-variant/20 mb-3">
                          <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider block">
                            Sensasi Lidah & Aroma:
                          </span>
                          <p className="text-xs text-on-surface font-bold mt-0.5">
                            {jamu.tasteProfile}
                          </p>
                        </div>

                        {/* Top 2 Benefits with Heart Icons */}
                        <div className="mb-3">
                          <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1 mb-1">
                            <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Manfaat Utama:
                          </span>
                          <ul className="space-y-1">
                            {jamu.benefits.slice(0, 2).map((b, i) => (
                              <li key={i} className="text-xs text-on-surface flex items-start gap-1.5 leading-snug">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Rimpang Ingredients Tags */}
                        <div>
                          <span className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-wider block mb-1">
                            Racikan Rimpang Pokok:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {jamu.ingredients.slice(0, 3).map((ing, i) => (
                              <span key={i} className="text-[10px] font-bold bg-surface-container px-2 py-0.5 rounded-lg text-on-surface">
                                {ing.split('(')[0].trim()}
                              </span>
                            ))}
                            {jamu.ingredients.length > 3 && (
                              <span className="text-[10px] font-bold text-on-surface-variant self-center">
                                +{jamu.ingredients.length - 3} lagi
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Detail CTA Button */}
                      <div className="pt-3 border-t border-outline-variant/30">
                        <button
                          onClick={() => {
                            soundFx.playWoodClick();
                            setSelectedJamuDetail(jamu);
                          }}
                          className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                        >
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          <span>Lihat Khasiat & Petuah Seduh</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: RECIPE ANCESTRAL LORE & GASTRONOMY MODAL                         */}
      {/* ========================================================================= */}
      {selectedRecipeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-primary/40 flex flex-col gap-5">
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipeDetail(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full">
                  {selectedRecipeDetail.origin}
                </span>
                <span className="text-xs font-black bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-full">
                  Kesulitan: {'★'.repeat(selectedRecipeDetail.difficulty)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-on-surface mt-2">{selectedRecipeDetail.name}</h2>
              <p className="text-xs font-semibold text-primary italic">{selectedRecipeDetail.subtitle}</p>
            </div>

            {/* Guest dialogue box */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-4xl shrink-0">{selectedRecipeDetail.guest.avatar}</span>
              <div>
                <div className="text-xs font-extrabold text-on-surface">{selectedRecipeDetail.guest.name} — {selectedRecipeDetail.guest.title}</div>
                <div className="text-xs text-on-surface-variant italic mt-0.5 leading-snug">
                  “{selectedRecipeDetail.guest.dialogueHappy}”
                </div>
              </div>
            </div>

            {/* Cultural Story */}
            <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
              <h4 className="text-xs font-extrabold text-secondary uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-4 h-4" /> Sejarah & Filosofi Leluhur:
              </h4>
              <p className="text-xs text-on-surface leading-relaxed">
                {selectedRecipeDetail.culturalStory}
              </p>
            </div>

            {/* Cultural Gastronomy Trivia */}
            <div className="bg-primary-fixed/20 p-4 rounded-2xl border border-primary/20">
              <h4 className="text-xs font-extrabold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" /> Rahasia Kimiawi Bumbu Alami:
              </h4>
              <p className="text-xs text-on-surface font-medium leading-relaxed">
                {selectedRecipeDetail.culturalTrivia}
              </p>
            </div>

            {/* Ingredients Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider block mb-1.5">
                  ✓ Bumbu Wajib Leluhur:
                </span>
                <div className="flex flex-wrap gap-1">
                  {selectedRecipeDetail.requiredIngredients.map(ing => (
                    <span key={ing} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md text-emerald-900 border border-emerald-200">
                      {ing.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRecipeDetail.forbiddenIngredients.length > 0 && (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-200">
                  <span className="text-[11px] font-black text-red-700 uppercase tracking-wider block mb-1.5">
                    ✕ Pantangan Bumbu (Merusak Kuah):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedRecipeDetail.forbiddenIngredients.map(ing => (
                      <span key={ing} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-md text-red-800 border border-red-200">
                        {ing.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bottom */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-outline-variant/30">
              <span className="text-xs text-on-surface-variant font-bold">
                Tungku Ideal: <b className="capitalize text-on-surface">{selectedRecipeDetail.idealHeat}</b>
              </span>
              <Link
                href={`/kitchen?recipe=${selectedRecipeDetail.id}`}
                onClick={() => {
                  soundFx.playWoodClick();
                  setSelectedRecipeDetail(null);
                }}
                className="px-5 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-black uppercase flex items-center gap-1.5 shadow-[0_2px_0_0_#422a00] hover:brightness-105"
              >
                <span>Masak Resep Ini Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: JAMU TRADISIONAL DETAILED APOTHECARY MODAL                       */}
      {/* ========================================================================= */}
      {selectedJamuDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-secondary/40 flex flex-col gap-5">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJamuDetail(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Hero Banner with Real Jamu Image */}
            <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md shrink-0">
              <img 
                src={selectedJamuDetail.image} 
                alt={selectedJamuDetail.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-xs font-black bg-secondary text-on-secondary px-3 py-1 rounded-full shadow-sm">
                  {selectedJamuDetail.category}
                </span>
                <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                  <MapPin className="w-3 h-3 text-secondary" /> {selectedJamuDetail.origin}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedJamuDetail.emoji}</span>
                  <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md leading-tight text-white">{selectedJamuDetail.name}</h2>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white/90 italic drop-shadow mt-0.5">{selectedJamuDetail.subtitle}</p>
              </div>
            </div>

            {/* Taste note banner */}
            <div className="p-3 rounded-2xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-on-surface-variant block">
                Sensasi Cita Rasa & Kehangatan:
              </span>
              <p className="text-xs text-on-surface font-bold mt-0.5">
                {selectedJamuDetail.tasteProfile}
              </p>
            </div>

            {/* Health Benefits Full List */}
            <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Khasiat Medis & Kebugaran Teruji:
              </h4>
              <ul className="space-y-1.5">
                {selectedJamuDetail.benefits.map((b, i) => (
                  <li key={i} className="text-xs text-emerald-950 font-medium flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Heritage Lore Story */}
            <div className="bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30">
              <h4 className="text-xs font-extrabold text-secondary uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-4 h-4" /> Catatan Naskah Kuno & Tradisi:
              </h4>
              <p className="text-xs text-on-surface leading-relaxed">
                {selectedJamuDetail.heritageStory}
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Komposisi Rimpang & Rempah:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedJamuDetail.ingredients.map((ing, i) => (
                  <span key={i} className="text-xs font-bold bg-surface-container px-3 py-1 rounded-xl text-on-surface border border-outline-variant/20">
                    🌿 {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Brewing Ritual Tip */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                  Petuah Seduh Leluhur:
                </h5>
                <p className="text-xs text-amber-900 leading-relaxed mt-0.5">
                  {selectedJamuDetail.brewingTip}
                </p>
              </div>
            </div>

            {/* Close CTA */}
            <div className="pt-2 flex justify-end border-t border-outline-variant/30">
              <button
                onClick={() => setSelectedJamuDetail(null)}
                className="px-5 py-2.5 bg-secondary text-on-secondary rounded-xl text-xs font-extrabold uppercase shadow-[0_2px_0_0_#410002] hover:brightness-105"
              >
                Tutup Catatan Jamu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CodexPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full bg-background min-h-screen flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3 text-on-surface">
            <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
            <span className="text-sm font-bold text-on-surface-variant">Memuat Ensiklopedia Rasa Nusantara...</span>
          </div>
        </div>
      }
    >
      <CodexContent />
    </Suspense>
  );
}
