'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SPICE_PORTS } from '@/data/spiceRoute';
import { SpicePort } from '@/types';
import { soundFx } from '@/lib/sound';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SpiceRoutePage() {
  const [selectedPort, setSelectedPort] = useState<SpicePort | null>(SPICE_PORTS[0]);

  const handleSelectPort = (port: SpicePort) => {
    soundFx.playWoodClick();
    setSelectedPort(port);
  };

  return (
    <div className="flex-1 w-full bg-background min-h-screen">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-6">
        
        {/* Navigation Breadcrumb & Narrative Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Link
              href="/codex"
              onClick={() => soundFx.playWoodClick()}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-all shadow-[0_2px_0_0_#d5c4ae] active:translate-y-0.5 group"
            >
              <span className="material-symbols-outlined text-[18px] text-primary transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span className="text-xs font-bold">Kembali ke Pojok Budaya & Kitab Rempah</span>
            </Link>

            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full shadow-[0_2px_0_0_#d5c4ae]">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping"></span>
              <span className="text-[11px] text-tertiary uppercase tracking-wider font-extrabold">
                Jalur Maritim Aktif (1500–1800 M)
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed mb-2 text-xs font-extrabold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-primary">sailing</span>
                Naskah Ekspedisi Bahari Purba
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-inverse-surface tracking-tight">
                Peta Jalur Rempah Nusantara <span className="text-primary-container">(Jalur Sutra Bahari)</span>
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Jelajahi rute pelayaran maritim leluhur dari Kepulauan Rempah Maluku hingga Selat Malaka yang memikat peradaban dunia, membentuk khazanah masakan khas kepulauan.
              </p>
            </div>

            {/* Expedition Daily Quest Card */}
            <div className="bg-surface-container-low p-3.5 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] flex items-center gap-3 shrink-0 lg:max-w-md border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-[0_2px_0_0_#422a00]">
                <span className="material-symbols-outlined text-[26px]">explore</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase text-primary">Misi Ekspedisi Harian</span>
                  <span className="text-[10px] font-bold text-tertiary bg-surface-container-lowest px-2 py-0.5 rounded-full">+150 XP</span>
                </div>
                <p className="text-xs font-bold text-inverse-surface truncate mt-0.5">
                  Kumpulkan 3 Sampel Rempah Segar dari Pesisir Sumatera
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-tertiary-container rounded-full w-2/3"></div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-bold">2/3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pinisi Logistical HUD Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-surface-container-low p-2 rounded-2xl shadow-[0_4px_0_0_#d5c4ae] border border-outline-variant/30">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-lowest">
              <div className="w-9 h-9 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">directions_boat</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant font-bold">Kapal Pinisi</span>
                <span className="text-xs text-inverse-surface font-extrabold truncate">Layar Berkembang</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-lowest">
              <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[20px]">anchor</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant font-bold">Posisi Berlabuh</span>
                <span className="text-xs text-secondary font-extrabold truncate">
                  {selectedPort ? selectedPort.name.split(' ')[0] : 'Pesisir Jawa'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-lowest">
              <div className="w-9 h-9 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant font-bold">Pelabuhan Kuno</span>
                <span className="text-xs text-inverse-surface font-extrabold">{SPICE_PORTS.length} Terbuka</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-surface-container-lowest">
              <div className="w-9 h-9 rounded-lg bg-primary-fixed-dim flex items-center justify-center text-on-primary-fixed shrink-0">
                <span className="material-symbols-outlined text-[20px]">eco</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-on-surface-variant font-bold">Koleksi Rempah</span>
                <span className="text-xs text-inverse-surface font-extrabold">18 / 24 Spesies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Stage & Port Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* MAP CANVAS (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-2">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_6px_0_0_#d5c4ae] bg-[#BAE6FD] min-h-[500px] flex flex-col select-none border-2 border-outline-variant/40">
              {/* Sea Wave Pattern Underlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Map Compass Rose */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/80 border-2 border-[#78350F] flex items-center justify-center text-xl font-black text-[#78350F] shadow-md pointer-events-none select-none z-10">
                🧭
              </div>

              {/* SVG Map of Nusantara */}
              <div className="relative w-full h-[440px] my-auto">
                <svg
                  viewBox="0 0 1000 500"
                  className="w-full h-full drop-shadow-md select-none overflow-visible"
                >
                  <defs>
                    <filter id="islandShadowStitch" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#78350F" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Islands Silhouettes */}
                  {/* Sumatera */}
                  <path
                    d="M 100,100 L 160,180 L 220,290 L 250,350 L 210,340 L 150,250 L 90,140 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Kalimantan */}
                  <path
                    d="M 330,130 L 440,120 L 460,220 L 380,260 L 320,210 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Jawa */}
                  <path
                    d="M 280,360 L 400,365 L 530,375 L 520,395 L 380,390 L 280,380 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Bali & Nusa Tenggara */}
                  <path
                    d="M 545,385 L 575,385 L 630,395 L 680,395 L 680,405 L 545,395 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Sulawesi */}
                  <path
                    d="M 590,210 L 650,200 L 630,260 L 660,330 L 610,335 L 585,275 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Maluku */}
                  <path
                    d="M 760,200 L 780,240 L 745,280 L 830,310 L 860,340 L 835,355 L 750,320 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3"
                    filter="url(#islandShadowStitch)"
                  />
                  {/* Papua */}
                  <path
                    d="M 860,250 L 970,270 L 980,360 L 920,380 L 870,320 Z"
                    fill="#86EFAC"
                    stroke="#15803D"
                    strokeWidth="3.5"
                    filter="url(#islandShadowStitch)"
                  />

                  {/* Historical Maritime Trade Routes */}
                  <path
                    d="M 120,180 Q 180,240 230,275 T 310,340"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    className="opacity-75"
                  />
                  <path
                    d="M 310,340 Q 400,350 480,360 T 620,310"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    className="opacity-75"
                  />
                  <path
                    d="M 620,310 Q 720,330 860,320 T 820,200"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeDasharray="6,6"
                    className="opacity-75"
                  />

                  {/* Animated Sailing Pinisi Ship on Sea */}
                  <g className="animate-pulse" transform="translate(670, 315)">
                    <text fontSize="28">⛵</text>
                  </g>
                </svg>

                {/* Interactive Clickable Port Pins */}
                {SPICE_PORTS.map(port => {
                  const isSelected = selectedPort?.id === port.id;

                  return (
                    <button
                      key={port.id}
                      onClick={() => handleSelectPort(port)}
                      style={{
                        left: `${port.coordinates.x}%`,
                        top: `${port.coordinates.y}%`
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                      }`}
                    >
                      <div className="relative flex flex-col items-center">
                        {isSelected && (
                          <span className="absolute -top-1 w-8 h-8 rounded-full bg-[#EF4444]/40 animate-ping" />
                        )}
                        <div
                          className={`w-8 h-8 rounded-full border-2 border-[#78350F] flex items-center justify-center text-sm shadow-[0_3px_0_0_#422a00] ${
                            isSelected
                              ? 'bg-secondary text-white animate-bounce'
                              : 'bg-primary-container text-on-primary-container hover:bg-primary-fixed-dim'
                          }`}
                        >
                          ⚓
                        </div>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap mt-1 shadow-sm transition-colors ${
                            isSelected
                              ? 'bg-inverse-surface text-surface border-transparent'
                              : 'bg-surface-container-lowest text-on-surface border-outline-variant/40'
                          }`}
                        >
                          {port.name.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Map Footer Helper */}
              <div className="flex items-center justify-between text-xs font-bold text-on-surface-variant p-3 bg-white/70 backdrop-blur-sm border-t border-outline-variant/30">
                <span>🗺️ Kartografi Maritim Nusantara</span>
                <span>💡 Sentuh dermaga untuk menelusuri riwayat komoditas pusaka</span>
              </div>
            </div>
          </div>

          {/* PORT DETAILS DOSSIER PANEL (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-surface-container-low border border-outline-variant/30 rounded-3xl p-5 shadow-[0_4px_0_0_#d5c4ae]">
            {selectedPort ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="pb-3 border-b border-outline-variant/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full shadow-sm">
                      Era {selectedPort.era}
                    </span>
                    <span className="text-[11px] font-bold text-primary">
                      {selectedPort.region}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-inverse-surface mt-1.5">
                    {selectedPort.name}
                  </h3>
                  <p className="text-xs font-bold text-on-surface-variant flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
                    {selectedPort.rulerKingdom}
                  </p>
                </div>

                {/* Primary Commodity */}
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-3.5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider block mb-1">
                    ✨ Komoditas Pusaka Utama:
                  </span>
                  <p className="text-xs font-black text-secondary">
                    {selectedPort.primaryCommodity}
                  </p>
                </div>

                {/* Historical Lore */}
                <div>
                  <span className="text-[10px] font-black text-on-surface uppercase tracking-wider block mb-1">
                    📜 Sejarah Jalur Sutra Laut:
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedPort.historicalTradeLore}
                  </p>
                </div>

                {/* Connected Heritage Dish */}
                <div className="bg-surface-container-lowest border border-outline-variant/30 p-3.5 rounded-2xl shadow-sm">
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider block mb-1">
                    🍲 Kaitan Hidangan Otentik:
                  </span>
                  <h4 className="text-sm font-extrabold text-inverse-surface">
                    {selectedPort.signatureDishName}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                    Rempah yang dibongkar di dermaga ini menjadi identitas kuah masakan lokal hingga hari ini.
                  </p>

                  <Link
                    href={`/kitchen?recipe=${selectedPort.connectedRecipeId}`}
                    onClick={() => soundFx.playWoodClick()}
                    className="mt-3 w-full py-2.5 px-4 rounded-xl bg-primary-container text-on-primary-container text-xs font-extrabold uppercase text-center flex items-center justify-center gap-1.5 shadow-[0_2px_0_0_#422a00] hover:brightness-105 active:translate-y-0.5 transition-all"
                  >
                    <span>Masak Menu Dermaga Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-on-surface-variant py-12">
                <span className="material-symbols-outlined text-[48px] text-primary-container mb-2">explore</span>
                <p className="text-sm font-black text-inverse-surface">Pilih Dermaga di Peta</p>
                <p className="text-xs text-on-surface-variant mt-1">Telusuri kejayaan jalur rempah purba Nusantara</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
