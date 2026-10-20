-- ==============================================================================
-- PAWON RASA - SKEMA DATABASE SUPABASE
-- Silakan salin semua query ini dan jalankan di SQL Editor di dashboard Supabase Anda.
-- ==============================================================================

-- 1. TABEL PROFIL PEMAIN (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Koki Pawon',
  avatar TEXT NOT NULL DEFAULT '🧑🏽‍🍳',
  region TEXT NOT NULL DEFAULT 'Nusantara',
  level INT NOT NULL DEFAULT 1,
  title TEXT NOT NULL DEFAULT 'Juru Masak Pemula',
  exp INT NOT NULL DEFAULT 0,
  coins INT NOT NULL DEFAULT 50,
  completed_recipes TEXT[] DEFAULT '{}',
  unlocked_codex_cards TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL SESI MEMASAK (COOKING_SESSIONS)
CREATE TABLE IF NOT EXISTS public.cooking_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  recipe_id TEXT NOT NULL,
  recipe_name TEXT NOT NULL,
  accuracy_score INT NOT NULL,
  customer_reaction TEXT NOT NULL,
  review_title TEXT,
  review_comment TEXT,
  heat_level TEXT NOT NULL,
  ingredients_used TEXT[] DEFAULT '{}',
  exp_earned INT NOT NULL DEFAULT 0,
  coins_earned INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PAPAN PERINGKAT (LEADERBOARD)
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🧑🏽‍🍳',
  region TEXT NOT NULL DEFAULT 'Nusantara',
  exp INT NOT NULL DEFAULT 0,
  mastered_count INT NOT NULL DEFAULT 0,
  accuracy_rate INT NOT NULL DEFAULT 85,
  badge TEXT DEFAULT '🏅 Koki Berbakat',
  is_bot BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cooking_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Terbuka (Public Read & Write untuk Game Indie tanpa login email)
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public profiles write" ON public.profiles;
CREATE POLICY "Public profiles write" ON public.profiles FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public sessions read" ON public.cooking_sessions;
CREATE POLICY "Public sessions read" ON public.cooking_sessions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public sessions write" ON public.cooking_sessions;
CREATE POLICY "Public sessions write" ON public.cooking_sessions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public leaderboard read" ON public.leaderboard;
CREATE POLICY "Public leaderboard read" ON public.leaderboard FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public leaderboard write" ON public.leaderboard;
CREATE POLICY "Public leaderboard write" ON public.leaderboard FOR ALL USING (true) WITH CHECK (true);

-- 4. SEED DATA: 10 MASTER CHEF NUSANTARA (JAWARA PEKAN INI)
INSERT INTO public.leaderboard (id, name, title, avatar, region, exp, mastered_count, accuracy_rate, badge, is_bot)
VALUES
  ('bot_1', 'Nyai Ageng Rempah', 'Mahaguru Dapur Keraton', '👑', 'Yogyakarta', 4850, 18, 98, '🏆 Juara Emas Nusantara', TRUE),
  ('bot_2', 'Raden Mas Ragam Rasa', 'Patih Gastronomi Sriwijaya', '👨🏽‍🍳', 'Palembang', 4210, 16, 94, '🥈 Pendekar Pindang Emas', TRUE),
  ('bot_3', 'Sutan Palito Alam', 'Bujang Ranah Minang', '🤠', 'Bukittinggi', 3940, 15, 92, '🥉 Maestro Randang Salero', TRUE),
  ('bot_4', 'Bli Ketut Sambal Bejek', 'Juru Racik Bumbu Genep', '🌺', 'Bali', 3420, 13, 91, '🎖️ Ahli Betutu Sakral', TRUE),
  ('bot_5', 'Daeng Bella Pinisi', 'Nakhoda Coto Somba Opu', '⛵', 'Makassar', 3180, 12, 89, '🎖️ Pelaut Rempah Bugis', TRUE),
  ('bot_6', 'Inang Romauli Silalahi', 'Penjaga Rasa Na Niarsik', '👵🏽', 'Sumatera', 2950, 11, 88, '🎖️ Ratu Getar Andaliman', TRUE),
  ('bot_7', 'Cak Sugeng Rawon Ireng', 'Pande Kuali Wesi Kalimas', '🧔🏽', 'Jawa', 2780, 10, 87, '🎖️ Pawang Kluwek 100 Tahun', TRUE),
  ('bot_8', 'Non Kasih Banda Emas', 'Pemetik Buah Pala Lonthoir', '👒', 'Maluku', 2450, 9, 86, '🎖️ Putri Rempah Maluku', TRUE),
  ('bot_9', 'Abang Jampang Betawi', 'Pendekar Semur Kerbau', '🥋', 'Jakarta', 2120, 8, 85, '🎖️ Jawara Batavia', TRUE),
  ('bot_10', 'Kakak Ocep Papeda', 'Penyelam Teluk Doreri', '🤿', 'Papua', 1890, 7, 84, '🎖️ Ahli Kuah Kuning Kenari', TRUE)
ON CONFLICT (id) DO NOTHING;
