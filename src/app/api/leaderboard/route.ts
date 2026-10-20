import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveLeaderboard, syncProfileToSupabase } from '@/lib/supabase';
import { LEADERBOARD_MASTERS } from '@/data/leaderboard';

export async function GET(req: NextRequest) {
  try {
    const liveList = await fetchLiveLeaderboard();

    if (liveList && liveList.length > 0) {
      return NextResponse.json({
        source: 'supabase',
        data: liveList
      });
    }

    // Fallback ke master data lokal jika tabel di Supabase belum dibuat / kosong
    return NextResponse.json({
      source: 'local_fallback',
      data: LEADERBOARD_MASTERS
    });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return NextResponse.json({
      source: 'local_fallback',
      data: LEADERBOARD_MASTERS
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !body.id) {
      return NextResponse.json({ error: 'Data profil tidak lengkap' }, { status: 400 });
    }

    const success = await syncProfileToSupabase(body);
    return NextResponse.json({ success });
  } catch (err) {
    console.error('Error updating leaderboard profile:', err);
    return NextResponse.json({ error: 'Gagal memperbarui profil' }, { status: 500 });
  }
}
