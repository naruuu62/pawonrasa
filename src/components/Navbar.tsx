'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { loadChefProfile } from '@/lib/playerStorage';
import { soundFx } from '@/lib/sound';
import { ChefProfile } from '@/types';

export default function Navbar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<ChefProfile | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    setProfile(loadChefProfile());
    setIsMuted(soundFx.getMuted());
    setIsMusicOn(soundFx.getIsBgmPlaying());

    const handleUpdate = () => {
      setProfile(loadChefProfile());
    };

    const handleBgmUpdate = () => {
      setIsMusicOn(soundFx.getIsBgmPlaying());
      setIsMuted(soundFx.getMuted());
    };

    window.addEventListener('pawonrasa_profile_updated', handleUpdate);
    window.addEventListener('pawonrasa_bgm_updated', handleBgmUpdate);
    return () => {
      window.removeEventListener('pawonrasa_profile_updated', handleUpdate);
      window.removeEventListener('pawonrasa_bgm_updated', handleBgmUpdate);
    };
  }, []);

  const handleMusicToggle = () => {
    const isPlaying = soundFx.toggleBgm();
    setIsMusicOn(isPlaying);
    setIsMuted(soundFx.getMuted());
    if (isPlaying) {
      soundFx.playWoodClick();
    }
  };

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/kitchen', label: 'Studio Masak' },
    { href: '/codex', label: 'Pojok Budaya' },
    { href: '/spice-route', label: 'Peta Jalur Rempah' },
    { href: '/leaderboard', label: 'Papan Peringkat' },
  ];

  const expPercent = profile ? Math.min(100, Math.round((profile.exp / profile.expToNextLevel) * 100)) : 0;
  const expText = profile ? `${profile.exp} / ${profile.expToNextLevel} XP` : '0 / 300 XP';
  const chefTitle = profile ? `Lv. ${profile.level} ${profile.title}` : 'Lv. 1 Juru Masak';
  const coinsCount = profile ? profile.coins : 0;
  const chefName = profile?.name || 'Koki Pawon';
  const chefRegion = profile?.region || 'Nusantara';
  const chefAvatar = profile?.avatar || '🧑🏽‍🍳';

  return (
    <header className="sticky top-0 w-full z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-[0_4px_16px_rgba(69,26,3,0.06)] border-b border-[#ffeae1]">
      {/* Top Heritage Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary-fixed-dim via-primary-container to-secondary"></div>
      
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Mascot & Logo */}
        <Link 
          href="/" 
          onClick={() => soundFx.playWoodClick()}
          className="flex items-center gap-3 shrink-0 group active:scale-95 transition-transform"
        >
          <img 
            alt="PawonRasa Mascot Logo" 
            className="h-12 w-auto object-contain drop-shadow-sm group-hover:rotate-3 transition-transform" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE2ZR3fLVspPJqoXQifJq2EzDeAti4_-6P94quWIOGy2_K_U_BfkuewQ5Io_z1DUhAW8qviBeVAzO-t13muZtNzPE-TevxueNwb_iTNjXo9bGDqDWxHV87rXsvRajxjuAOOTbd5GA1hfn_d69C0rbGgrCYF4nHE9I0ODxgL6yknHzXKv4_gD35tAhqrVfUQN_CGdwBb-zw-00l_serYxS_EBLGfJpYcfiYs6FxdWebw78mUBqyL8FoCpU9k7KL4dJfqA" 
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl text-inverse-surface tracking-tight leading-none">
              PawonRasa
            </span>
            <span className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase mt-1">
              Dapur Kuliner Nusantara
            </span>
          </div>
        </Link>

        {/* Center Navigation Pill Container */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1.5 rounded-full shadow-[inset_0_2px_4px_rgba(69,26,3,0.08)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => soundFx.playWoodClick()}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container shadow-[0_2px_0_0_#422a00]'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Coins, Sound SFX, Level XP, Dynamic Chef Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Coins Pill */}
          <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-full shadow-[0_2px_0_0_#d5c4ae]">
            <span className="material-symbols-outlined text-[18px] text-primary-container">monetization_on</span>
            <span className="text-xs text-inverse-surface font-extrabold">{coinsCount}</span>
          </div>

          {/* Nusantara Traditional Music BGM Toggle */}
          <button 
            onClick={handleMusicToggle}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all active:translate-y-0.5 active:shadow-none ${
              isMusicOn && !isMuted
                ? 'bg-primary-container text-on-primary-container shadow-[0_3px_0_0_#422a00] ring-2 ring-primary/40'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface shadow-[0_2px_0_0_#d5c4ae]'
            }`}
            title={
              isMusicOn && !isMuted
                ? 'Musik Tradisional Nusantara: Aktif (Gamelan & Suling Sunda) — Klik untuk jeda' 
                : 'Nyalakan Musik Tradisional Nusantara (Gamelan & Suling Bambu)'
            } 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMusicOn && !isMuted ? 'music_note' : 'music_off'}
            </span>
            {isMusicOn && !isMuted && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
            )}
          </button>

          {/* Level Progress Indicator */}
          <div className="hidden sm:flex flex-col justify-center bg-surface-container-low px-3 py-1.5 rounded-xl shadow-[0_2px_0_0_#d5c4ae]">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs text-on-surface font-extrabold">{chefTitle}</span>
              <span className="text-[10px] text-on-surface-variant">{expText}</span>
            </div>
            <div className="w-28 sm:w-32 h-2.5 bg-surface-variant rounded-full overflow-hidden p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500"
                style={{ width: `${expPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Dynamic Chef Profile Avatar & Name Link */}
          <Link
            href="/leaderboard"
            onClick={() => soundFx.playWoodClick()}
            className="flex items-center gap-2 bg-surface-container-low pl-1.5 pr-3 py-1 rounded-full shadow-[0_2px_0_0_#d5c4ae] hover:bg-surface-container hover:shadow-md transition-all active:scale-95 group"
            title="Klik untuk melihat papan peringkat & ubah profil"
          >
            <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center text-lg ring-2 ring-primary-container shrink-0 overflow-hidden">
              {chefAvatar.startsWith('http') ? (
                <img 
                  alt="Profile Avatar" 
                  className="w-full h-full rounded-full object-cover" 
                  src={chefAvatar} 
                />
              ) : (
                <span>{chefAvatar}</span>
              )}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs text-on-surface font-extrabold leading-tight group-hover:text-primary transition-colors max-w-[110px] truncate">
                {chefName}
              </span>
              <span className="text-[9px] text-on-surface-variant font-bold leading-tight">
                {chefRegion}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className="flex lg:hidden items-center justify-around px-2 py-2 border-t border-[#ffeae1] bg-surface-container-low">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => soundFx.playWoodClick()}
              className={`text-[11px] font-bold px-2 py-1 rounded-full transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-black'
                  : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
