'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { loadChefProfile, updateChefIdentity } from '@/lib/playerStorage';
import { ChefProfile, LeaderboardUser } from '@/types';
import { LEADERBOARD_MASTERS } from '@/data/leaderboard';
import { soundFx } from '@/lib/sound';
import { ArrowRight, RefreshCw, Edit3, Check, Globe, Sparkles } from 'lucide-react';

const REGIONS = [
  'Jawa',
  'Sumatera',
  'Bali & NTB',
  'Sulawesi',
  'Maluku & Papua',
  'Kalimantan',
  'Nusantara'
];

export default function LeaderboardPage() {
  const [profile, setProfile] = useState<ChefProfile | null>(null);
  const [activeFilter, setActiveFilter] = useState<'nasional' | 'pemula' | 'regional' | 'teman'>('nasional');
  const [rawLeaderboard, setRawLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveCloud, setIsLiveCloud] = useState(false);

  // Edit Profil State
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editRegion, setEditRegion] = useState('Jawa');
  const [isSaving, setIsSaving] = useState(false);

  const fetchScores = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leaderboard', { cache: 'no-store' });
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data) && json.data.length > 0) {
        setRawLeaderboard(json.data);
        setIsLiveCloud(json.source === 'supabase');
      } else {
        setRawLeaderboard(LEADERBOARD_MASTERS);
        setIsLiveCloud(false);
      }
    } catch (e) {
      console.warn('Gagal memuat leaderboard, memakai fallback lokal:', e);
      setRawLeaderboard(LEADERBOARD_MASTERS);
      setIsLiveCloud(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const p = loadChefProfile();
    setProfile(p);
    setEditName(p.name || 'Koki Pawon');
    setEditRegion(p.region || 'Jawa');
    fetchScores();

    const handleProfileUpdated = () => {
      const updated = loadChefProfile();
      setProfile(updated);
    };

    window.addEventListener('pawonrasa_profile_updated', handleProfileUpdated);
    return () => {
      window.removeEventListener('pawonrasa_profile_updated', handleProfileUpdated);
    };
  }, []);

  // Gabungkan profil pemain saat ini ke dalam peringkat secara dinamis
  const processedList = useMemo(() => {
    if (!profile) return rawLeaderboard;

    const list = [...rawLeaderboard];
    const playerExistingIndex = list.findIndex(u => u.id === profile.id || u.isCurrentUser);

    const currentUserItem: LeaderboardUser = {
      id: profile.id,
      rank: 0,
      name: profile.name || 'Koki Pawon',
      title: profile.title || 'Juru Masak Pemula',
      avatar: profile.avatar || '🧑🏽‍🍳',
      region: profile.region || 'Nusantara',
      exp: profile.exp,
      masteredCount: (profile.completedRecipes || []).length,
      badge: profile.level >= 5 ? '⭐ Koki Mahir Nusantara' : '🏅 Koki Berbakat',
      accuracyRate: Math.min(99, 75 + Math.floor(profile.level * 3)),
      is_bot: false,
      isCurrentUser: true
    };

    if (playerExistingIndex >= 0) {
      list[playerExistingIndex] = {
        ...list[playerExistingIndex],
        ...currentUserItem,
        exp: Math.max(list[playerExistingIndex].exp, profile.exp)
      };
    } else {
      list.push(currentUserItem);
    }

    // Urutkan dari EXP terbesar ke terkecil
    list.sort((a, b) => b.exp - a.exp);

    // Beri rank dinamis
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
  }, [rawLeaderboard, profile]);

  // Filter sesuai kategori tab
  const filteredList = useMemo(() => {
    if (activeFilter === 'pemula') {
      return processedList.filter(item => item.exp <= 3000);
    }
    if (activeFilter === 'regional' && profile) {
      return processedList.filter(item => item.region?.toLowerCase().includes(profile.region?.toLowerCase() || ''));
    }
    if (activeFilter === 'teman') {
      // Teman dekat / rank tetangga terdekat dengan pemain
      const playerIndex = processedList.findIndex(item => item.isCurrentUser);
      if (playerIndex === -1) return processedList.slice(0, 5);
      const start = Math.max(0, playerIndex - 2);
      const end = Math.min(processedList.length, playerIndex + 3);
      return processedList.slice(start, end);
    }
    return processedList;
  }, [processedList, activeFilter, profile]);

  // Pemain aktif & rankingnya
  const currentPlayerInList = useMemo(() => {
    return processedList.find(item => item.isCurrentUser);
  }, [processedList]);

  // Top 3 Podium
  const top1 = filteredList[0] || processedList[0];
  const top2 = filteredList[1] || processedList[1];
  const top3 = filteredList[2] || processedList[2];
  const remainingPlayers = filteredList.slice(3);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setIsSaving(true);
    soundFx.playWoodClick();

    try {
      const updated = updateChefIdentity(editName, editRegion);
      setProfile(updated);
      setIsEditing(false);
      // Re-sync and refresh
      await fetchScores();
    } catch (err) {
      console.error('Gagal menyimpan identitas koki:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-background min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-6">
        
        {/* Top Season Banner & Subheader */}
        <div className="relative overflow-hidden rounded-3xl bg-surface-container p-5 sm:p-7 shadow-[0_4px_0_0_#561f00] flex flex-col md:flex-row md:items-center justify-between gap-5 border border-outline-variant/30">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-6 -top-6 w-32 h-32 rounded-full bg-secondary-fixed/50 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 w-fit bg-secondary text-on-secondary px-3.5 py-1 rounded-full shadow-[0_2px_0_0_#410002] text-xs font-bold">
                <span className="material-symbols-outlined text-[16px] animate-pulse">local_fire_department</span>
                <span className="uppercase tracking-wider">Musim Rempah Musi</span>
                <span className="opacity-80">• Berakhir dalam 4 Hari 12 Jam</span>
              </div>

              {/* Status Koneksi Supabase */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                isLiveCloud 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                  : 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isLiveCloud ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                <span>{isLiveCloud ? 'Supabase Cloud Live' : 'Mode Sinkronisasi Lokal'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight mt-1 flex items-center gap-2">
              Papan Peringkat: Jawara Dapur Nusantara
              <span className="material-symbols-outlined text-primary-container text-[32px]">military_tech</span>
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
              Adu ketangkasan racik rempah pusaka, takaran cobek, dan ketepatan api tungku tradisional dari Sabang sampai Merauke!
            </p>
          </div>

          {/* Quick Refresh & Action Box */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => {
                soundFx.playWoodClick();
                fetchScores();
              }}
              disabled={isLoading}
              className="p-3 bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded-2xl shadow-[0_3px_0_0_#d5c4ae] border border-outline-variant/30 flex items-center gap-1.5 text-xs font-bold transition-all active:translate-y-0.5"
              title="Segarkan Papan Peringkat"
            >
              <RefreshCw className={`w-4 h-4 text-primary ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-2xl shadow-[0_3px_0_0_#d5c4ae] shrink-0 border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed shadow-inner">
                <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
              </div>
              <div className="flex flex-col pr-1">
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold">Hadiah Top 3</span>
                <span className="text-sm font-extrabold text-on-surface">Apron Emas Pusaka</span>
                <span className="text-xs font-bold text-tertiary">+ 5.000 Pawon Koin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Profile Customization Card */}
        {profile && (
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-[0_3px_0_0_#d5c4ae] border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center text-2xl shadow-sm border border-primary/20 shrink-0">
                {profile.avatar || '🧑🏽‍🍳'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-on-surface">{profile.name || 'Koki Pawon'}</span>
                  <span className="bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary/20">
                    {profile.region || 'Nusantara'}
                  </span>
                  <span className="text-xs font-bold text-tertiary">Lv. {profile.level}</span>
                </div>
                <div className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                  <span>Gelar: <b>{profile.title}</b></span>
                  <span>•</span>
                  <span>Total: <b>{profile.exp.toLocaleString()} EXP</b></span>
                  <span>•</span>
                  <span>Peringkat Saat Ini: <b className="text-primary font-black">#{currentPlayerInList?.rank || '-'}</b></span>
                </div>
              </div>
            </div>

            <div>
              {!isEditing ? (
                <button
                  onClick={() => {
                    soundFx.playWoodClick();
                    setIsEditing(true);
                  }}
                  className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_2px_0_0_#d5c4ae] transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                  <span>Ubah Nama & Asal Daerah</span>
                </button>
              ) : (
                <form onSubmit={handleSaveProfile} className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nama Koki Anda"
                    maxLength={20}
                    className="px-3 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-xl text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <select
                    value={editRegion}
                    onChange={(e) => setEditRegion(e.target.value)}
                    className="px-3 py-1.5 bg-surface-container-low border border-outline-variant/50 rounded-xl text-xs font-bold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {REGIONS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-3.5 py-1.5 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm hover:brightness-105 active:translate-y-0.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-2.5 py-1.5 text-xs font-bold text-on-surface-variant hover:text-on-surface"
                  >
                    Batal
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Category / Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'nasional', label: 'Peringkat Nasional', icon: 'public' },
            { id: 'pemula', label: 'Liga Juru Masak Pemula', icon: 'school' },
            { id: 'regional', label: `Komunitas Daerah (${profile?.region || 'Nusantara'})`, icon: 'travel_explore' },
            { id: 'teman', label: 'Pesaing Terdekat Saya', icon: 'group' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playWoodClick();
                setActiveFilter(tab.id as any);
              }}
              className={`text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-primary-container text-on-primary-container shadow-[0_3px_0_0_#422a00]'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container shadow-[0_2px_0_0_#d5c4ae]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* PODIUM HERO SHOWCASE: TOP 3 CHEFS */}
        <section className="w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_0_#561f00] relative overflow-hidden border border-outline-variant/30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center mb-8 relative z-10">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Pilar Jawara Pekan Ini</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-0.5">Tiga Maestro Selera Nusantara</h2>
          </div>

          {/* Podium Container Grid (Silver - Gold - Bronze) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto pt-4 relative z-10">
            
            {/* PODIUM 2: PERAK (Silver - Left) */}
            {top2 && (
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="relative group cursor-pointer flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm shadow-[0_3px_0_0_#64748b] mb-2 z-10">
                    🥈
                  </div>
                  <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-slate-200 to-slate-400 shadow-md flex items-center justify-center text-4xl">
                    <span>{top2.avatar || '👨🏽‍🍳'}</span>
                    <span className="absolute -bottom-2 -right-1 bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-[0_2px_0_0_#d5c4ae] text-[10px] font-extrabold text-on-surface flex items-center gap-1 border border-outline-variant/30">
                      {top2.region}
                    </span>
                  </div>
                  <div className="text-center mt-3 flex flex-col items-center">
                    <h3 className="text-sm font-extrabold text-on-surface flex items-center gap-1">
                      <span>{top2.name}</span>
                      {top2.isCurrentUser && (
                        <span className="text-[9px] bg-secondary text-on-secondary px-1.5 py-0.2 rounded-full font-black">Saya</span>
                      )}
                    </h3>
                    <span className="text-xs text-primary font-bold">{top2.title}</span>
                    <div className="mt-1 flex items-center gap-1.5 bg-surface-container-high px-2.5 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px] text-primary">stars</span>
                      <span className="text-xs font-extrabold text-on-surface">{top2.exp.toLocaleString()} EXP</span>
                    </div>
                  </div>
                </div>

                {/* Podium Block 2 */}
                <div className="w-full h-40 mt-4 bg-gradient-to-b from-slate-100 to-slate-200 rounded-t-2xl p-3 flex flex-col justify-between items-center text-center shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_6px_0_0_#94a3b8]">
                  <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center font-extrabold text-slate-700 shadow-inner">
                    2
                  </div>
                  <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-2 flex flex-col gap-1 text-[11px] text-on-surface">
                    <div className="flex justify-between items-center">
                      <span>Resep Kuasai:</span>
                      <span className="font-extrabold text-tertiary">{top2.masteredCount} Resep</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Akurasi:</span>
                      <span className="font-extrabold text-primary">{top2.accuracyRate || 94}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PODIUM 1: EMAS (Gold - Center) */}
            {top1 && (
              <div className="order-1 md:order-2 flex flex-col items-center -mt-6">
                <div className="relative group cursor-pointer flex flex-col items-center">
                  <span className="text-3xl animate-bounce mb-1">👑</span>
                  <div className="relative w-28 h-28 rounded-full p-1.5 bg-gradient-to-b from-primary-fixed-dim via-primary-container to-primary shadow-xl ring-4 ring-primary-fixed/40 flex items-center justify-center text-5xl">
                    <span>{top1.avatar || '👑'}</span>
                    <span className="absolute -bottom-2 -right-1 bg-primary-container px-2.5 py-0.5 rounded-full shadow-[0_2px_0_0_#422a00] text-[10px] font-black text-on-primary-container flex items-center gap-1 border border-primary-fixed">
                      ⚡ #{top1.rank} Juara 1
                    </span>
                  </div>
                  <div className="text-center mt-3 flex flex-col items-center">
                    <h3 className="text-base font-black text-on-surface flex items-center gap-1.5">
                      <span>{top1.name}</span>
                      {top1.isCurrentUser && (
                        <span className="text-[9px] bg-secondary text-on-secondary px-1.5 py-0.2 rounded-full font-black">Saya</span>
                      )}
                    </h3>
                    <span className="text-xs text-secondary font-extrabold">{top1.title}</span>
                    <div className="mt-1 flex items-center gap-1.5 bg-primary-fixed px-3 py-0.5 rounded-full text-on-primary-fixed shadow-sm">
                      <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                      <span className="text-xs font-black">{top1.exp.toLocaleString()} EXP</span>
                    </div>
                  </div>
                </div>

                {/* Podium Block 1 */}
                <div className="w-full h-52 mt-4 bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400 rounded-t-2xl p-3 flex flex-col justify-between items-center text-center shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_6px_0_0_#ca8a04]">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center font-black text-amber-900 shadow-inner">
                    1
                  </div>
                  <div className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-2 flex flex-col gap-1 text-[11px] text-on-surface">
                    <div className="flex justify-between items-center">
                      <span>Resep Kuasai:</span>
                      <span className="font-extrabold text-tertiary">{top1.masteredCount} Resep</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Akurasi:</span>
                      <span className="font-extrabold text-secondary">{top1.accuracyRate || 98}% (Legendaris)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PODIUM 3: PERUNGGU (Bronze - Right) */}
            {top3 && (
              <div className="order-3 flex flex-col items-center">
                <div className="relative group cursor-pointer flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-bold text-sm shadow-[0_3px_0_0_#78350f] mb-2 z-10">
                    🥉
                  </div>
                  <div className="relative w-24 h-24 rounded-full p-1 bg-gradient-to-b from-amber-600 to-amber-800 shadow-md flex items-center justify-center text-4xl">
                    <span>{top3.avatar || '🤠'}</span>
                    <span className="absolute -bottom-2 -right-1 bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-[0_2px_0_0_#d5c4ae] text-[10px] font-extrabold text-on-surface flex items-center gap-1 border border-outline-variant/30">
                      {top3.region}
                    </span>
                  </div>
                  <div className="text-center mt-3 flex flex-col items-center">
                    <h3 className="text-sm font-extrabold text-on-surface flex items-center gap-1">
                      <span>{top3.name}</span>
                      {top3.isCurrentUser && (
                        <span className="text-[9px] bg-secondary text-on-secondary px-1.5 py-0.2 rounded-full font-black">Saya</span>
                      )}
                    </h3>
                    <span className="text-xs text-primary font-bold">{top3.title}</span>
                    <div className="mt-1 flex items-center gap-1.5 bg-surface-container-high px-2.5 py-0.5 rounded-full">
                      <span className="material-symbols-outlined text-[14px] text-primary">stars</span>
                      <span className="text-xs font-extrabold text-on-surface">{top3.exp.toLocaleString()} EXP</span>
                    </div>
                  </div>
                </div>

                {/* Podium Block 3 */}
                <div className="w-full h-36 mt-4 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-2xl p-3 flex flex-col justify-between items-center text-center shadow-[inset_0_3px_6px_rgba(255,255,255,0.8),0_6px_0_0_#b45309]">
                  <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center font-extrabold text-amber-900 shadow-inner">
                    3
                  </div>
                  <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-2 flex flex-col gap-1 text-[11px] text-on-surface">
                    <div className="flex justify-between items-center">
                      <span>Resep Kuasai:</span>
                      <span className="font-extrabold text-tertiary">{top3.masteredCount} Resep</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Akurasi:</span>
                      <span className="font-extrabold text-primary">{top3.accuracyRate || 92}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* GLOBAL RANKINGS TABLE */}
        <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-7 shadow-[0_6px_0_0_#561f00] border border-outline-variant/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-extrabold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[24px]">format_list_numbered</span>
              Tabel Peringkat Jawara Nusantara
            </h3>
            <span className="text-xs font-bold text-on-surface-variant">
              Total {filteredList.length} Koki Terdaftar
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full min-w-[480px] text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/40 text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-3 px-3">Peringkat</th>
                  <th className="py-3 px-3">Koki Jawara</th>
                  <th className="py-3 px-3 hidden sm:table-cell">Asal Daerah</th>
                  <th className="py-3 px-3 text-center">Resep Dikuasai</th>
                  <th className="py-3 px-3 text-right">Total EXP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 text-xs font-bold text-on-surface">
                {filteredList.map(u => {
                  const isPlayer = u.isCurrentUser || u.id === profile?.id;
                  return (
                    <tr 
                      key={u.id || u.rank} 
                      className={`transition-colors ${
                        isPlayer 
                          ? 'bg-primary-container/20 border-l-4 border-l-primary' 
                          : 'hover:bg-surface-container-low'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${
                          u.rank === 1 ? 'bg-amber-400 text-amber-950' :
                          u.rank === 2 ? 'bg-slate-300 text-slate-900' :
                          u.rank === 3 ? 'bg-amber-600 text-amber-100' :
                          'bg-surface-container text-on-surface'
                        }`}>
                          #{u.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{u.avatar || '🧑🏽‍🍳'}</span>
                          <div>
                            <div className="font-extrabold text-on-surface flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isPlayer && (
                                <span className="text-[9px] bg-secondary text-on-secondary px-1.5 py-0.5 rounded-full font-black">
                                  Saya
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-on-surface-variant">{u.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant hidden sm:table-cell">{u.region}</td>
                      <td className="py-3 px-3 text-center">
                        <span className="bg-surface-container px-2.5 py-0.5 rounded-full text-[11px]">
                          {u.masteredCount} Resep
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-black text-tertiary">
                        {u.exp.toLocaleString()} EXP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Bottom CTA to Play & Climb Rank */}
          <div className="mt-6 pt-4 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs font-bold text-on-surface-variant text-center sm:text-left">
              Tingkatkan EXP dan skor akurasi resep leluhur untuk menaikkan peringkatmu di Podium Maestro!
            </p>
            <Link
              href="/kitchen"
              onClick={() => soundFx.playWoodClick()}
              className="py-2.5 px-5 rounded-2xl bg-primary-container text-on-primary-container text-xs font-extrabold uppercase flex items-center gap-1.5 shadow-[0_2px_0_0_#422a00] hover:brightness-105 active:translate-y-0.5 transition-all"
            >
              <span>Mulai Masak Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
