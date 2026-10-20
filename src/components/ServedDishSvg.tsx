'use client';

import React from 'react';
import { IngredientSvg } from '@/components/IngredientSvgs';

interface ServedDishSvgProps {
  ingredients?: string[]; // IDs of ingredients added by user
  brothColor?: string;
  recipeName?: string;
  className?: string;
}

export function ServedDishSvg({
  ingredients = [],
  brothColor = '#f59e0b',
  recipeName,
  className = 'w-full h-full'
}: ServedDishSvgProps) {
  // Normalize IDs
  const rawList = ingredients || [];
  const ingSet = new Set(rawList);

  const hasPatin = ingSet.has('patin_segar') || ingSet.has('patin');
  const hasBeef = ingSet.has('daging_sapi') || ingSet.has('daging');
  const hasChicken = ingSet.has('ayam_kampung') || ingSet.has('ayam');
  const hasPineapple = ingSet.has('nanas_madu') || ingSet.has('nanas');
  const hasChili = ingSet.has('cabai_rawit') || ingSet.has('cabai') || ingSet.has('cabe');
  const chiliCount = rawList.filter(i => i === 'cabai_rawit' || i === 'cabai' || i === 'cabe').length;
  const pineappleCount = rawList.filter(i => i === 'nanas_madu' || i === 'nanas').length;
  const hasLemongrass = ingSet.has('serai') || ingSet.has('serai_memar');
  const hasKluwek = ingSet.has('kluwek');
  const hasTurmeric = ingSet.has('kunyit') || ingSet.has('kunyit_parut');
  const hasAndaliman = ingSet.has('andaliman');
  const hasNutmeg = ingSet.has('pala_banda') || ingSet.has('pala');
  const hasAsam = ingSet.has('asam_kandis') || ingSet.has('asam');
  const hasGalangal = ingSet.has('lengkuas') || ingSet.has('laos');
  const hasCandlenut = ingSet.has('kemiri') || ingSet.has('kemiri_bakar');
  const hasBasil = ingSet.has('daun_kemangi') || ingSet.has('kemangi');
  const hasKaffirLime = ingSet.has('daun_jeruk');
  const hasPalmSugar = ingSet.has('gula_aren') || ingSet.has('gula');
  const hasCoconutMilk = ingSet.has('santan') || ingSet.has('santan_kelapa');
  const hasSalt = ingSet.has('garam') || ingSet.has('garam_laut');

  // Any solid item present?
  const hasAnyItems = rawList.length > 0;

  // Primary color tone variations for broth gradient
  const isDarkBroth = brothColor === '#1c1917' || hasKluwek;
  const isRedBroth = brothColor === '#b91c1c' || chiliCount >= 2;
  const isCreamyBroth = hasCoconutMilk;

  const brothGradientCenter = isDarkBroth
    ? '#292524'
    : isRedBroth
    ? '#dc2626'
    : isCreamyBroth
    ? '#fef08a'
    : brothColor;

  const brothGradientEdge = isDarkBroth
    ? '#0c0a09'
    : isRedBroth
    ? '#7f1d1d'
    : isCreamyBroth
    ? '#d97706'
    : '#b45309';

  return (
    <svg
      viewBox="0 0 340 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Shadow filter for plated items */}
        <filter id="dishDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.45" />
        </filter>

        {/* Terracotta Bowl Outer Gradient */}
        <radialGradient id="bowlTerracotta" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#87360e" />
          <stop offset="55%" stopColor="#5c2409" />
          <stop offset="100%" stopColor="#381404" />
        </radialGradient>

        {/* Broth Liquid Gradient */}
        <radialGradient id="brothLiquid" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={brothGradientCenter} />
          <stop offset="70%" stopColor={brothGradientEdge} />
          <stop offset="100%" stopColor="#1c1917" />
        </radialGradient>

        {/* Terracotta Inner Rim Lip */}
        <linearGradient id="rimLipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2c0f03" />
          <stop offset="100%" stopColor="#541e07" />
        </linearGradient>

        {/* Steam blur filter */}
        <filter id="steamBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 0. SOFT GLOW & TABLE SHADOW */}
      <ellipse cx="170" cy="245" rx="100" ry="16" fill="rgba(0,0,0,0.3)" filter="url(#steamBlur)" />
      <ellipse cx="170" cy="242" rx="75" ry="10" fill="rgba(0,0,0,0.4)" />

      {/* 1. STEAM CURLS & AROMATIC SPARKLES */}
      <g className="animate-pulse" opacity="0.85">
        {/* Steam curl left */}
        <path
          d="M 125 105 Q 110 75, 128 50 T 118 20"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
          opacity="0.45"
          fill="none"
        >
          <animate
            attributeName="d"
            dur="4s"
            repeatCount="indefinite"
            values="M 125 105 Q 110 75, 128 50 T 118 20; M 125 105 Q 135 75, 115 50 T 125 20; M 125 105 Q 110 75, 128 50 T 118 20"
          />
        </path>
        {/* Steam curl center */}
        <path
          d="M 170 100 Q 185 70, 165 42 T 175 14"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.6"
          fill="none"
        >
          <animate
            attributeName="d"
            dur="3.2s"
            repeatCount="indefinite"
            values="M 170 100 Q 185 70, 165 42 T 175 14; M 170 100 Q 155 70, 180 42 T 165 14; M 170 100 Q 185 70, 165 42 T 175 14"
          />
        </path>
        {/* Steam curl right */}
        <path
          d="M 215 105 Q 230 78, 210 52 T 225 22"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
          opacity="0.45"
          fill="none"
        >
          <animate
            attributeName="d"
            dur="4.5s"
            repeatCount="indefinite"
            values="M 215 105 Q 230 78, 210 52 T 225 22; M 215 105 Q 200 78, 220 52 T 210 22; M 215 105 Q 230 78, 210 52 T 225 22"
          />
        </path>

        {/* Sparkles of aroma */}
        <polygon points="105,40 108,32 116,35 110,41 113,49 105,44 97,49 100,41 94,35 102,32" fill="#FDE047" opacity="0.8" />
        <polygon points="235,35 237,29 243,31 239,36 241,42 235,38 229,42 231,36 227,31 233,29" fill="#FDE047" opacity="0.8" />
        <polygon points="172,12 173,8 178,9 175,13 176,17 172,14 168,17 169,13 166,9 171,8" fill="#FBBF24" opacity="0.9" />
      </g>

      {/* 2. BOWL BODY (Terracotta Traditional Clayware) */}
      {/* Bowl Pedestal Base */}
      <path
        d="M 125 210 Q 170 216, 215 210 L 222 228 Q 170 236, 118 228 Z"
        fill="#3c1504"
        stroke="#270c02"
        strokeWidth="2.5"
      />
      <ellipse cx="170" cy="228" rx="52" ry="7" fill="#2b0d01" />

      {/* Main Terracotta Bowl Belly Silhouette */}
      <path
        d="M 45 125 C 45 185, 95 222, 170 222 C 245 222, 295 185, 295 125 C 295 124, 45 124, 45 125 Z"
        fill="url(#bowlTerracotta)"
        stroke="#290e02"
        strokeWidth="3.5"
      />

      {/* Handcrafted Batik / Chevron Motif Engraving (matching visual novel Stitch design) */}
      <g opacity="0.9">
        {/* Top & bottom golden engraved lines */}
        <path d="M 68 152 Q 170 178, 272 152" stroke="#CA8A04" strokeWidth="2" strokeDasharray="3 2" fill="none" />
        <path d="M 80 172 Q 170 196, 260 172" stroke="#CA8A04" strokeWidth="2" strokeDasharray="3 2" fill="none" />

        {/* Traditional golden triangles / chevrons: ▲ ▲ ▲ ▲ ▲ ▲ */}
        <polygon points="85,156 95,148 105,157" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="112,160 122,151 132,161" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="140,163 150,153 160,164" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="168,164 178,154 188,164" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="196,162 206,152 216,162" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="224,158 234,149 244,159" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
        <polygon points="250,154 258,146 266,155" fill="#EAB308" stroke="#A16207" strokeWidth="1" />
      </g>

      {/* Subtle Terracotta Glaze Highlight */}
      <path
        d="M 70 145 C 65 175, 105 210, 160 215"
        stroke="#D97706"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.35"
        fill="none"
      />

      {/* 3. BOWL INNER CAVITY & BROTH SURFACE */}
      {/* Outer Rim Lip */}
      <ellipse cx="170" cy="120" rx="126" ry="40" fill="url(#rimLipGradient)" stroke="#220a01" strokeWidth="3" />
      {/* Inner Rim Lip */}
      <ellipse cx="170" cy="118" rx="118" ry="35" fill="#1f0901" />

      {/* Broth Liquid Ellipse */}
      <ellipse cx="170" cy="123" rx="112" ry="31" fill="url(#brothLiquid)" />

      {/* Coconut Milk Swirls on Surface (if santan is added) */}
      {hasCoconutMilk && (
        <g opacity="0.8">
          <path
            d="M 120 122 Q 145 112, 170 126 T 220 120"
            stroke="#FEF9C3"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 140 130 Q 170 138, 200 127"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="115" cy="128" r="4" fill="#FEF9C3" />
          <circle cx="225" cy="126" r="3" fill="#FFFFFF" />
        </g>
      )}

      {/* Oil droplets & gloss on the soup surface */}
      <g opacity="0.65">
        <circle cx="95" cy="120" r="3" fill="#FEF08A" />
        <circle cx="108" cy="132" r="2" fill="#FFFFFF" />
        <circle cx="230" cy="118" r="3.5" fill="#FEF08A" />
        <circle cx="245" cy="126" r="2.5" fill="#FFFFFF" />
        <circle cx="170" cy="140" r="3" fill="#FEF08A" />
        {/* Curving inner rim specular reflection */}
        <path
          d="M 85 116 Q 170 98, 255 116"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
          fill="none"
        />
      </g>

      {/* 4. DYNAMIC PLATED INGREDIENTS (Inside the bowl, nestled in broth!) */}
      <g id="plated-ingredients" filter="url(#dishDropShadow)">
        
        {/* LAYER A: Background Aromatics (Serai, Daun Jeruk) */}
        {hasLemongrass && (
          <g transform="translate(68, 80) rotate(-22) scale(0.72)">
            <IngredientSvg id="serai_memar" width="110" height="90" />
          </g>
        )}

        {hasKaffirLime && (
          <g transform="translate(62, 102) rotate(-15) scale(0.55)">
            <IngredientSvg id="daun_jeruk" width="80" height="80" />
          </g>
        )}

        {/* LAYER B: Secondary Chunks & Spices (Pineapple, Kluwek, Galangal, Candlenut, etc.) */}
        {/* Left Pineapple Chunk */}
        {hasPineapple && (
          <g transform="translate(80, 102) rotate(-18) scale(0.68)">
            <IngredientSvg id="nanas_madu" width="90" height="90" />
          </g>
        )}

        {/* Right Pineapple Chunk (if count >= 2 or no other side item) */}
        {hasPineapple && (pineappleCount >= 2 || (!hasGalangal && !hasCandlenut && !hasNutmeg)) && (
          <g transform="translate(202, 105) rotate(22) scale(0.65)">
            <IngredientSvg id="nanas_madu" width="90" height="90" />
          </g>
        )}

        {/* Kluwek Kernel (Black magic of Rawon) */}
        {hasKluwek && (
          <g transform="translate(98, 110) rotate(-12) scale(0.62)">
            <IngredientSvg id="kluwek" width="85" height="85" />
          </g>
        )}

        {/* Lengkuas (Galangal) */}
        {hasGalangal && (
          <g transform="translate(195, 108) rotate(18) scale(0.58)">
            <IngredientSvg id="lengkuas" width="80" height="80" />
          </g>
        )}

        {/* Kemiri Bakar (Candlenut) */}
        {hasCandlenut && (
          <g transform="translate(182, 118) rotate(12) scale(0.52)">
            <IngredientSvg id="kemiri_bakar" width="75" height="75" />
          </g>
        )}

        {/* Asam Kandis (Dried wild asam) */}
        {hasAsam && (
          <g transform="translate(86, 116) rotate(-28) scale(0.55)">
            <IngredientSvg id="asam_kandis" width="75" height="75" />
          </g>
        )}

        {/* Pala Banda (Nutmeg) */}
        {hasNutmeg && (
          <g transform="translate(192, 112) rotate(24) scale(0.54)">
            <IngredientSvg id="pala_banda" width="75" height="75" />
          </g>
        )}

        {/* Kunyit Parut (Turmeric rhizome) */}
        {hasTurmeric && (
          <g transform="translate(168, 118) rotate(10) scale(0.52)">
            <IngredientSvg id="kunyit_parut" width="75" height="75" />
          </g>
        )}

        {/* Gula Aren Chunk */}
        {hasPalmSugar && (
          <g transform="translate(100, 120) rotate(-10) scale(0.52)">
            <IngredientSvg id="gula_aren" width="75" height="75" />
          </g>
        )}

        {/* LAYER C: Main Centerpiece Proteins */}
        {/* Ikan Patin Steak */}
        {hasPatin && (
          <g transform="translate(116, 76) rotate(1) scale(0.92)">
            <IngredientSvg id="patin_segar" width="130" height="98" />
          </g>
        )}

        {/* Daging Sapi (Beef Cubes) */}
        {hasBeef && (
          <>
            <g transform="translate(122, 85) rotate(-8) scale(0.78)">
              <IngredientSvg id="daging_sapi" width="95" height="95" />
            </g>
            <g transform="translate(156, 92) rotate(14) scale(0.72)">
              <IngredientSvg id="daging_sapi" width="90" height="90" />
            </g>
          </>
        )}

        {/* Ayam Kampung (Chicken Drumstick) */}
        {hasChicken && (
          <g transform="translate(115, 78) rotate(-14) scale(0.88)">
            <IngredientSvg id="ayam_kampung" width="130" height="100" />
          </g>
        )}

        {/* LAYER D: Foreground Garnishes & Accents */}
        {/* Primary Red Chili curling over front */}
        {hasChili && (
          <g transform="translate(142, 106) rotate(-12) scale(0.78)">
            <IngredientSvg id="cabai_rawit" width="75" height="90" />
          </g>
        )}

        {/* 2nd Chili if spicy overload */}
        {chiliCount >= 2 && (
          <g transform="translate(122, 116) rotate(32) scale(0.68)">
            <IngredientSvg id="cabai_rawit" width="65" height="80" />
          </g>
        )}

        {/* Daun Kemangi (Holy basil sprig) */}
        {hasBasil && (
          <g transform="translate(148, 92) rotate(8) scale(0.62)">
            <IngredientSvg id="daun_kemangi" width="80" height="80" />
          </g>
        )}

        {/* Andaliman Toba pepper cluster */}
        {hasAndaliman && (
          <g transform="translate(162, 118) rotate(-18) scale(0.55)">
            <IngredientSvg id="andaliman" width="75" height="75" />
          </g>
        )}

        {/* Garam Laut Kusamba (Salt crystals) */}
        {hasSalt && (
          <g transform="translate(132, 126) scale(0.48)">
            <IngredientSvg id="garam_laut" width="60" height="60" />
          </g>
        )}

        {/* DEFAULT FALLBACK: If user didn't add any chunky ingredients */}
        {!hasAnyItems && (
          <g opacity="0.9">
            <g transform="translate(125, 95) rotate(-10) scale(0.75)">
              <IngredientSvg id="daun_kemangi" width="75" height="75" />
            </g>
            <g transform="translate(150, 105) rotate(15) scale(0.65)">
              <IngredientSvg id="cabai_rawit" width="65" height="75" />
            </g>
          </g>
        )}
      </g>

      {/* 5. FRONT BOWL RIM LIP (Provides natural 3D depth holding ingredients inside broth) */}
      <path
        d="M 45 125 C 45 148, 98 162, 170 162 C 242 162, 295 148, 295 125 C 295 123, 292 121, 288 120 C 275 142, 228 155, 170 155 C 112 155, 65 142, 52 120 C 48 121, 45 123, 45 125 Z"
        fill="#3c1504"
        stroke="#1c0901"
        strokeWidth="1.5"
      />
      {/* Golden rim gloss highlight */}
      <path
        d="M 68 132 C 95 152, 145 158, 170 158 C 195 158, 245 152, 272 132"
        stroke="#EAB308"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );
}
