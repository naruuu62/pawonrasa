import React from 'react';

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// 1. Ikan Patin Segar (Patin Fish Steak Slice Vector)
export function PatinFishSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Outer skin & dark meat back */}
      <path
        d="M 80 15 C 45 15, 20 40, 20 75 C 20 98, 38 112, 58 112 C 72 112, 78 95, 80 82 C 82 95, 88 112, 102 112 C 122 112, 140 98, 140 75 C 140 40, 115 15, 80 15 Z"
        fill="#2D3748"
        stroke="#1A202C"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Silver-grey fish skin layer */}
      <path
        d="M 80 20 C 49 20, 26 44, 26 75 C 26 94, 41 106, 56 106 C 68 106, 73 90, 76 80 C 78 74, 82 74, 84 80 C 87 90, 92 106, 104 106 C 119 106, 134 94, 134 75 C 134 44, 111 20, 80 20 Z"
        fill="#718096"
      />
      {/* Pink juicy succulent fish meat */}
      <path
        d="M 80 24 C 53 24, 32 47, 32 75 C 32 90, 44 100, 56 100 C 66 100, 72 84, 76 74 C 77 70, 83 70, 84 74 C 88 84, 94 100, 104 100 C 116 100, 128 90, 128 75 C 128 47, 107 24, 80 24 Z"
        fill="#F87171"
        stroke="#DC2626"
        strokeWidth="2"
      />
      {/* Fish muscle grain layers */}
      <path
        d="M 80 32 C 60 32, 42 50, 42 72 C 42 84, 50 92, 58 92 C 66 92, 72 78, 77 68 C 83 68, 88 92, 102 92 C 110 92, 118 84, 118 72 C 118 50, 100 32, 80 32 Z"
        fill="#FCA5A5"
      />
      <path
        d="M 80 40 C 66 40, 52 54, 52 70 C 52 78, 58 84, 64 84 C 70 84, 74 72, 78 64 C 82 64, 86 72, 92 84 C 98 84, 104 78, 104 70 C 104 54, 94 40, 80 40 Z"
        fill="#FECACA"
      />
      {/* Center cavity / belly void */}
      <path
        d="M 80 56 C 73 56, 68 64, 68 76 C 68 85, 74 90, 77 94 C 78 96, 82 96, 83 94 C 86 90, 92 85, 92 76 C 92 64, 87 56, 80 56 Z"
        fill="none"
        stroke="#DC2626"
        strokeWidth="3"
      />
      {/* Spine bone center */}
      <circle cx="80" cy="46" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="80" cy="46" r="2" fill="#713F12" />
      {/* Glistening highlights */}
      <ellipse cx="60" cy="42" rx="10" ry="4" transform="rotate(-25 60 42)" fill="#FFFFFF" opacity="0.6" />
      <ellipse cx="100" cy="42" rx="10" ry="4" transform="rotate(25 100 42)" fill="#FFFFFF" opacity="0.6" />
      <circle cx="48" cy="65" r="3" fill="#FFFFFF" opacity="0.7" />
      <circle cx="112" cy="65" r="3" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

// 2. Nanas Madu (Pineapple Chunk Vector)
export function PineappleSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Main triangular juicy chunk */}
      <path
        d="M 30 100 L 70 25 L 110 100 Q 70 115 30 100 Z"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Golden inner core gradient */}
      <path d="M 40 95 L 70 38 L 100 95 Q 70 106 40 95 Z" fill="#FEF08A" />
      {/* Rind skin bottom */}
      <path
        d="M 28 98 C 45 116, 95 116, 112 98 C 108 108, 92 122, 70 122 C 48 122, 32 108, 28 98 Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="2"
      />
      {/* Pineapple eye pits / fiber facets */}
      <polygon points="55,60 62,54 68,62 60,68" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
      <polygon points="75,65 82,58 90,66 82,72" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
      <polygon points="48,80 56,74 64,82 54,88" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
      <polygon points="70,85 78,78 86,86 78,92" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
      {/* Fresh juice drip */}
      <path
        d="M 70 115 C 67 115, 64 122, 64 126 C 64 130, 76 130, 76 126 C 76 122, 73 115, 70 115 Z"
        fill="#FDE047"
        stroke="#EAB308"
        strokeWidth="1.5"
      />
      {/* Glossy highlights */}
      <path d="M 68 35 L 50 70 C 52 70, 56 65, 58 55 L 68 35 Z" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}

// 3. Cabai Rawit Merah (Red Chili Vector)
export function RedChiliSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Curved chili body */}
      <path
        d="M 35 25 C 55 18, 90 28, 95 55 C 98 75, 80 98, 48 105 C 40 107, 36 102, 42 96 C 70 75, 78 55, 65 38 C 55 25, 40 28, 35 25 Z"
        fill="#EF4444"
        stroke="#B91C1C"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner bright fiery highlight */}
      <path
        d="M 45 28 C 60 25, 82 35, 86 55 C 88 70, 72 88, 52 95 C 68 76, 72 58, 62 42 C 54 32, 46 32, 45 28 Z"
        fill="#F87171"
      />
      {/* Green chili cap & stem */}
      <path
        d="M 35 25 C 32 23, 26 24, 24 20 C 22 15, 26 10, 20 6 C 18 4, 16 7, 18 10 C 22 17, 18 22, 23 27 C 28 32, 34 30, 35 25 Z"
        fill="#15803D"
        stroke="#166534"
        strokeWidth="2"
      />
      <path d="M 28 20 C 32 18, 38 22, 38 27 C 35 30, 30 28, 28 20 Z" fill="#22C55E" />
      {/* Glossy shine reflection */}
      <path d="M 72 38 C 82 48, 85 62, 80 72" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      {/* Chili slice ring */}
      <circle cx="32" cy="75" r="14" fill="#DC2626" stroke="#991B1B" strokeWidth="2.5" />
      <circle cx="32" cy="75" r="9" fill="#FCA5A5" />
      <circle cx="32" cy="75" r="4" fill="#FEF08A" />
    </svg>
  );
}

// 4. Kunyit Parut (Grated Turmeric Root Vector)
export function KunyitSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Main Rhizome body */}
      <path
        d="M 20 65 C 22 45, 50 35, 75 42 C 95 48, 105 65, 95 82 C 85 95, 45 98, 25 85 C 18 80, 18 72, 20 65 Z"
        fill="#D97706"
        stroke="#92400E"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Skin ring ridges */}
      <path d="M 40 45 Q 48 65, 42 85" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 60 46 Q 66 65, 62 88" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 80 52 Q 85 68, 82 82" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Fresh cut slice showing golden-orange flesh */}
      <ellipse cx="42" cy="65" rx="18" ry="24" transform="rotate(-15 42 65)" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
      <ellipse cx="42" cy="65" rx="12" ry="17" transform="rotate(-15 42 65)" fill="#FBBF24" />
      <circle cx="41" cy="64" r="5" fill="#FDE68A" />
      {/* Grated shreds pile */}
      <path d="M 65 78 Q 72 70, 80 80 Q 88 72, 95 82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M 70 85 Q 78 78, 86 86" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      {/* Turmeric root shoot branch */}
      <path d="M 85 45 C 92 32, 105 35, 110 42 C 105 50, 95 50, 90 48" fill="#B45309" stroke="#78350F" strokeWidth="2" />
    </svg>
  );
}

// 5. Serai Memar (Bruised Lemongrass Stalk Vector)
export function SeraiSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Main stalk diagonal */}
      <path
        d="M 22 98 L 78 22 C 82 18, 90 20, 92 26 L 82 40 L 36 108 C 30 114, 20 108, 22 98 Z"
        fill="#A3E635"
        stroke="#4D7C0F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Sheath layers and bruising lines */}
      <path d="M 32 94 L 84 32" stroke="#65A30D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 40 86 L 76 42" stroke="#84CC16" strokeWidth="2" strokeLinecap="round" />
      {/* Pale root bulb at base */}
      <ellipse cx="28" cy="102" rx="10" ry="7" transform="rotate(-40 28 102)" fill="#ECFCCB" stroke="#65A30D" strokeWidth="2" />
      {/* Bruised fibrous fracture rings */}
      <path d="M 48 72 Q 54 76, 50 82" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 58 60 Q 64 64, 60 70" stroke="#3F6212" strokeWidth="2.5" strokeLinecap="round" />
      {/* Slender green top blades */}
      <path d="M 80 20 C 90 10, 105 12, 112 8" stroke="#4D7C0F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 86 28 C 96 18, 108 22, 115 18" stroke="#65A30D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 6. Kluwek Fermentasi (Black Fermented Kepayang Seed Vector)
export function KluwekSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Rough outer shell (rocky wood texture) */}
      <path
        d="M 30 40 C 45 20, 85 22, 100 45 C 112 65, 100 95, 78 104 C 55 110, 25 100, 16 78 C 10 60, 18 48, 30 40 Z"
        fill="#3F3F46"
        stroke="#18181B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Cracked shell opening */}
      <path
        d="M 38 48 C 50 36, 82 38, 92 56 C 100 70, 90 92, 72 96 C 54 100, 32 90, 26 74 C 22 62, 28 54, 38 48 Z"
        fill="#18181B"
        stroke="#27272A"
        strokeWidth="2"
      />
      {/* Deep oily black pitch meat inside */}
      <ellipse cx="60" cy="68" rx="26" ry="20" fill="#09090B" />
      {/* Rich fermented glossy umami sheen */}
      <path d="M 48 60 C 56 55, 72 58, 78 66" stroke="#52525B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="64" cy="72" rx="8" ry="4" fill="#71717A" opacity="0.4" />
      {/* Shell ridges */}
      <path d="M 22 55 Q 16 68, 22 82" stroke="#27272A" strokeWidth="2" />
      <path d="M 94 40 Q 105 52, 98 70" stroke="#27272A" strokeWidth="2" />
    </svg>
  );
}

// 7. Andaliman Toba (Batak Pepper Cluster Vector)
export function AndalimanSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Thorny brown twig branch */}
      <path d="M 25 25 Q 55 50, 75 85" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <path d="M 45 42 Q 65 30, 85 35" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 62 Q 85 65, 95 60" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Thorn */}
      <polygon points="50,47 48,38 56,43" fill="#92400E" />
      {/* Cluster of aromatic green-red berries */}
      <circle cx="85" cy="35" r="9" fill="#15803D" stroke="#166534" strokeWidth="2" />
      <circle cx="82" cy="32" r="3" fill="#86EFAC" />
      <circle cx="70" cy="28" r="8" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
      <circle cx="95" cy="45" r="8" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <circle cx="93" cy="43" r="2.5" fill="#FCA5A5" />
      <circle cx="90" cy="62" r="8.5" fill="#15803D" stroke="#166534" strokeWidth="2" />
      <circle cx="88" cy="59" r="2.5" fill="#86EFAC" />
      <circle cx="102" cy="62" r="7.5" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <circle cx="75" cy="75" r="9" fill="#15803D" stroke="#166534" strokeWidth="2" />
      <circle cx="72" cy="72" r="3" fill="#86EFAC" />
      <circle cx="62" cy="85" r="8" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
      <circle cx="78" cy="92" r="7.5" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      {/* Tingling vibration sparks */}
      <path d="M 105 28 L 112 24" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
      <path d="M 112 40 L 118 42" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 8. Pala Banda (Banda Island Nutmeg with Red Mace Vector)
export function PalaBandaSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Opened golden yellow outer fruit husk */}
      <path
        d="M 22 55 C 20 28, 55 18, 62 48 C 50 65, 30 78, 22 55 Z"
        fill="#FDE047"
        stroke="#CA8A04"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 98 55 C 100 28, 65 18, 58 48 C 70 65, 90 78, 98 55 Z"
        fill="#FACC15"
        stroke="#CA8A04"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Dark glossy brown inner seed */}
      <ellipse cx="60" cy="65" rx="22" ry="26" fill="#78350F" stroke="#451A03" strokeWidth="3" />
      {/* Gorgeous scarlet red mace webbing (Fuli) wrapping around the nut */}
      <path
        d="M 45 52 Q 60 45, 75 52 Q 78 68, 65 88 Q 50 78, 45 52 Z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="2"
      />
      <path d="M 52 48 Q 50 68, 62 86" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <path d="M 68 50 Q 72 65, 60 78" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 42 62 Q 58 64, 76 60" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Highlight sheen on seed */}
      <ellipse cx="68" cy="56" rx="4" ry="7" transform="rotate(20 68 56)" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
}

// 9. Asam Kandis Kering (Sun-Dried Asam Kandis Vector)
export function AsamKandisSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Curled, wrinkled sun-dried rind slice 1 */}
      <path
        d="M 28 35 C 45 20, 85 28, 92 50 C 98 70, 75 92, 50 96 C 30 100, 15 80, 22 60 C 26 48, 22 42, 28 35 Z"
        fill="#451A03"
        stroke="#2E0B02"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Wrinkled concave texture curves */}
      <path d="M 38 42 C 55 35, 75 42, 80 58 C 84 72, 68 85, 48 86" fill="#78350F" stroke="#451A03" strokeWidth="2" />
      <path d="M 45 48 Q 62 48, 70 62" stroke="#2E0B02" strokeWidth="2" strokeLinecap="round" />
      <path d="M 40 64 Q 52 68, 65 78" stroke="#2E0B02" strokeWidth="2" strokeLinecap="round" />
      {/* Curled edge rind 2 */}
      <path
        d="M 65 65 C 80 55, 102 65, 105 82 C 108 95, 88 106, 74 102 C 64 98, 62 82, 65 65 Z"
        fill="#2E0B02"
        stroke="#1A0401"
        strokeWidth="2.5"
      />
      <path d="M 72 74 Q 86 75, 92 88" stroke="#78350F" strokeWidth="2" />
    </svg>
  );
}

// 10. Daging Sapi Gandik (Raw Marbled Beef Chunks Vector)
export function DagingSapiSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Main beef steak cube */}
      <path
        d="M 30 35 L 85 25 C 96 28, 102 38, 98 52 L 92 85 C 88 98, 74 102, 60 98 L 25 88 C 16 85, 14 72, 18 60 Z"
        fill="#B91C1C"
        stroke="#7F1D1D"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Deep crimson meat grain */}
      <path
        d="M 35 42 L 82 34 C 90 38, 92 48, 88 60 L 82 82 C 75 90, 62 90, 52 86 L 28 78 C 22 72, 24 55, 35 42 Z"
        fill="#DC2626"
      />
      {/* White fat marbling ripples */}
      <path d="M 32 50 Q 52 48, 68 56 Q 82 62, 88 54" stroke="#FEF2F2" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 66 Q 44 62, 60 72 Q 74 76, 82 70" stroke="#FEF2F2" strokeWidth="3" strokeLinecap="round" />
      <path d="M 45 36 Q 60 40, 72 35" stroke="#FEE2E2" strokeWidth="2" strokeLinecap="round" />
      <path d="M 40 82 Q 55 80, 68 86" stroke="#FEF2F2" strokeWidth="2" strokeLinecap="round" />
      {/* Juicy sheen highlight */}
      <ellipse cx="62" cy="45" rx="10" ry="3" transform="rotate(-10 62 45)" fill="#FFFFFF" opacity="0.4" />
    </svg>
  );
}

// 11. Ayam Kampung (Roasted Free-Range Chicken Drumstick Vector)
export function AyamKampungSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Golden roasted meaty drumstick bulb */}
      <path
        d="M 40 28 C 65 14, 98 22, 102 52 C 105 74, 88 92, 65 88 C 52 85, 45 74, 40 65 L 26 78 C 22 82, 14 78, 12 72 C 10 66, 16 60, 22 62 L 34 50 C 32 40, 34 32, 40 28 Z"
        fill="#D97706"
        stroke="#92400E"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Juicy golden spiced skin layer */}
      <path
        d="M 48 34 C 68 24, 92 30, 95 54 C 98 70, 82 82, 65 78 C 55 76, 48 66, 45 56 C 42 45, 42 38, 48 34 Z"
        fill="#F59E0B"
      />
      {/* Crispy roasted turmeric bumbu char marks */}
      <path d="M 60 38 Q 72 45, 68 56" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 78 44 Q 85 55, 78 68" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 54 62 Q 65 68, 62 74" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      {/* Bone end at bottom left */}
      <circle cx="16" cy="74" r="5" fill="#FEF3C7" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="22" cy="80" r="4.5" fill="#FEF3C7" stroke="#CA8A04" strokeWidth="2" />
      {/* Sizzling glossy highlight */}
      <ellipse cx="70" cy="38" rx="8" ry="3" transform="rotate(-15 70 38)" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}

// 12. Lengkuas Memar (Red Galangal / Laos Vector)
export function LengkuasSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Knotty knobby galangal root */}
      <path
        d="M 25 70 C 20 48, 48 35, 70 42 C 85 32, 102 42, 105 60 C 108 78, 92 92, 75 90 C 58 88, 52 98, 38 95 C 26 92, 28 82, 25 70 Z"
        fill="#EA580C"
        stroke="#9A3412"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Pink shoots & growth rings */}
      <path d="M 45 48 Q 50 68, 42 85" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 68 46 Q 72 65, 66 84" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 88 55 Q 92 70, 86 82" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pink pointed vegetative bud shoot */}
      <path d="M 98 48 C 108 35, 114 42, 110 54 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
      <path d="M 65 35 C 72 20, 78 24, 76 38 Z" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
      {/* Cut cross-section with fibrous core */}
      <ellipse cx="38" cy="68" rx="14" ry="18" fill="#FFEDD5" stroke="#C2410C" strokeWidth="2" />
      <circle cx="38" cy="68" r="4" fill="#FDBA74" />
    </svg>
  );
}

// 13. Kemiri Bakar (Toasted Candlenut Vector)
export function KemiriBakarSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Candlenut 1 (creamy round nut) */}
      <path
        d="M 32 45 C 35 28, 62 25, 72 40 C 80 55, 75 75, 58 78 C 42 80, 28 65, 32 45 Z"
        fill="#FEF08A"
        stroke="#CA8A04"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Roasted dark char spots */}
      <ellipse cx="48" cy="42" rx="6" ry="4" transform="rotate(-15 48 42)" fill="#78350F" />
      <ellipse cx="62" cy="54" rx="7" ry="5" transform="rotate(20 62 54)" fill="#92400E" />
      <circle cx="42" cy="60" r="3" fill="#B45309" />
      {/* Candlenut 2 half resting beside */}
      <path
        d="M 65 60 C 72 50, 95 52, 98 66 C 102 82, 88 95, 74 94 C 62 92, 58 78, 65 60 Z"
        fill="#FEF9C3"
        stroke="#CA8A04"
        strokeWidth="2.5"
      />
      <ellipse cx="82" cy="72" rx="5" ry="3.5" fill="#78350F" />
      <ellipse cx="74" cy="82" rx="4" ry="2.5" fill="#92400E" />
    </svg>
  );
}

// 14. Daun Kemangi Segar (Fresh Holy Basil Leaves Vector)
export function DaunKemangiSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Central green stem */}
      <path d="M 60 105 Q 60 65, 60 25" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      {/* Top central leaf */}
      <path
        d="M 60 25 C 45 15, 45 35, 60 55 C 75 35, 75 15, 60 25 Z"
        fill="#22C55E"
        stroke="#166534"
        strokeWidth="2.5"
      />
      <path d="M 60 26 L 60 54" stroke="#86EFAC" strokeWidth="1.5" />
      {/* Left leaf */}
      <path
        d="M 60 60 C 35 48, 20 65, 38 82 C 55 86, 60 65, 60 60 Z"
        fill="#16A34A"
        stroke="#14532D"
        strokeWidth="2.5"
      />
      <path d="M 60 65 Q 42 70, 32 72" stroke="#86EFAC" strokeWidth="1.5" />
      {/* Right leaf */}
      <path
        d="M 60 55 C 85 42, 102 60, 84 78 C 68 84, 62 62, 60 55 Z"
        fill="#22C55E"
        stroke="#166534"
        strokeWidth="2.5"
      />
      <path d="M 60 60 Q 78 66, 88 68" stroke="#86EFAC" strokeWidth="1.5" />
      {/* Dew drop */}
      <circle cx="48" cy="74" r="2.5" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

// 15. Daun Jeruk Purut (Double-Lobed Kaffir Lime Leaf Vector)
export function DaunJerukSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Figure-8 lower lobe */}
      <path
        d="M 60 100 C 40 95, 34 78, 48 65 C 55 58, 65 58, 72 65 C 86 78, 80 95, 60 100 Z"
        fill="#15803D"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Figure-8 upper lobe */}
      <path
        d="M 60 65 C 38 58, 30 35, 48 20 C 58 10, 62 10, 72 20 C 90 35, 82 58, 60 65 Z"
        fill="#16A34A"
        stroke="#14532D"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Prominent central vein through both lobes */}
      <path d="M 60 102 L 60 15" stroke="#BBF7D0" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lateral veins */}
      <path d="M 60 30 Q 72 26, 76 22" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M 60 40 Q 48 36, 42 32" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M 60 78 Q 72 74, 76 70" stroke="#86EFAC" strokeWidth="1.5" />
      <path d="M 60 88 Q 48 84, 42 80" stroke="#86EFAC" strokeWidth="1.5" />
      {/* Glossy waxy leaf shine */}
      <ellipse cx="52" cy="28" rx="3" ry="8" transform="rotate(-25 52 28)" fill="#FFFFFF" opacity="0.5" />
    </svg>
  );
}

// 16. Gula Aren Semut (Palm Sugar Block & Granules Vector)
export function GulaArenSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Traditional solid molded half-sphere palm sugar cake */}
      <path
        d="M 25 75 C 25 45, 50 35, 75 35 C 95 35, 105 50, 105 75 Z"
        fill="#78350F"
        stroke="#451A03"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <ellipse cx="65" cy="75" rx="40" ry="12" fill="#9A3412" stroke="#451A03" strokeWidth="3" />
      {/* Rich caramelized brown highlights */}
      <path d="M 38 52 C 50 42, 75 42, 88 52" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      {/* Granular crumbs of palm sugar (gula semut) */}
      <circle cx="30" cy="88" r="4" fill="#9A3412" />
      <circle cx="45" cy="92" r="3" fill="#B45309" />
      <circle cx="85" cy="88" r="4.5" fill="#78350F" />
      <circle cx="98" cy="85" r="3" fill="#B45309" />
      <circle cx="70" cy="92" r="2.5" fill="#D97706" />
    </svg>
  );
}

// 17. Pati Santan Kelapa (Coconut Half & Cream Splash Vector)
export function SantanKelapaSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Fibrous brown outer coconut shell */}
      <circle cx="60" cy="60" r="44" fill="#78350F" stroke="#451A03" strokeWidth="4" />
      {/* White inner meat rind */}
      <circle cx="60" cy="60" r="36" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="3" />
      {/* Pure white thick coconut cream milk center */}
      <circle cx="60" cy="60" r="28" fill="#FFFFFF" />
      {/* Creamy ripples */}
      <ellipse cx="60" cy="60" rx="20" ry="14" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 4" />
      {/* Coconut shell hair fibers */}
      <path d="M 20 45 L 14 42" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      <path d="M 18 68 L 12 70" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      <path d="M 100 48 L 106 44" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      <path d="M 100 72 L 108 74" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
      {/* Splashing milk drops */}
      <circle cx="60" cy="40" r="3" fill="#FFFFFF" />
      <circle cx="70" cy="35" r="2" fill="#FFFFFF" />
    </svg>
  );
}

// 18. Garam Laut Kusamba (Geometric Sea Salt Crystals Vector)
export function GaramLautSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Small bamboo salt dish bowl */}
      <ellipse cx="60" cy="82" rx="42" ry="16" fill="#A16207" stroke="#713F12" strokeWidth="3" />
      <ellipse cx="60" cy="80" rx="38" ry="13" fill="#CA8A04" />
      {/* Salt pyramid mound */}
      <path
        d="M 28 80 Q 60 38, 92 80 Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="2"
      />
      {/* Sparkling geometric crystal facets */}
      <polygon points="60,40 50,56 62,60 70,48" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
      <polygon points="42,62 35,74 48,76 54,65" fill="#F1F5F9" stroke="#93C5FD" strokeWidth="1.5" />
      <polygon points="72,55 64,68 76,75 84,62" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
      <polygon points="52,70 65,72 60,82 46,80" fill="#E2E8F0" stroke="#93C5FD" strokeWidth="1.5" />
      {/* Salt sparkles */}
      <path d="M 60 22 L 60 32 M 55 27 L 65 27" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="85" cy="38" r="2" fill="#38BDF8" />
      <circle cx="36" cy="48" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

// 19. Generic / Fallback Spice Jar & Bowl
export function GenericSpiceSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Terracotta earthenware spice bowl */}
      <ellipse cx="60" cy="80" rx="38" ry="14" fill="#B45309" stroke="#78350F" strokeWidth="3" />
      <path d="M 22 80 C 24 55, 96 55, 98 80 Z" fill="#D97706" stroke="#78350F" strokeWidth="3" />
      <ellipse cx="60" cy="55" rx="36" ry="12" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
      {/* Herb bouquet sprig */}
      <path d="M 60 55 L 60 25" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="32" r="8" fill="#22C55E" />
      <circle cx="70" cy="32" r="8" fill="#22C55E" />
      <circle cx="60" cy="20" r="7" fill="#4ADE80" />
    </svg>
  );
}

// Steam Animations from Stitch
export function SteamAnimationSvg({ className = 'w-full h-full', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 220 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={`animate-pulse ${className}`} {...props}>
      <path className="opacity-40" d="M40 80C30 50 60 40 45 10" stroke="#ca8a04" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="4" />
      <path className="opacity-60" d="M110 85C125 55 95 40 115 5" stroke="#ca8a04" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="5" />
      <path className="opacity-50" d="M175 75C160 45 190 35 170 12" stroke="#ca8a04" strokeDasharray="6 6" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

export function HeroPotSteamSvg({ className = 'w-32 h-28', ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path className="animate-pulse" d="M30 70 Q 20 45, 35 30 T 25 5" stroke="#ffffff" strokeLinecap="round" strokeWidth="3">
        <animate
          attributeName="d"
          dur="3s"
          repeatCount="indefinite"
          values="M30 70 Q 20 45, 35 30 T 25 5; M30 70 Q 40 45, 25 30 T 35 5; M30 70 Q 20 45, 35 30 T 25 5"
        />
      </path>
      <path d="M50 72 Q 65 50, 48 28 T 60 4" stroke="#ffffff" strokeLinecap="round" strokeWidth="3.5">
        <animate
          attributeName="d"
          dur="2.5s"
          repeatCount="indefinite"
          values="M50 72 Q 65 50, 48 28 T 60 4; M50 72 Q 40 50, 58 28 T 45 4; M50 72 Q 65 50, 48 28 T 60 4"
        />
      </path>
      <path className="animate-pulse" d="M70 70 Q 60 42, 75 25 T 68 5" stroke="#ffffff" strokeLinecap="round" strokeWidth="2.5">
        <animate
          attributeName="d"
          dur="3.5s"
          repeatCount="indefinite"
          values="M70 70 Q 60 42, 75 25 T 68 5; M70 70 Q 80 42, 65 25 T 78 5; M70 70 Q 60 42, 75 25 T 68 5"
        />
      </path>
    </svg>
  );
}

// Master Dispatcher: renders appropriate custom SVG vector by ingredient id
export function IngredientSvg({ id, className = 'w-full h-full', ...props }: { id: string } & SvgProps) {
  switch (id) {
    case 'patin_segar':
    case 'patin':
      return <PatinFishSvg className={className} {...props} />;
    case 'nanas_madu':
    case 'nanas':
      return <PineappleSvg className={className} {...props} />;
    case 'cabai_rawit':
    case 'cabai':
    case 'cabe':
      return <RedChiliSvg className={className} {...props} />;
    case 'kunyit':
    case 'kunyit_parut':
      return <KunyitSvg className={className} {...props} />;
    case 'serai':
    case 'serai_memar':
      return <SeraiSvg className={className} {...props} />;
    case 'kluwek':
      return <KluwekSvg className={className} {...props} />;
    case 'andaliman':
      return <AndalimanSvg className={className} {...props} />;
    case 'pala_banda':
    case 'pala':
      return <PalaBandaSvg className={className} {...props} />;
    case 'asam_kandis':
    case 'asam':
      return <AsamKandisSvg className={className} {...props} />;
    case 'daging_sapi':
    case 'daging':
      return <DagingSapiSvg className={className} {...props} />;
    case 'ayam_kampung':
    case 'ayam':
      return <AyamKampungSvg className={className} {...props} />;
    case 'lengkuas':
    case 'laos':
      return <LengkuasSvg className={className} {...props} />;
    case 'kemiri':
    case 'kemiri_bakar':
      return <KemiriBakarSvg className={className} {...props} />;
    case 'kemangi':
    case 'daun_kemangi':
      return <DaunKemangiSvg className={className} {...props} />;
    case 'daun_jeruk':
      return <DaunJerukSvg className={className} {...props} />;
    case 'gula_aren':
    case 'gula':
      return <GulaArenSvg className={className} {...props} />;
    case 'santan':
    case 'santan_kelapa':
      return <SantanKelapaSvg className={className} {...props} />;
    case 'garam':
    case 'garam_laut':
      return <GaramLautSvg className={className} {...props} />;
    default:
      return <GenericSpiceSvg className={className} {...props} />;
  }
}
