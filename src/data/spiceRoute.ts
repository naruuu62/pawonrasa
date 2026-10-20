import { SpicePort } from '@/types';

export const SPICE_PORTS: SpicePort[] = [
  {
    id: 'muara-musi',
    name: 'Muara Musi (Palembang)',
    era: '1500 - 1750 M',
    region: 'Sumatera Selatan',
    coordinates: { x: 23, y: 55 },
    primaryCommodity: 'Lada Hitam, Damar, & Nanas Liar',
    historicalTradeLore: 'Dermaga hilir sungai Musi menjadi pintu gerbang Kesultanan Palembang Darussalam yang menghubungkan perdagangan rempah pedalaman Bukit Barisan ke Selat Malaka. Kapal jung Tiongkok dan dhow Arab bertukar kain sutra dan porselen dengan rempah sungai.',
    connectedRecipeId: 'pindang-patin',
    signatureDishName: 'Pindang Patin Palembang',
    rulerKingdom: 'Kesultanan Palembang Darussalam'
  },
  {
    id: 'barus',
    name: 'Pelabuhan Barus (Fansur)',
    era: 'Abad 6 - 1600 M',
    region: 'Sumatera Utara',
    coordinates: { x: 12, y: 35 },
    primaryCommodity: 'Kapur Barus (Kamper) & Kemenyan Wangi',
    historicalTradeLore: 'Salah satu pelabuhan tertua di bumi nusantara yang tercatat dalam peta Claudius Ptolemaeus abad ke-2 Masehi. Kapur Barus dari pedalaman Batak diekspor untuk balsam mumi Firaun Mesir Kuno dan dupa istana para kaisar Dinasti Tang.',
    connectedRecipeId: 'asam-padeh',
    signatureDishName: 'Gulai Ikan Asam Padeh & Arsik',
    rulerKingdom: 'Kedatuan Fansur Kuno'
  },
  {
    id: 'sunda-kelapa',
    name: 'Sunda Kelapa (Batavia)',
    era: '1520 - 1800 M',
    region: 'Jawa Barat',
    coordinates: { x: 31, y: 68 },
    primaryCommodity: 'Lada Putih, Beras Priangan, & Kayu Cendana',
    historicalTradeLore: 'Pelabuhan utama Kerajaan Sunda Pajajaran yang kemudian diperebutkan Fatahillah dan akhirnya menjadi markas benteng Batavia VOC Belanda. Tempat bertemunya perpaduan kuliner Betawi, Tionghoa peranakan, dan rempah timur.',
    connectedRecipeId: 'rawon-surabaya',
    signatureDishName: 'Semur Daging & Pindang Serani',
    rulerKingdom: 'Kerajaan Sunda / Kesultanan Banten'
  },
  {
    id: 'surabaya-hujung-galuh',
    name: 'Hujung Galuh (Surabaya)',
    era: '1293 - 1700 M',
    region: 'Jawa Timur',
    coordinates: { x: 48, y: 72 },
    primaryCommodity: 'Kluwek, Bawang Brebes, & Beras Brantas',
    historicalTradeLore: 'Pintu gerbang maritim Kerajaan Majapahit di muara Sungai Kalimas. Kapal-kapal dagang dari seluruh penjuru nusantara membongkar hasil bumi dan rempah-rempah yang disajikan untuk perjamuan agung raja-raja tanah Jawa.',
    connectedRecipeId: 'rawon-surabaya',
    signatureDishName: 'Rawon Hitam Surabaya',
    rulerKingdom: 'Kemaharajaan Majapahit'
  },
  {
    id: 'somba-opu',
    name: 'Somba Opu (Makassar)',
    era: '1550 - 1670 M',
    region: 'Sulawesi Selatan',
    coordinates: { x: 62, y: 62 },
    primaryCommodity: 'Kayu Manis, Beras, & Kemiri Bakar',
    historicalTradeLore: 'Benteng kembar dan pelabuhan internasional bebas bea Kesultanan Gowa-Tallo. Nakhoda pelaut ulung Bugis-Makassar mengarungi samudra mengangkut rempah-rempah Maluku menuju Malaka dengan perahu Pinisi mereka yang legendaris.',
    connectedRecipeId: 'coto-makassar',
    signatureDishName: 'Coto Rempah Makassar',
    rulerKingdom: 'Kesultanan Gowa-Tallo'
  },
  {
    id: 'banda-neira',
    name: 'Banda Neira (Kepulauan Banda)',
    era: '1500 - 1700 M',
    region: 'Maluku',
    coordinates: { x: 86, y: 64 },
    primaryCommodity: 'Pala (Nutmeg) & Bunga Pala (Mace)',
    historicalTradeLore: 'Satu-satunya tempat di muka bumi tempat pohon pala tumbuh secara alami hingga abad ke-18. Gugusan pulau vulkanik ini menjadi pusat pusaran darah, kekayaan tak ternilai, dan perang monopoli perdagangan global antara Portugis, Spanyol, Inggris, dan Belanda.',
    connectedRecipeId: 'coto-makassar',
    signatureDishName: 'Sup Rempah Pala & Halua Banda',
    rulerKingdom: 'Oligarki Orang Kaya Banda'
  },
  {
    id: 'ternate-gamalama',
    name: 'Ternate & Tidore',
    era: '1400 - 1750 M',
    region: 'Maluku Utara',
    coordinates: { x: 82, y: 40 },
    primaryCommodity: 'Cengkeh Pusaka (Eugenia aromatica)',
    historicalTradeLore: 'Dua kerajaan kembar di lereng gunung api Gamalama dan Kie Matubu yang memonopoli pohon cengkeh dunia. Sultan Ternate menguasai lebih dari 70 pulau bertakhta armada perahu perang Kora-kora yang mengawal jalur pelayaran cengkeh.',
    connectedRecipeId: 'ayam-betutu',
    signatureDishName: 'Gohu Ikan & Ayam Aromatik Cengkeh',
    rulerKingdom: 'Kesultanan Ternate'
  }
];
