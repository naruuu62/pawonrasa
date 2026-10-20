// ==============================================================================
// PAWON RASA - AUDIO ENGINE & NUSANTARA TRADITIONAL BGM SYNTHESIZER
// Menggunakan Web Audio API murni: Gamelan Pelog/Slendro, Suling Bambu, Gong Ageng, & Kenong
// Ringan, 0 dependensi file mp3 eksternal, dan responsif di semua perangkat.
// ==============================================================================

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private bgmTimer: any = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;

  // Laras Nada Pentatonis Salendro/Degung Sunda & Jawa (Laras Rasa Pawon)
  private readonly SCALES = {
    GONG_AGENG: 55.0,    // Gong Ageng (A1 Bass Dalam)
    KEMPUL: 110.0,       // Kempul (A2 Gantung)
    KENONG: 220.0,       // Kenong Penuntun (A3)
    DA: 220.0,           // Nada 1 (A3)
    MI: 247.5,           // Nada 2 (B3)
    NA: 275.0,           // Nada 3 (C#4)
    TI: 330.0,           // Nada 4 (E4)
    LA: 370.0,           // Nada 5 (F#4)
    DA_HI: 440.0,        // Nada 1 Tinggi (A4)
    MI_HI: 495.0,        // Nada 2 Tinggi (B4)
    NA_HI: 550.0,        // Nada 3 Tinggi (C#5)
    TI_HI: 660.0,        // Nada 4 Tinggi (E5)
    LA_HI: 740.0,        // Nada 5 Tinggi (F#5)
    DA_TOP: 880.0        // Nada 1 Puncak (A5)
  };

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMuted = localStorage.getItem('pawonrasa_muted');
      this.isMuted = savedMuted === 'true';

      const savedBgm = localStorage.getItem('pawonrasa_bgm_active');
      // Default: BGM aktif jika tidak dimute oleh user
      const shouldPlayBgm = savedBgm !== 'false' && !this.isMuted;

      // Autoplay setelah interaksi pengguna pertama kali (aturan browser AudioContext)
      const startOnFirstInteraction = () => {
        if (!this.isMuted && shouldPlayBgm && !this.isBgmPlaying) {
          this.startBgm();
        }
        window.removeEventListener('click', startOnFirstInteraction);
        window.removeEventListener('keydown', startOnFirstInteraction);
        window.removeEventListener('touchstart', startOnFirstInteraction);
      };

      window.addEventListener('click', startOnFirstInteraction, { once: true });
      window.addEventListener('keydown', startOnFirstInteraction, { once: true });
      window.addEventListener('touchstart', startOnFirstInteraction, { once: true });
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master Gain
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // BGM Dedicated Submix Gain (lembut di latar belakang)
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.28, this.ctx.currentTime);
        this.bgmGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // ============================================================================
  // INSTRUMEN NUSANTARA: GAMELAN PERUNGGU (BONANG / SARON)
  // Karakter: Denting perunggu hangat dengan overtones inharmonis khas gamelan
  // ============================================================================
  private playGamelanBronze(freq: number, duration: number = 1.6, volume: number = 0.22, panX: number = 0) {
    if (this.isMuted || !this.bgmGain) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Carrier (Nada Dasar Perunggu)
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(freq, t);

    // Modulator (Overtones Logam Perunggu ~2.76x dan ~5.4x)
    const mod = ctx.createOscillator();
    mod.type = 'triangle';
    mod.frequency.setValueAtTime(freq * 2.76, t);

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(freq * 0.8, t);
    modGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
    mod.connect(carrier.frequency);

    // Envelope Amplitude
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, t);
    noteGain.gain.linearRampToValueAtTime(volume, t + 0.008); // Pukulan tabuh cepat
    noteGain.gain.exponentialRampToValueAtTime(volume * 0.45, t + 0.25);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + duration); // Dengkung panjang

    // Panner Stereo Ruang Gamelan
    let outputNode: AudioNode = noteGain;
    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(panX, t);
      noteGain.connect(panner);
      outputNode = panner;
    }

    carrier.connect(noteGain);
    outputNode.connect(this.bgmGain);

    carrier.start(t);
    mod.start(t);
    carrier.stop(t + duration);
    mod.stop(t + duration);
  }

  // ============================================================================
  // INSTRUMEN NUSANTARA: SULING BAMBU (SUNDANESE / BALINESE BAMBOO FLUTE)
  // Karakter: Nafas bambu lembut, meliuk melodi puitis dengan vibrato alami
  // ============================================================================
  private playBambooSuling(freq: number, duration: number = 1.8, volume: number = 0.16) {
    if (this.isMuted || !this.bgmGain) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Oscillator Nada Suling
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq * 0.98, t); // Sedikit tarikan nafas awal
    osc.frequency.exponentialRampToValueAtTime(freq, t + 0.1);

    // LFO Vibrato (Getaran nafas pemain suling ~4.8 Hz)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.8, t);
    lfoGain.gain.setValueAtTime(0, t);
    lfoGain.gain.linearRampToValueAtTime(freq * 0.018, t + 0.3); // Vibrato masuk lembut
    lfo.connect(osc.frequency);

    // Bandpass Filter (Karakter rongga bilah bambu gunung)
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq, t);
    filter.Q.setValueAtTime(3.8, t);

    // Envelope Tiupan Nafas
    const sulingGain = ctx.createGain();
    sulingGain.gain.setValueAtTime(0, t);
    sulingGain.gain.linearRampToValueAtTime(volume, t + 0.15); // Seruput nafas lembut
    sulingGain.gain.setValueAtTime(volume * 0.9, t + duration * 0.7);
    sulingGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(filter);
    filter.connect(sulingGain);
    sulingGain.connect(this.bgmGain);

    osc.start(t);
    lfo.start(t);
    osc.stop(t + duration);
    lfo.stop(t + duration);
  }

  // ============================================================================
  // INSTRUMEN NUSANTARA: GONG AGENG (GONG PERUNGGU BESAR KERATON)
  // Karakter: Dentuman bass sub-frekuensi yang sakral, penanda siklus gongan
  // ============================================================================
  private playGongAgeng(volume: number = 0.38) {
    if (this.isMuted || !this.bgmGain) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;

    // Sub-bass fundamental (55 Hz)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(this.SCALES.GONG_AGENG, t);

    // Harmonis logam gong (110 Hz & 165 Hz)
    const metalOsc = ctx.createOscillator();
    metalOsc.type = 'triangle';
    metalOsc.frequency.setValueAtTime(this.SCALES.KEMPUL, t);

    const gongGain = ctx.createGain();
    gongGain.gain.setValueAtTime(0, t);
    gongGain.gain.linearRampToValueAtTime(volume, t + 0.04);
    gongGain.gain.exponentialRampToValueAtTime(volume * 0.5, t + 0.8);
    gongGain.gain.exponentialRampToValueAtTime(0.0001, t + 4.8); // Resonansi panjang

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, t);

    subOsc.connect(filter);
    metalOsc.connect(filter);
    filter.connect(gongGain);
    gongGain.connect(this.bgmGain);

    subOsc.start(t);
    metalOsc.start(t);
    subOsc.stop(t + 4.8);
    metalOsc.stop(t + 4.8);
  }

  // ============================================================================
  // KENDANG NUSANTARA (TABUH KAYU KENDANG KETIPUNG)
  // ============================================================================
  private playKendangTap(isLow: boolean = true) {
    if (this.isMuted || !this.bgmGain) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isLow ? 'sine' : 'triangle';
    const startFreq = isLow ? 135 : 240;
    const endFreq = isLow ? 65 : 140;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.08);

    gain.gain.setValueAtTime(isLow ? 0.22 : 0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    osc.connect(gain);
    gain.connect(this.bgmGain);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  // ============================================================================
  // SIKLUS BGM GAMELAN & SULING NUSANTARA (COZY TAVERN AMBIENCE)
  // Tempo tenang: ~68 BPM (550ms per step ketukan)
  // ============================================================================
  public startBgm() {
    if (this.isBgmPlaying) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isBgmPlaying = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawonrasa_bgm_active', 'true');
      window.dispatchEvent(new Event('pawonrasa_bgm_updated'));
    }

    const S = this.SCALES;
    const STEP_MS = 560; // ~67 BPM ketukan gamelan santai

    // Komposisi 32-Ketukan: Lancaran Rasa Nusantara (Gamelan, Suling, Kendang)
    this.bgmTimer = setInterval(() => {
      if (this.isMuted || !this.isBgmPlaying) return;

      const step = this.currentStep % 32;

      // 1. GONG SAKRAL PADA KETUKAN AWAL (Gongan Kehormatan)
      if (step === 0) {
        this.playGongAgeng(0.42);
        this.playGamelanBronze(S.DA_HI, 2.4, 0.25, 0);
        this.playBambooSuling(S.DA, 2.2, 0.18);
      }

      // 2. KEMPUL PADA TENGAH SIKLUS (Ketukan 16)
      if (step === 16) {
        this.playGamelanBronze(S.KENONG, 2.2, 0.28, -0.2);
        this.playBambooSuling(S.TI, 2.4, 0.20);
      }

      // 3. KENONG PENUNTUN (Setiap 8 Ketukan)
      if (step === 8 || step === 24) {
        this.playGamelanBronze(S.KENONG, 1.8, 0.24, 0.25);
      }

      // 4. BONANG INTERLOCKING & DENTING PERUNGGU MELODIUS
      switch (step) {
        case 2:
          this.playGamelanBronze(S.TI_HI, 1.4, 0.20, 0.3);
          this.playKendangTap(false);
          break;
        case 4:
          this.playGamelanBronze(S.NA_HI, 1.4, 0.22, -0.3);
          this.playBambooSuling(S.NA, 1.8, 0.16);
          break;
        case 6:
          this.playGamelanBronze(S.MI_HI, 1.2, 0.18, 0.2);
          this.playKendangTap(true);
          break;
        case 10:
          this.playGamelanBronze(S.DA_TOP, 1.5, 0.22, 0.35);
          this.playBambooSuling(S.LA, 2.0, 0.19);
          break;
        case 12:
          this.playGamelanBronze(S.LA_HI, 1.2, 0.18, -0.25);
          this.playKendangTap(false);
          break;
        case 14:
          this.playGamelanBronze(S.TI_HI, 1.4, 0.20, 0.2);
          this.playKendangTap(true);
          break;
        case 18:
          this.playGamelanBronze(S.NA_HI, 1.4, 0.22, -0.3);
          this.playBambooSuling(S.MI, 2.2, 0.18);
          break;
        case 20:
          this.playGamelanBronze(S.MI_HI, 1.2, 0.18, 0.25);
          this.playKendangTap(false);
          break;
        case 22:
          this.playGamelanBronze(S.DA_HI, 1.4, 0.22, -0.2);
          this.playBambooSuling(S.DA, 2.2, 0.19);
          break;
        case 26:
          this.playGamelanBronze(S.TI_HI, 1.3, 0.18, 0.3);
          this.playKendangTap(true);
          break;
        case 28:
          this.playGamelanBronze(S.NA_HI, 1.3, 0.20, -0.2);
          this.playBambooSuling(S.LA, 2.2, 0.17);
          break;
        case 30:
          this.playGamelanBronze(S.MI_HI, 1.2, 0.18, 0.15);
          this.playKendangTap(false);
          break;
      }

      this.currentStep++;
    }, STEP_MS);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawonrasa_bgm_active', 'false');
      window.dispatchEvent(new Event('pawonrasa_bgm_updated'));
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.isMuted = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('pawonrasa_muted', 'false');
      }
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
      }
      this.startBgm();
      return true;
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pawonrasa_muted', String(this.isMuted));
    }

    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }

    if (this.isMuted) {
      this.stopBgm();
      this.stopSimmer();
    } else {
      this.startBgm();
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('pawonrasa_bgm_updated'));
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // ============================================================================
  // EFEK SUARA INTERAKTIF DAPUR (SFX)
  // ============================================================================

  // Ketukan kayu ulekan / tombol menu
  public playWoodClick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  // Memasukkan bahan ke dalam kuali (ceburan kuah kaldu)
  public playDropIngredient() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(460, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  }

  // Mengubah tuas api kompor
  public playFlameSwitch(heat: 'low' | 'medium' | 'high') {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freqMap = { low: 180, medium: 260, high: 380 };
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freqMap[heat] || 220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  }

  // Letupan gelembung kuah mendidih
  public playBubblePop() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const baseFreq = 300 + Math.random() * 250;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 150, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  }

  // Fanfare kemenangan rasa leluhur (Gamelan Pelog Arpeggio)
  public playVictoryChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    // Nada Gamelan Pelog Kemenangan: Da -> Na -> Ti -> Da_Hi
    const notes = [
      this.SCALES.DA_HI,
      this.SCALES.NA_HI,
      this.SCALES.TI_HI,
      this.SCALES.DA_TOP
    ];

    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playGamelanBronze(freq, 2.0, 0.32, (idx - 1.5) * 0.3);
      }, idx * 120);
    });
  }

  // Koin Pawon bergemerincing
  public playCoinReward() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx || !this.masterGain) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime);
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  }

  public stopSimmer() {
    // Safety cleanup
  }
}

export const soundFx = new SoundController();
