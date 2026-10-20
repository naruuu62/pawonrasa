import { Recipe } from '@/types';

export const RECIPES: Recipe[] = [
  {
    id: 'pindang-patin',
    name: 'Pindang Patin Palembang',
    subtitle: 'Mahakarya Sungai Musi Bersaus Nanas & Kunyit Emas',
    origin: 'Palembang, Sumatera Selatan',
    region: 'Sumatera',
    difficulty: 2,
    cookTime: '15 Menit Simulasi',
    heroImage: '/images/recipe-pindang.jpg',
    description: 'Sup ikan air tawar legendaris berkuah kuning keemasan dengan perpaduan magis antara asam nanas ranum, kunyit parut wangi, serai, dan gigitan cabai rawit merah.',
    culturalStory: 'Masyarakat tepian Sungai Musi telah ratusan tahun meracik pindang di atas perahu dapur terapung. Nanas madu digunakan para tetua adat bukan hanya sebagai pemanis asam, melainkan senjata alami untuk melunakkan serat lemak ikan patin dan membuang aroma tanah air tawar.',
    culturalTrivia: 'Enzim bromelin pada nanas melunakkan serat daging patin Sungai Musi seketika, sementara kurkumin kunyit menyegel kesegaran kaldu.',
    guest: {
      id: 'eyang-sastro',
      name: 'Eyang Sastro',
      title: 'Tetua Adat Musi & Kurator Rasa',
      avatar: '👴🏽',
      personality: 'Hangat, bijaksana, dan sangat teliti pada kesegaran nanas serta aroma serai kuah pindang.',
      dialogueIdle: '“Nak koki, pastikan kuah pindang patin ini berwarna kuning cerah bercahaya. Jangan lupa irisan nanas madunya!”',
      dialogueHappy: '“Aduhai! Kuah kuning keemasan yang segar semerbak! Asam nanasnya mengikat lemak patin dengan sempurna, persis buatan ibunda di tepian Musi tempo dulu!”',
      dialogueDisappointed: '“Hmm... kuahnya terasa hambar dan amis. Dimana kunyit dan nanas madunya? Lidah sepuhku tak bisa dibohongi, Nak.”',
      dialogueSpicy: '“Wah gawat! Api dan cabaimu bergolak terlalu ganas! Bibir Eyang sampai berkeringat deras bagai terkena petir!”'
    },
    idealHeat: 'medium',
    requiredIngredients: ['patin_segar', 'nanas_madu', 'kunyit_parut', 'serai_memar', 'cabai_rawit'],
    optionalIngredients: ['daun_kemangi', 'garam_laut', 'gula_aren'],
    forbiddenIngredients: ['kluwek'], // Kluwek would ruin the bright golden soup!
    targetFlavors: {
      savory: 75,
      spicy: 65,
      sour: 85,
      sweet: 40
    },
    baseSoupColor: '#FBBF24' // Turmeric golden broth
  },
  {
    id: 'rawon-surabaya',
    name: 'Rawon Hitam Surabaya',
    subtitle: 'Sup Daging Keramat Kuah Kluwek Hitam Pekat',
    origin: 'Surabaya & Malang, Jawa Timur',
    region: 'Jawa',
    difficulty: 3,
    cookTime: '20 Menit Simulasi',
    heroImage: '/images/recipe-rawon.jpg',
    description: 'Kuliner warisan era Majapahit berkuah hitam legam alami dari fermentasi biji kluwek dengan kaldu daging sapi gandik yang pekat dan gurih kaya rempah.',
    culturalStory: 'Tercatat dalam prasasti Taji Ponorogo (901 M) dengan nama "Rarawwan". Kuah hitam pekat ini adalah alkimia cerdas nenek moyang Jawa yang menjinakkan racun sianida biji kepayang lewat fermentasi abu sekam berbulan-bulan.',
    culturalTrivia: 'Kluwek mengandung tanin pekat yang bertindak sebagai pengawet alami daging rebus sebelum zaman mesin pendingin.',
    guest: {
      id: 'cak-gunawan',
      name: 'Cak Gunawan',
      title: 'Maestro Reog & Penikmat Rawon Malam',
      avatar: '🧔🏽',
      personality: 'Blak-blakan, bersuara mantap, menyukai kuah rawon yang pekat legam dan gurih berminyak.',
      dialogueIdle: '“Rek! Rawon iku kudu ireng kimplah-kimplah kluwek e! Ojo sampek kuah rawonmu pucet koyok wedang!”',
      dialogueHappy: '“Top markotop! Ireng legam mantap, gurih kluwek e nresep neng daging! Iki baru rawon asli suroboyoan rek!”',
      dialogueDisappointed: '“Waduh Rek... iki dudu rawon, kok warnane oranye orat-arit? Endi kluwek lan kemirine?”',
      dialogueSpicy: '“Waduh, lambeku kobongan rek! Cabene ojo ngawur ngene ta!”'
    },
    idealHeat: 'low', // Tanak simmering
    requiredIngredients: ['daging_sapi', 'kluwek', 'serai_memar', 'kemiri_bakar', 'daun_jeruk'],
    optionalIngredients: ['kunyit_parut', 'lengkuas', 'garam_laut', 'cabai_rawit'],
    forbiddenIngredients: ['nanas_madu'], // Sweet pineapple ruins rawon broth
    targetFlavors: {
      savory: 90,
      spicy: 35,
      sour: 25,
      sweet: 30
    },
    baseSoupColor: '#1C1917' // Deep black kluwek broth
  },
  {
    id: 'ayam-betutu',
    name: 'Ayam Betutu Gilimanuk',
    subtitle: 'Simfoni Bumbu Genep Pedas Beraroma Sakral Pura',
    origin: 'Gilimanuk & Ubud, Bali',
    region: 'Bali & NTB',
    difficulty: 2,
    cookTime: '18 Menit Simulasi',
    heroImage: '/images/recipe-ayam-betutu.jpg',
    description: 'Ayam kampung utuh yang dibalut belasan rimpang bumbu genep, serai, daun jeruk, dan cabai rawit pedas menyengat khas upacara adat Dewata.',
    culturalStory: 'Betutu berasal dari kata "be" (daging) dan "tutu" (bakar). Dahulu dimasak dengan membungkus ayam di pelepah pinang lalu dikubur dalam sekam api arang sekam selama 24 jam.',
    culturalTrivia: 'Bumbu Genep Bali melambangkan kosmologi Nawasanga: sembilan arah mata angin dengan dewa dan rempah pelindungnya.',
    guest: {
      id: 'wayan-arta',
      name: 'Jero Mangku Wayan',
      title: 'Pemangku Tradisi Boga Pura',
      avatar: '👳🏽',
      personality: 'Teduh, menjunjung kesucian cita rasa, menyukai ketajaman bumbu genep dan wangi serai.',
      dialogueIdle: '“Om Swastiastu. Siapkan bumbu genepmu dengan penuh kesungguhan hati agar berkat rempah menyatu pada ayam.”',
      dialogueHappy: '“Suksma! Aromanya harum menguar seperti persembahan agung di pelataran pura. Pedas bumbu genepnya luar biasa!”',
      dialogueDisappointed: '“Rasa bumbunya belum harmonis. Rimpang lengkuas dan kunyitmu belum matang meresap.”',
      dialogueSpicy: '“Pedasnya menyala bagai api suci Gunung Agung! Tetap nikmat meski air mata bercucuran!”'
    },
    idealHeat: 'high',
    requiredIngredients: ['ayam_kampung', 'kunyit_parut', 'lengkuas', 'serai_memar', 'cabai_rawit', 'daun_jeruk'],
    optionalIngredients: ['kemiri_bakar', 'garam_laut', 'gula_aren'],
    forbiddenIngredients: ['kluwek'],
    targetFlavors: {
      savory: 85,
      spicy: 90,
      sour: 40,
      sweet: 20
    },
    baseSoupColor: '#D97706' // Fiery spicy aromatic glaze
  },
  {
    id: 'asam-padeh',
    name: 'Gulai Ikan Asam Padeh Minang',
    subtitle: 'Asam Menyengat & Pedas Murni Tanpa Santan',
    origin: 'Padang & Pariaman, Sumatera Barat',
    region: 'Sumatera',
    difficulty: 2,
    cookTime: '14 Menit Simulasi',
    heroImage: '/images/recipe-pempek.jpg',
    description: 'Gulai merah menyala yang segar tanpa setetespun santan; mengandalkan ketajaman asam kandis, daun jeruk, dan cabai giling merah khas pesisir Ranah Minang.',
    culturalStory: 'Berbeda dengan masakan Minang pada umumnya yang sarat santan kental, Asam Padeh diciptakan pelaut pesisir Pariaman agar kuah tahan berhari-hari di lautan tanpa basi berkat khasiat antiseptik alami asam kandis.',
    culturalTrivia: 'Asam kandis menghasilkan tingkat keasaman murni dengan aftertaste manis lembut yang tidak merusak lambung.',
    guest: {
      id: 'uni-rosna',
      name: 'Uni Rosna',
      title: 'Bundo Kanduang Pesisir Ranah Minang',
      avatar: '🧕🏽',
      personality: 'Cermat, berselera tinggi, sangat menghargai warna kuah merah menyala dan keseimbangan asam kandis.',
      dialogueIdle: '“Rancak bana! Ingek ya Koki, Asam Padeh ndak pakai santan doh! Kuahkan asam kandis jo cabai nan segar!”',
      dialogueHappy: '“Onde mande! Sabana lamak! Asam kandisnyo manggigik lidah, padeh segar nan mambuek paluah mangucua!”',
      dialogueDisappointed: '“Alah taserak raso kuah kau ko. Kurang asam kandis jo cabai rawit, talampau tawa!”',
      dialogueSpicy: '“Apo sabana padeh bana ko? Tapi yo lamak di kapalo dingin!”'
    },
    idealHeat: 'medium',
    requiredIngredients: ['patin_segar', 'asam_kandis', 'cabai_rawit', 'serai_memar', 'daun_jeruk'],
    optionalIngredients: ['kunyit_parut', 'lengkuas', 'garam_laut'],
    forbiddenIngredients: ['santan_kelapa', 'kluwek'], // Authentic Asam Padeh NEVER uses coconut milk!
    targetFlavors: {
      savory: 75,
      spicy: 85,
      sour: 95,
      sweet: 15
    },
    baseSoupColor: '#DC2626' // Vivid Crimson Broth
  },
  {
    id: 'coto-makassar',
    name: 'Coto Rempah Makassar',
    subtitle: 'Warisan Pelaut Bugis Berkuah Kacang & Kemiri Bakar',
    origin: 'Makassar & Gowa, Sulawesi Selatan',
    region: 'Sulawesi',
    difficulty: 3,
    cookTime: '22 Menit Simulasi',
    heroImage: '/images/recipe-rawon.jpg',
    description: 'Sup daging sapi legendaris kerajaan Gowa dengan kuah keruh gurih berpasir berkat 40 macam rempah pusaka, kemiri sangrai, dan perasan jeruk nipis.',
    culturalStory: 'Dahulu merupakan hidangan istana Somba Opu yang disajikan kepada para syahbandar dan duta pelaut dunia saat bersandar di pelabuhan rempah Makassar.',
    culturalTrivia: 'Air tajin (cucian beras putih) secara tradisional dipakai mengganti air biasa untuk melipatgandakan kegurihan kaldu coto.',
    guest: {
      id: 'daeng-rasyid',
      name: 'Daeng Rasyid',
      title: 'Nakhoda Pinisi Bugis Selat Makassar',
      avatar: '👨🏽‍✈️',
      personality: 'Gagah berani, menyukai kaldu daging kaya kemiri bakar yang mengenyangkan setelah berlayar berbulan-bulan.',
      dialogueIdle: '“Tabbik! Buatkan kuah coto yang kental berlemak kemiri bakar untuk menyegarkan stamina awak kapal Pinisi!”',
      dialogueHappy: '“Salama’ ki! Kuah cotonya gurih berpasir, wangi serai dan daging sapinya langsung menembus dada pelaut tua ini!”',
      dialogueDisappointed: '“Kurang mantap Daeng. Kuahnya terlalu encer dan kemirinya belum tercium gurih.”',
      dialogueSpicy: '“Pedasnya menampar bagai gelombang Selat Makassar! Tapi nakhoda pantang mundur!”'
    },
    idealHeat: 'medium',
    requiredIngredients: ['daging_sapi', 'kemiri_bakar', 'serai_memar', 'lengkuas', 'garam_laut'],
    optionalIngredients: ['daun_jeruk', 'cabai_rawit', 'gula_aren'],
    forbiddenIngredients: ['kluwek', 'nanas_madu'],
    targetFlavors: {
      savory: 95,
      spicy: 45,
      sour: 30,
      sweet: 35
    },
    baseSoupColor: '#B45309' // Rich Nutty Umami Broth
  }
];
