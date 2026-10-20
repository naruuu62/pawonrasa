export interface JamuItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Penghangat' | 'Detoks & Kebugaran' | 'Stamina & Pegal' | 'Imunitas Alami';
  emoji: string;
  image: string;
  origin: string;
  ingredients: string[];
  tasteProfile: string;
  benefits: string[];
  traditionalUsage: string;
  heritageStory: string;
  brewingTip: string;
}

export const TRADITIONAL_JAMU: JamuItem[] = [
  {
    id: 'beras-kencur',
    name: 'Jamu Beras Kencur',
    subtitle: 'Eliksir Kesegaran Tubuh & Pereda Linu Sehabis Kerja Keras',
    category: 'Stamina & Pegal',
    emoji: '🌾',
    image: '/images/jamu-beras-kencur.jpg',
    origin: 'Jawa Tengah & DI Yogyakarta',
    ingredients: ['Kencur (Kaempferia galanga)', 'Beras Sangrai', 'Gula Aren Kelapa', 'Asam Jawa', 'Sedikit Jahe Emprit'],
    tasteProfile: 'Manis gurih lembut dengan hangat pedas semriwing kencur di tenggorokan',
    benefits: [
      'Meredakan pegal linu, kelelahan otot, dan masuk angin',
      'Mengurangi peradangan pita suara & batuk berdahak',
      'Meningkatkan nafsu makan alami dan menyegarkan pencernaan'
    ],
    traditionalUsage: 'Diminum hangat atau dingin sehabis bekerja di ladang atau setelah aktivitas fisik berat.',
    heritageStory: 'Beras kencur adalah salah satu jamu paling populer dalam tradisi "Jamu Gendong" wanita Jawa sejak era Mataram Kuno. Kombinasi tepung beras sangrai yang halus bertindak sebagai karbohidrat instan penopang energi, sementara rimpang kencur mengandung etil p-metoksisinamat yang terbukti secara farmakologi meredakan spasme otot.',
    brewingTip: 'Kencur tidak boleh direbus terlalu lama agar minyak atsiri wangi dan senyawa antimikrobanya tidak menguap.'
  },
  {
    id: 'kunyit-asam',
    name: 'Jamu Kunyit Asam',
    subtitle: 'Alkimia Emas Pembersih Darah & Penyejuk Suhu Tubuh',
    category: 'Detoks & Kebugaran',
    emoji: '✨',
    image: '/images/jamu-kunyit-asam.jpg',
    origin: 'Keraton Surakarta & Yogyakarta',
    ingredients: ['Kunyit Biang Parut', 'Daging Asam Jawa Matang', 'Gula Kelapa Asli', 'Garam Kristal Laut'],
    tasteProfile: 'Kecut asam segar berpadu manis legit aren dengan aroma tanah wangi kunyit',
    benefits: [
      'Antioksidan dan anti-inflamasi kuat berkat senyawa kurkuminoid',
      'Melancarkan sirkulasi darah dan meredakan nyeri haid pada wanita',
      'Mendinginkan suhu tubuh dan mencerahkan kulit secara alami'
    ],
    traditionalUsage: 'Diminum pagi atau sore hari secara rutin sebagai ramuan awet muda putri keraton.',
    heritageStory: 'Dalam naskah kuno Serat Centhini (1814 M), kunyit asam dicatat sebagai minuman kebugaran harian para bangsawan keraton. Keasaman alami asam jawa (asam tartarat) berfungsi menstabilkan kelarutan senyawa kurkumin dalam kunyit sehingga lebih mudah diserap oleh saluran pencernaan manusia.',
    brewingTip: 'Gunakan kunyit biang (rimpang induk) yang berwarna oranye tua kemerahan untuk konsentrasi kurkumin tertinggi.'
  },
  {
    id: 'wedang-uwuh',
    name: 'Wedang Uwuh Imogiri',
    subtitle: 'Minuman Sampah Dedaunan Hutan yang Berharga Bagai Emas',
    category: 'Penghangat',
    emoji: '🍂',
    image: '/images/jamu-wedang-uwuh.jpg',
    origin: 'Makam Raja-Raja Imogiri, Bantul, Yogyakarta',
    ingredients: ['Kayu Secang Merah', 'Jahe Bakar Geprek', 'Cengkeh & Batang Cengkeh', 'Kayu Manis', 'Kapulaga Jawa', 'Gula Batu'],
    tasteProfile: 'Hangat menyengat berempah harum dengan warna merah marun memikat dari kayu secang',
    benefits: [
      'Menghangatkan dada, melancarkan pernapasan saat flu & batuk',
      'Kaya flavonoid dan polifenol dari kayu secang untuk melawan radikal bebas',
      'Membantu menurunkan kadar kolesterol jahat dan memperlancar aliran darah'
    ],
    traditionalUsage: 'Diseduh dengan air mendidih dan diminum malam hari saat udara pegunungan terasa dingin.',
    heritageStory: 'Dinamakan "uwuh" (bahasa Jawa yang berarti sampah dedaunan) karena wujud rempahnya tampak seperti guguran daun kering yang tersapu angin di pelataran makam Imogiri. Raja Sultan Agung Mataram konon meminta abdi dalem membuat minuman penghangat dari apa pun yang jatuh dari pohon rempah keraton.',
    brewingTip: 'Gunakan gula batu tebu asli agar rasa manisnya tidak menenggelamkan aroma cengkeh dan kapulaga.'
  },
  {
    id: 'temulawak-madu',
    name: 'Jamu Temulawak Madu',
    subtitle: 'Rimpang Pusaka Nusantara Penjaga Organ Hati & Imun',
    category: 'Imunitas Alami',
    emoji: '🍯',
    image: '/images/jamu-temulawak-madu.jpg',
    origin: 'Jawa & Madura',
    ingredients: ['Rimpang Temulawak (Curcuma zanthorrhiza)', 'Madu Hutan Liar', 'Serai Memar', 'Pandan Wangi'],
    tasteProfile: 'Pahit lembut aromatik yang diimbangi kelembutan manis madu alami',
    benefits: [
      'Senyawa kurkumin & xanthorrhizol melindungi dan meregenerasi sel hati (hepatoprotektor)',
      'Memperbaiki fungsi kantung empedu dan mengatasi perut kembung kronis',
      'Meningkatkan daya tahan tubuh anak-anak maupun dewasa terhadap infeksi musiman'
    ],
    traditionalUsage: 'Diminum satu cangkir hangat di pagi hari sebelum sarapan.',
    heritageStory: 'Temulawak adalah tanaman endemik asli Indonesia yang telah diakui dunia farmasi internasional. Leluhur Sunda dan Jawa menjadikannya ramuan wajib bagi siapa pun yang baru sembuh dari sakit berat untuk memulihkan nafsu makan dan tenaga.',
    brewingTip: 'Tambahkan perasan jeruk nipis atau sedikit serai wangi untuk melembutkan aroma khas temulawak.'
  },
  {
    id: 'wedang-jahe-serai',
    name: 'Wedang Jahe Emprit & Serai',
    subtitle: 'Bara Api Herbal Penakluk Masuk Angin & Dingin Malam',
    category: 'Penghangat',
    emoji: '🔥',
    image: '/images/jamu-wedang-jahe.jpg',
    origin: 'Nusantara',
    ingredients: ['Jahe Emprit Tua Bakar', 'Batang Serai Bagian Putih', 'Gula Merah Tebu', 'Sedikit Bunga Cengkeh'],
    tasteProfile: 'Pedas menggigit menggelitik tenggorokan dengan wangi sitrun segar serai',
    benefits: [
      'Gingerol pada jahe mempercepat vasodilatasi pembuluh darah, memicu keringat sehat',
      'Meredakan mual mabuk perjalanan dan sakit perut akibat kedinginan',
      'Menghambat pertumbuhan bakteri patogen di rongga mulut dan tenggorokan'
    ],
    traditionalUsage: 'Diminum saat tubuh mulai terasa meriang, masuk angin, atau sehabis kehujanan.',
    heritageStory: 'Berbeda dengan jahe gajah yang berair banyak namun tidak terlalu pedas, masyarakat pedesaan Jawa dan Sumatera selalu memilih jahe emprit (jahe sunti) yang kecil namun konsentrasi minyak atsirinya sangat tajam bagai kilat.',
    brewingTip: 'Bakar jahe utuh di atas arang sejenak sebelum digeprek agar aroma langu tanahnya hilang dan aroma manis karamel terpancar.'
  },
  {
    id: 'paitan-brotowali',
    name: 'Jamu Paitan Sambiloto',
    subtitle: 'Pahitnya Obat Kejujuran Pembersih Darah & Gula',
    category: 'Detoks & Kebugaran',
    emoji: '🌿',
    image: '/images/jamu-paitan.jpg',
    origin: 'Jawa & Bali',
    ingredients: ['Batang Brotowali (Tinospora crispa)', 'Daun Sambiloto', 'Akar Alang-alang', 'Meniran'],
    tasteProfile: 'Sangat pahit menusuk lidah, namun berangsur manis dingin di pangkal tenggorokan',
    benefits: [
      'Menurunkan kadar gula darah dan memperbaiki sensitivitas insulin',
      'Membantu membersihkan jerawat parah dan gatal-gatal alergi kulit',
      'Antimalaria dan antipiretik alami penurun demam tinggi'
    ],
    traditionalUsage: 'Diminum satu sloki kecil, segera diikuti dengan minum sedikit air manis asam jawa sebagai pembilas lidah.',
    heritageStory: 'Pepatah Jawa mengatakan "Pahit iku jamu, manis iku godha" (Pahit itu obat, manis itu godaan). Sambiloto dinobatkan sebagai "King of Bitters" dalam botani dunia, dan terbukti klinis mengandung andrografolida sebagai peningkat sel darah putih.',
    brewingTip: 'Jangan meminumnya dengan campuran gula pasir; gunakan bilasan air asam kunyit terpisah jika tidak tahan rasa pahitnya.'
  }
];
