import React, { useState, useEffect, useRef } from "react";
import {
  Music2, Sparkles, Play, Pause, Image as ImageIcon, Video, Users, Heart,
  ChevronRight, ChevronLeft, Loader2, Upload, Wand2, Disc3, Zap, Check,
  Mic, Globe2, Clock3, Radio, Music, X, ArrowRight, RotateCcw, Download,
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const GENRES = [
  { id: "arabesk", label: "Arabesk", desc: "Melancholisch, dramatisch, orientalisch" },
  { id: "pop", label: "Pop", desc: "Modern, eingängig, radiotauglich" },
  { id: "rock", label: "Rock", desc: "Kraftvoll, gitarrenlastig, energisch" },
  { id: "rap", label: "Rap", desc: "Rhythmisch, textbetont, urban" },
  { id: "kinderlied", label: "Kinderlied", desc: "Freundlich, verspielt, einfach" },
];

const LANGUAGES = ["Türkisch", "Deutsch", "Englisch", "Arabisch", "Französisch"];

const SITE_LANGS = [
  { id: "de", label: "Deutsch", short: "DE" },
  { id: "en", label: "English", short: "EN" },
  { id: "tr", label: "Türkçe", short: "TR" },
];

const UI = {
  de: {
    demoStart: "Demo starten",
    ideaLyricsMusic: "Idee · Lyrics · Musik · Cover · Video",
    landingTitleA: "Von der Idee",
    landingTitleB: "zum fertigen",
    landingTitleC: "Song.",
    landingText: "Wähle Stil, Sprache und Stimmung — songora.ai schreibt Lyrics, komponiert den Style-Prompt und produziert deinen Track in Minuten.",
    prodTime: "ø Produktionszeit",
    genres: "Genres",
    perSong: "pro Song",
    welcome: "Willkommen zurück",
    dashboardText: "Erstelle einen neuen Song oder mach bei einem Projekt weiter.",
    newSong: "Neuen Song erstellen",
    newSongDesc: "Genre wählen → Lyrics → Musik → Cover → Video",
    projects: "Deine Projekte",
    next: "Weiter",
    back: "Zurück",
    genre: "Musikrichtung",
    genreDesc: "Wähle den Stil, der zu deinem Song passt.",
    langEpoch: "Sprache & Epoche",
    langEpochDesc: "In welcher Sprache und welchem Klang-Jahrzehnt soll der Song entstehen?",
    language: "Sprache",
    eraMulti: "Epoche (Mehrfachauswahl möglich)",
    voiceMood: "Stimme & Stimmung",
    voiceMoodDesc: "Wer singt, und welche Emotion soll mitschwingen?",
    voice: "Stimme",
    vocalAge: "Stimmalter",
    mood: "Stimmung",
    liveChoir: "Live & Chor",
    liveChoirDesc: "Optionale Klang-Elemente für mehr Atmosphäre.",
    liveFx: "Live-Effekt",
    choir: "Chor",
    songIdea: "Songidee",
    songIdeaDesc: "Beschreibe deine Idee in Stichwörtern, getrennt durch Kommas.",
    lyrics: "Lyrics",
    lyricsDesc: "Prüfe und bearbeite den Songtext, bevor es weitergeht.",
    regenerate: "↻ Neu generieren",
    moreEmotional: "Emotionaler machen",
    songName: "Songname",
    songNameDesc: "Wähle einen Vorschlag oder gib deinen eigenen Titel ein.",
    ownSongName: "Eigener Songname …",
    stylePrompt: "Music Style Prompt",
    stylePromptDesc: "Automatisch erstellt aus Genre, Stimme, Stimmung und Lyrics — frei editierbar.",
    recreate: "↻ Neu erstellen",
    music: "Musik",
    musicDesc: "Wähle deine bevorzugte Version.",
    cover: "Cover",
    coverDesc: "Ein Bild für deinen Song — optional.",
    aiCover: "KI-Cover erstellen",
    aiCoverDesc: "Passend zu Lyrics & Stimmung",
    uploadPhoto: "Eigenes Foto hochladen",
    uploadPhotoDesc: "Aus deiner Bibliothek",
    existingImage: "Vorhandenes Bild",
    existingImageDesc: "Aus früheren Projekten",
    noCover: "Kein Cover",
    noCoverDesc: "Song bleibt ohne Bild",
    chooseImage: "Bild auswählen",
    done: "Song fertig 🎉",
    doneDesc: "Dein Track ist bereit — hör rein, exportiere oder starte den nächsten.",
    createVideo: "{t.createVideo}",
    format: "Format",
    effect: "Effekt",
    render: "{t.render}",
    rendering: "Video wird gerendert …",
    videoReady: "Video bereit",
    export: "Export",
    restart: "Neuen Song erstellen",
    dashboard: "Zum Dashboard",
    websiteLanguage: "Webseitensprache",
    generatingLyrics: "ChatGPT schreibt deine Lyrics …",
    generatingMusic: "Musik wird produziert …",
    generatingGeneric: "Wird generiert …",
  },
  en: {
    demoStart: "Start demo",
    ideaLyricsMusic: "Idea · Lyrics · Music · Cover · Video",
    landingTitleA: "From your idea",
    landingTitleB: "to a finished",
    landingTitleC: "song.",
    landingText: "Choose style, language and mood — songora.ai writes lyrics, creates the style prompt and produces your track in minutes.",
    prodTime: "avg. production time",
    genres: "Genres",
    perSong: "per song",
    welcome: "Welcome back",
    dashboardText: "Create a new song or continue one of your projects.",
    newSong: "Create new song",
    newSongDesc: "Choose genre → Lyrics → Music → Cover → Video",
    projects: "Your projects",
    next: "Next",
    back: "Back",
    genre: "Music genre",
    genreDesc: "Choose the style that fits your song.",
    langEpoch: "Language & era",
    langEpochDesc: "In which language and sonic era should the song be created?",
    language: "Language",
    eraMulti: "Era (multiple selection possible)",
    voiceMood: "Voice & mood",
    voiceMoodDesc: "Who is singing, and what emotion should come through?",
    voice: "Voice",
    vocalAge: "Voice age",
    mood: "Mood",
    liveChoir: "Live & choir",
    liveChoirDesc: "Optional sound elements for more atmosphere.",
    liveFx: "Live effect",
    choir: "Choir",
    songIdea: "Song idea",
    songIdeaDesc: "Describe your idea with keywords separated by commas.",
    lyrics: "Lyrics",
    lyricsDesc: "Review and edit the lyrics before continuing.",
    regenerate: "↻ Regenerate",
    moreEmotional: "Make more emotional",
    songName: "Song title",
    songNameDesc: "Choose a suggestion or enter your own title.",
    ownSongName: "Your own song title …",
    stylePrompt: "Music Style Prompt",
    stylePromptDesc: "Automatically created from genre, voice, mood and lyrics — fully editable.",
    recreate: "↻ Recreate",
    music: "Music",
    musicDesc: "Choose your preferred version.",
    cover: "Cover",
    coverDesc: "An image for your song — optional.",
    aiCover: "Create AI cover",
    aiCoverDesc: "Matching lyrics & mood",
    uploadPhoto: "Upload your own photo",
    uploadPhotoDesc: "From your library",
    existingImage: "Existing image",
    existingImageDesc: "From previous projects",
    noCover: "No cover",
    noCoverDesc: "Song stays without an image",
    chooseImage: "Choose image",
    done: "Song finished 🎉",
    doneDesc: "Your track is ready — listen, export or start the next one.",
    createVideo: "Create video",
    format: "Format",
    effect: "Effect",
    render: "Render (−8 credits)",
    rendering: "Video is rendering …",
    videoReady: "Video ready",
    export: "Export",
    restart: "Create new song",
    dashboard: "Go to dashboard",
    websiteLanguage: "Website language",
    generatingLyrics: "ChatGPT is writing your lyrics …",
    generatingMusic: "Music is being produced …",
    generatingGeneric: "Generating …",
  },
  tr: {
    demoStart: "Demoyu başlat",
    ideaLyricsMusic: "Fikir · Sözler · Müzik · Kapak · Video",
    landingTitleA: "Fikirden",
    landingTitleB: "tamamlanmış",
    landingTitleC: "şarkıya.",
    landingText: "Tarzı, dili ve ruh halini seç — songora.ai sözleri yazar, stil istemini oluşturur ve parçanı dakikalar içinde üretir.",
    prodTime: "ort. üretim süresi",
    genres: "Tür",
    perSong: "şarkı başına",
    welcome: "Tekrar hoş geldin",
    dashboardText: "Yeni bir şarkı oluştur veya projelerinden birine devam et.",
    newSong: "Yeni şarkı oluştur",
    newSongDesc: "Tür seç → Sözler → Müzik → Kapak → Video",
    projects: "Projelerin",
    next: "İleri",
    back: "Geri",
    genre: "Müzik türü",
    genreDesc: "Şarkına uygun tarzı seç.",
    langEpoch: "Dil & dönem",
    langEpochDesc: "Şarkı hangi dilde ve hangi dönemin sound'unda oluşturulsun?",
    language: "Dil",
    eraMulti: "Dönem (çoklu seçim mümkün)",
    voiceMood: "Ses & ruh hali",
    voiceMoodDesc: "Kim söylüyor ve hangi duygu hissedilsin?",
    voice: "Ses",
    vocalAge: "Ses yaşı",
    mood: "Ruh hali",
    liveChoir: "Canlı & koro",
    liveChoirDesc: "Daha fazla atmosfer için isteğe bağlı ses öğeleri.",
    liveFx: "Canlı efekti",
    choir: "Koro",
    songIdea: "Şarkı fikri",
    songIdeaDesc: "Fikrini virgülle ayrılmış anahtar kelimelerle anlat.",
    lyrics: "Şarkı sözleri",
    lyricsDesc: "Devam etmeden önce sözleri kontrol et ve düzenle.",
    regenerate: "↻ Yeniden üret",
    moreEmotional: "Daha duygusal yap",
    songName: "Şarkı adı",
    songNameDesc: "Bir öneri seç veya kendi başlığını yaz.",
    ownSongName: "Kendi şarkı adın …",
    stylePrompt: "Music Style Prompt",
    stylePromptDesc: "Tür, ses, ruh hali ve sözlerden otomatik oluşturulur — tamamen düzenlenebilir.",
    recreate: "↻ Yeniden oluştur",
    music: "Müzik",
    musicDesc: "Tercih ettiğin versiyonu seç.",
    cover: "Kapak",
    coverDesc: "Şarkın için bir görsel — isteğe bağlı.",
    aiCover: "AI kapak oluştur",
    aiCoverDesc: "Sözler ve ruh haline uygun",
    uploadPhoto: "Kendi fotoğrafını yükle",
    uploadPhotoDesc: "Kütüphanenden",
    existingImage: "Mevcut görsel",
    existingImageDesc: "Önceki projelerden",
    noCover: "Kapak yok",
    noCoverDesc: "Şarkı görselsiz kalır",
    chooseImage: "Görsel seç",
    done: "Şarkı hazır 🎉",
    doneDesc: "Parçan hazır — dinle, dışa aktar veya yenisine başla.",
    createVideo: "Video oluştur",
    format: "Format",
    effect: "Efekt",
    render: "Render et (−8 kredi)",
    rendering: "Video hazırlanıyor …",
    videoReady: "Video hazır",
    export: "Dışa aktar",
    restart: "Yeni şarkı oluştur",
    dashboard: "Panele dön",
    websiteLanguage: "Site dili",
    generatingLyrics: "ChatGPT şarkı sözlerini yazıyor …",
    generatingMusic: "Müzik üretiliyor …",
    generatingGeneric: "Oluşturuluyor …",
  },
};


function useDeviceClass() {
  const getDevice = () => {
    const w = window.innerWidth;
    if (w <= 640) return "mobile";
    if (w <= 1024) return "tablet";
    return "desktop";
  };

  const [device, setDevice] = useState(getDevice);

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return device;
}

function LangSwitch({ siteLang, setSiteLang }) {
  return (
    <div className="lang-switch" aria-label={UI[siteLang].websiteLanguage}>
      {SITE_LANGS.map((lang) => (
        <button
          key={lang.id}
          className={`lang-btn ${siteLang === lang.id ? "lang-btn-active" : ""}`}
          onClick={() => setSiteLang(lang.id)}
          title={lang.label}
        >
          {lang.short}
        </button>
      ))}
    </div>
  );
}

const DECADES = ["1970er", "1980er", "1990er", "2000er"];

const VOCAL_TYPES = [
  { id: "male", label: "Männerstimme", icon: Mic },
  { id: "female", label: "Frauenstimme", icon: Mic },
  { id: "child", label: "Kinderstimme", icon: Mic },
];
const VOCAL_AGES = [
  { id: "young", label: "Junge Stimme" },
  { id: "mature", label: "Reife Stimme" },
];

const MOODS = ["Traurig", "Melancholisch", "Romantisch", "Fröhlich", "Dramatisch", "Nostalgisch", "Hoffnungsvoll", "Energiegeladen"];
const LEVELS = [
  { id: "off", label: "Aus" },
  { id: "light", label: "Leicht" },
  { id: "strong", label: "Stark" },
];

const INSTRUMENTS = {
  arabesk: ["Oud", "Qanun", "Bağlama", "Streicher", "analoge Bandwärme"],
  pop: ["Synth-Pads", "Pop-Drums", "helle Gitarren", "Claps"],
  rock: ["E-Gitarren", "Live-Drums", "Bass", "Orgel"],
  rap: ["808-Bass", "Hi-Hats", "Trap-Drums", "Vinyl-Knistern"],
  kinderlied: ["Glockenspiel", "Ukulele", "verspieltes Klavier", "Xylophon"],
};

const BPM = {
  Traurig: 74, Melancholisch: 78, Romantisch: 92, Fröhlich: 124,
  Dramatisch: 84, Nostalgisch: 96, Hoffnungsvoll: 102, Energiegeladen: 138,
};

const VIDEO_EFFECTS = ["Ken-Burns", "Kamerabewegung", "Audio-Visualizer", "Waveform", "Partikel", "Glow"];

/* ------------------------------- GENERATORS -------------------------------- */

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function generateLyrics(f) {
  const kws = f.idea.split(",").map((k) => k.trim()).filter(Boolean);
  const k = (i) => kws[i % Math.max(kws.length, 1)] || "diese Nacht";
  const moodLine = {
    Traurig: "und niemand hört, wie leise ich zerbrech'",
    Melancholisch: "die Farben blassen, während ich noch geh'",
    Romantisch: "dein Name bleibt das Einzige, das zählt",
    Fröhlich: "und jeder Schritt fühlt sich wie Fliegen an",
    Dramatisch: "der Himmel bricht, doch ich steh' weiter hier",
    Nostalgisch: "ich seh' uns beide noch von damals steh'n",
    Hoffnungsvoll: "und irgendwo wartet ein neuer Tag",
    Energiegeladen: "wir geben alles, keine Sekunde bleibt zurück",
  }[f.mood] || "und diese Zeile trägt, was ich nicht sag'";

  const lines = [
    "[Intro]",
    `${k(0)} — nur ein Wort, und schon bin ich zurück`,
    "",
    "[Verse 1]",
    `Ich lauf' durch ${k(0)}, denk' an ${k(1)}`,
    `Die Zeit steht still bei ${k(2)}, ganz allein`,
    moodLine,
    "so wie es war, so wird es nie mehr sein",
    "",
    "[Pre-Chorus]",
    "Und jedes Mal, wenn ich die Augen schließ'",
    `kommt ${k(0)} zurück, so unverhofft, so nah`,
    "",
    "[Chorus]",
    `${f.title || "Dieser Song"} ist alles, was mir bleibt`,
    `${k(1)}, du warst mein Anfang und mein Ziel`,
    moodLine,
    "und ich sing' es, bis der letzte Ton verklingt",
    "",
    "[Verse 2]",
    `Man sagt, die Zeit heilt Wunden — ${k(2)} weiß es besser`,
    "ich trag' das Bild von uns noch immer bei mir",
    "",
    "[Chorus]",
    `${f.title || "Dieser Song"} ist alles, was mir bleibt`,
    `${k(1)}, du warst mein Anfang und mein Ziel`,
    "",
    "[Bridge]",
    "Und wenn die letzte Strophe verklingt,",
    `bleibt nur ${k(0)} — und die Stille danach`,
    "",
    "[Final Chorus]",
    `${f.title || "Dieser Song"} ist alles, was mir bleibt`,
    `${k(1)}, du warst mein Anfang und mein Ziel`,
    moodLine,
    "",
    "[Outro]",
    `${k(0)}... ${k(0)}...`,
  ];
  return lines.join("\n");
}

function generateTitles(f) {
  const kws = f.idea.split(",").map((k) => k.trim()).filter(Boolean);
  const w1 = kws[0] || "Erinnerung";
  const w2 = kws[1] || "Regen";
  return [
    `${w1} in ${w2}`,
    `${f.mood || "Ohne"} dich`,
    `Zurück nach ${w1}`,
    `Das letzte ${w2}`,
  ];
}

function generateStylePrompt(f) {
  const decades = f.decades.length ? f.decades.join("–") : "zeitgenössisch";
  const instruments = (INSTRUMENTS[f.genre] || []).join(", ");
  const bpm = BPM[f.mood] || 100;
  const vocal = `${f.vocalType === "child" ? "Kinderstimme" : f.vocalAge === "young" ? "junge" : "reife"} ${
    f.vocalType === "male" ? "Männerstimme" : f.vocalType === "female" ? "Frauenstimme" : ""
  }`.trim();
  const live = f.live !== "off" ? `, ${f.live === "strong" ? "starke Live-Konzertatmosphäre" : "leichter Live-Charakter"}` : "";
  const choir = f.choir !== "off" ? `, ${f.choir === "strong" ? "kraftvoller Background-Chor im Final Chorus" : "leichter Background-Chor im Chorus"}` : "";
  return `${decades} ${f.genre ? GENRES.find((g) => g.id === f.genre)?.label : ""}, ${vocal}, ${(f.mood || "emotional").toLowerCase()}, ${instruments}, langsames bis mittleres Tempo (${bpm} BPM), tiefer Reverb, ${f.language || "internationale"} Vocals, cinematisches Arrangement, ausdrucksstarker Gesang, emotionaler Refrain${live}${choir}.`;
}

function generateVersions(f) {
  return [1, 2, 3].map((n) => ({
    id: n,
    label: `Version ${n}`,
    duration: 150 + hashStr(f.title + n) % 60,
    bpm: (BPM[f.mood] || 100) + (n - 2) * 2,
    key: ["A-Moll", "D-Moll", "G-Moll"][n - 1],
    wave: Array.from({ length: 64 }, (_, i) => {
      const seed = hashStr(f.title + n + i);
      return 0.15 + (seed % 100) / 100 * 0.85;
    }),
  }));
}

function coverPalette(seedStr) {
  const h = hashStr(seedStr);
  const h1 = h % 360;
  const h2 = (h1 + 40 + (h % 60)) % 360;
  const h3 = (h1 + 200) % 360;
  return { h1, h2, h3 };
}

/* -------------------------------- UI ATOMS --------------------------------- */

function Eq({ size = 5 }) {
  return (
    <div className="flex items-end gap-1" style={{ height: size * 4 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="eq-bar" style={{ animationDelay: `${i * 0.12}s`, width: size / 2 }} />
      ))}
    </div>
  );
}

function CoverArt({ seed, size = 100, rounded = 14 }) {
  const { h1, h2, h3 } = coverPalette(seed || "songora");
  const h = hashStr(seed || "songora");
  const shapes = h % 3;
  return (
    <div
      style={{
        width: size, height: size, borderRadius: rounded,
        background: `linear-gradient(135deg, hsl(${h1} 55% 30%), hsl(${h2} 60% 38%))`,
        position: "relative", overflow: "hidden", flexShrink: 0,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: "absolute", inset: 0 }}>
        {shapes === 0 && (
          <>
            <circle cx="70" cy="30" r="34" fill={`hsl(${h3} 70% 55%)`} opacity="0.35" />
            <circle cx="25" cy="80" r="22" fill={`hsl(${h1} 70% 65%)`} opacity="0.3" />
          </>
        )}
        {shapes === 1 && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1="0" y1={20 * i} x2="100" y2={20 * i + 10} stroke={`hsl(${h3} 60% 60%)`} strokeWidth="2" opacity="0.25" />
            ))}
          </>
        )}
        {shapes === 2 && (
          <>
            <rect x="10" y="10" width="35" height="35" fill={`hsl(${h3} 60% 55%)`} opacity="0.3" transform="rotate(20 27 27)" />
            <rect x="55" y="55" width="45" height="45" fill={`hsl(${h1} 70% 60%)`} opacity="0.25" transform="rotate(-15 77 77)" />
          </>
        )}
      </svg>
    </div>
  );
}

function Player({ version, compact }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (playing) {
      ref.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= version.duration) {
            setPlaying(false);
            return 0;
          }
          return e + 2;
        });
      }, 260);
    }
    return () => clearInterval(ref.current);
  }, [playing, version.duration]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const frac = elapsed / version.duration;

  return (
    <div className="panel" style={{ padding: compact ? 12 : 16 }}>
      <div className="flex items-center gap-3">
        <button className="play-btn" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause size={compact ? 16 : 18} /> : <Play size={compact ? 16 : 18} style={{ marginLeft: 2 }} />}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="label-mono">{version.label}</span>
            <span className="label-mono muted">{fmt(elapsed)} / {fmt(version.duration)}</span>
          </div>
          <div className="flex items-end gap-[2px]" style={{ height: compact ? 24 : 32 }}>
            {version.wave.map((h, i) => (
              <div
                key={i}
                className="wave-bar"
                style={{
                  height: `${h * 100}%`,
                  background: i / version.wave.length <= frac ? "var(--amber)" : "rgba(244,240,232,0.18)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {!compact && (
        <div className="flex gap-4 mt-2 label-mono muted">
          <span>{version.bpm} BPM</span>
          <span>{version.key}</span>
        </div>
      )}
    </div>
  );
}

function OptionCard({ active, onClick, title, desc, icon: Icon }) {
  return (
    <button className={`opt-card ${active ? "opt-card-active" : ""}`} onClick={onClick}>
      {Icon && <Icon size={18} className="opt-icon" />}
      <div>
        <div className="opt-title">{title}</div>
        {desc && <div className="opt-desc">{desc}</div>}
      </div>
      {active && <Check size={16} className="opt-check" />}
    </button>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button className={`chip ${active ? "chip-active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

/* --------------------------------- STEPS ----------------------------------- */

const STEPS = [
  { key: "genre", icon: Music2 },
  { key: "lang", icon: Globe2 },
  { key: "voice", icon: Mic },
  { key: "fx", icon: Users },
  { key: "idea", icon: Sparkles },
  { key: "lyrics", icon: Wand2 },
  { key: "title", icon: Disc3 },
  { key: "style", icon: Radio },
  { key: "music", icon: Music },
  { key: "cover", icon: ImageIcon },
  { key: "done", icon: Check },
];

function stepLabel(key, t) {
  return {
    genre: t.genre,
    lang: t.langEpoch,
    voice: t.voiceMood,
    fx: t.liveChoir,
    idea: t.songIdea,
    lyrics: t.lyrics,
    title: t.songName,
    style: t.stylePrompt,
    music: t.music,
    cover: t.cover,
    done: t.done,
  }[key] || key;
}

function StepRail({ step, form, t, device }) {
  return (
    <div className="rail">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const state = i < step ? "done" : i === step ? "active" : "todo";
        return (
          <div key={s.key} className={`rail-item rail-${state}`}>
            <div className="rail-num">{state === "done" ? <Check size={12} /> : i + 1}</div>
            <span className={`rail-label ${device === "mobile" ? "rail-label-mobile" : ""}`}>{stepLabel(s.key, t)}</span>
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- APP -------------------------------------- */

const emptyForm = {
  genre: null, language: null, decades: [], vocalType: null, vocalAge: null,
  mood: null, live: "off", choir: "off", idea: "",
  lyrics: "", titleOptions: [], title: "", stylePrompt: "",
  versions: [], chosenVersion: null,
  coverOption: null, covers: [], chosenCoverIdx: null, uploadedImg: null,
};

export default function SongoraApp() {
  const [view, setView] = useState("landing");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [credits, setCredits] = useState(128);
  const [generating, setGenerating] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoState, setVideoState] = useState("idle"); // idle, rendering, ready
  const [videoFormat, setVideoFormat] = useState("16:9");
  const [videoFx, setVideoFx] = useState("Ken-Burns");
  const [siteLang, setSiteLang] = useState(() => localStorage.getItem("songora-site-lang") || "de");
  const t = UI[siteLang];
  const device = useDeviceClass();
  useEffect(() => {
    localStorage.setItem("songora-site-lang", siteLang);
    document.documentElement.lang = siteLang;
  }, [siteLang]);

  const set = (patch) => setForm((f) => ({ ...f, ...patch }));

  const startWizard = () => {
    setForm(emptyForm);
    setStep(0);
    setVideoOpen(false);
    setVideoState("idle");
    setView("wizard");
  };

  const canContinue = () => {
    const key = STEPS[step].key;
    if (key === "genre") return !!form.genre;
    if (key === "lang") return !!form.language && form.decades.length > 0;
    if (key === "voice") return !!form.vocalType && (form.vocalType === "child" || !!form.vocalAge) && !!form.mood;
    if (key === "idea") return form.idea.trim().length > 3;
    if (key === "title") return !!form.title;
    if (key === "cover") return form.coverOption === "none" || form.coverOption === "existing" ||
      (form.coverOption === "ai" && form.chosenCoverIdx !== null) ||
      (form.coverOption === "upload" && !!form.uploadedImg);
    return true;
  };

  const next = () => {
    const key = STEPS[step].key;

    if (key === "idea") {
      setGenerating(true);
      setTimeout(() => {
        set({ lyrics: generateLyrics(form) });
        setGenerating(false);
        setStep((s) => s + 1);
      }, 1600);
      return;
    }
    if (key === "lyrics" && form.titleOptions.length === 0) {
      set({ titleOptions: generateTitles(form) });
    }
    if (key === "title" && !form.stylePrompt) {
      set({ stylePrompt: generateStylePrompt({ ...form }) });
    }
    if (key === "style") {
      setGenerating(true);
      setTimeout(() => {
        setCredits((c) => c - 10);
        set({ versions: generateVersions(form) });
        setGenerating(false);
        setStep((s) => s + 1);
      }, 2000);
      return;
    }
    if (key === "music" && form.chosenVersion === null) {
      set({ chosenVersion: 0 });
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const chooseCoverOption = (opt) => {
    set({ coverOption: opt });
    if (opt === "ai") {
      setGenerating(true);
      setTimeout(() => {
        setCredits((c) => c - 4);
        const covers = Array.from({ length: 4 }, (_, i) => `${form.title}-cover-${i}`);
        set({ covers, chosenCoverIdx: null });
        setGenerating(false);
      }, 1400);
    }
  };

  const onUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set({ uploadedImg: ev.target.result });
    reader.readAsDataURL(file);
  };

  const renderVideo = () => {
    setVideoState("rendering");
    setCredits((c) => c - 8);
    setTimeout(() => setVideoState("ready"), 2200);
  };

  /* ----------------------------- LANDING VIEW ------------------------------ */

  if (view === "landing") {
    return (
      <div className={`songora-root device-${device}`}>
        <GlobalStyle />
        <div className="landing">
          <div className="landing-glow" />
          <div className="landing-top">
            <div className="brand"><Disc3 size={20} /> songora<span className="brand-dot">.ai</span></div>
            <LangSwitch siteLang={siteLang} setSiteLang={setSiteLang} />
          </div>
          <div className="landing-body">
            <div className="landing-hero">
              <div className="eyebrow">{t.ideaLyricsMusic}</div>
              <h1>{t.landingTitleA}<br /><em>{t.landingTitleB}</em> {t.landingTitleC}</h1>
              <p>{t.landingText}</p>
              <button className="btn-primary btn-lg" onClick={() => setView("dashboard")}>
                {t.demoStart} <ArrowRight size={16} />
              </button>
              <div className="landing-stats">
                <div><span className="stat-num">4,2 Min</span><span className="stat-label">{t.prodTime}</span></div>
                <div><span className="stat-num">5</span><span className="stat-label">{t.genres}</span></div>
                <div><span className="stat-num">3–5 €</span><span className="stat-label">{t.perSong}</span></div>
              </div>
            </div>
            <div className="landing-visual">
              <div className="vinyl">
                <div className="vinyl-grooves" />
                <div className="vinyl-label"><Disc3 size={26} /></div>
                <div className="vinyl-arm" />
              </div>
              <div className="landing-bars">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div key={i} className="eq-bar landing-bar" style={{ animationDelay: `${(i % 8) * 0.11}s`, width: 4 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------- DASHBOARD VIEW ----------------------------- */

  if (view === "dashboard") {
    return (
      <div className={`songora-root device-${device}`}>
        <GlobalStyle />
        <Header credits={credits} onLogo={() => setView("dashboard")} siteLang={siteLang} setSiteLang={setSiteLang} />
        <div className="page">
          <h2 className="page-title">{t.welcome}</h2>
          <p className="muted mb-6">{t.dashboardText}</p>

          <button className="new-song-card" onClick={startWizard}>
            <div className="new-song-icon"><Sparkles size={22} /></div>
            <div>
              <div className="opt-title">{t.newSong}</div>
              <div className="opt-desc">{t.newSongDesc}</div>
            </div>
            <ChevronRight size={18} style={{ marginLeft: "auto" }} />
          </button>

          <h3 className="section-title">{t.projects}</h3>
          <div className="grid-2">
            {[
              { title: "Regen über Istanbul", genre: "Arabesk", mood: "Melancholisch" },
              { title: "Sommerlicht", genre: "Pop", mood: "Fröhlich" },
            ].map((p, i) => (
              <div key={i} className="project-card">
                <CoverArt seed={p.title} size={56} rounded={10} />
                <div>
                  <div className="opt-title">{p.title}</div>
                  <div className="opt-desc">{p.genre} · {p.mood}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ WIZARD VIEW ------------------------------ */

  const key = STEPS[step].key;

  return (
    <div className={`songora-root device-${device}`}>
      <GlobalStyle />
      <Header credits={credits} onLogo={() => setView("dashboard")} siteLang={siteLang} setSiteLang={setSiteLang} />
      <div className="wizard">
        <StepRail step={step} form={form} t={t} device={device} />
        <div className="wizard-main">
          <div className="panel wizard-panel">
            {generating ? (
              <GeneratingState step={key} t={t} />
            ) : (
              <div className="step-enter" key={key}>
              <StepContent
                stepKey={key}
                form={form}
                set={set}
                onUpload={onUpload}
                chooseCoverOption={chooseCoverOption}
                videoOpen={videoOpen}
                setVideoOpen={setVideoOpen}
                videoState={videoState}
                renderVideo={renderVideo}
                videoFormat={videoFormat}
                setVideoFormat={setVideoFormat}
                videoFx={videoFx}
                setVideoFx={setVideoFx}
                restart={startWizard}
                goDashboard={() => setView("dashboard")}
                t={t}
              />
              </div>
            )}
          </div>

          {key !== "done" && !generating && (
            <div className="wizard-nav">
              <button className="btn-ghost" onClick={back} disabled={step === 0}>
                <ChevronLeft size={16} /> {t.back}
              </button>
              <button className="btn-primary" onClick={next} disabled={!canContinue()}>
                {t.next} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SUBCOMPONENTS -------------------------------- */

function Header({ credits, onLogo, siteLang, setSiteLang }) {
  return (
    <div className="header">
      <div className="brand" onClick={onLogo} style={{ cursor: "pointer" }}>
        <Disc3 size={18} /> songora<span className="brand-dot">.ai</span>
      </div>
      <div className="header-right">
        <LangSwitch siteLang={siteLang} setSiteLang={setSiteLang} />
        <div className="credits-pill"><Zap size={13} /> <span className="label-mono">{credits}</span></div>
        <div className="avatar">S</div>
      </div>
    </div>
  );
}

function GeneratingState({ step, t }) {
  const messages = {
    idea: t.generatingLyrics,
    style: t.generatingMusic,
  };
  return (
    <div className="generating">
      <Eq size={10} />
      <p className="mt-4">{messages[step] || t.generatingGeneric}</p>
    </div>
  );
}

function StepContent(props) {
  const { stepKey, form, set, t } = props;

  if (stepKey === "genre") {
    return (
      <StepShell title={t.genre} desc={t.genreDesc}>
        <div className="grid-2">
          {GENRES.map((g) => (
            <OptionCard key={g.id} title={g.label} desc={g.desc} active={form.genre === g.id}
              onClick={() => set({ genre: g.id })} icon={Music2} />
          ))}
        </div>
      </StepShell>
    );
  }

  if (stepKey === "lang") {
    return (
      <StepShell title={t.langEpoch} desc={t.langEpochDesc}>
        <div className="mb-5">
          <div className="field-label">{t.language}</div>
          <div className="chip-row">
            {LANGUAGES.map((l) => (
              <Chip key={l} active={form.language === l} onClick={() => set({ language: l })}>{l}</Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="field-label">{t.eraMulti}</div>
          <div className="chip-row">
            {DECADES.map((d) => (
              <Chip key={d} active={form.decades.includes(d)}
                onClick={() => set({ decades: form.decades.includes(d) ? form.decades.filter((x) => x !== d) : [...form.decades, d] })}>
                {d}
              </Chip>
            ))}
          </div>
        </div>
      </StepShell>
    );
  }

  if (stepKey === "voice") {
    return (
      <StepShell title={t.voiceMood} desc={t.voiceMoodDesc}>
        <div className="mb-5">
          <div className="field-label">{t.voice}</div>
          <div className="grid-3">
            {VOCAL_TYPES.map((v) => (
              <OptionCard key={v.id} title={v.label} active={form.vocalType === v.id}
                onClick={() => set({ vocalType: v.id, vocalAge: v.id === "child" ? "kind" : form.vocalAge })} icon={v.icon} />
            ))}
          </div>
        </div>
        {form.vocalType && form.vocalType !== "child" && (
          <div className="mb-5">
            <div className="field-label">{t.vocalAge}</div>
            <div className="chip-row">
              {VOCAL_AGES.map((a) => (
                <Chip key={a.id} active={form.vocalAge === a.id} onClick={() => set({ vocalAge: a.id })}>{a.label}</Chip>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="field-label">{t.mood}</div>
          <div className="chip-row">
            {MOODS.map((m) => (
              <Chip key={m} active={form.mood === m} onClick={() => set({ mood: m })}>{m}</Chip>
            ))}
          </div>
        </div>
      </StepShell>
    );
  }

  if (stepKey === "fx") {
    return (
      <StepShell title={t.liveChoir} desc={t.liveChoirDesc}>
        <div className="mb-5">
          <div className="field-label">{t.liveFx}</div>
          <div className="chip-row">
            {LEVELS.map((l) => (
              <Chip key={l.id} active={form.live === l.id} onClick={() => set({ live: l.id })}>{l.label}</Chip>
            ))}
          </div>
        </div>
        <div>
          <div className="field-label">{t.choir}</div>
          <div className="chip-row">
            {LEVELS.map((l) => (
              <Chip key={l.id} active={form.choir === l.id} onClick={() => set({ choir: l.id })}>{l.label}</Chip>
            ))}
          </div>
        </div>
      </StepShell>
    );
  }

  if (stepKey === "idea") {
    return (
      <StepShell title={t.songIdea} desc={t.songIdeaDesc}>
        <textarea
          className="textarea"
          rows={5}
          placeholder="z. B. verlorene Liebe, Istanbul, Regen, nach 20 Jahren denke ich noch an sie"
          value={form.idea}
          onChange={(e) => set({ idea: e.target.value })}
        />
      </StepShell>
    );
  }

  if (stepKey === "lyrics") {
    return (
      <StepShell title={t.lyrics} desc={t.lyricsDesc}>
        <textarea className="textarea mono" rows={14} value={form.lyrics} onChange={(e) => set({ lyrics: e.target.value })} />
        <div className="chip-row mt-3">
          <Chip onClick={() => set({ lyrics: generateLyrics(form) })}>{t.regenerate}</Chip>
          <Chip onClick={() => set({ lyrics: form.lyrics + "\n\n(emotionaler überarbeitet)" })}>{t.moreEmotional}</Chip>
        </div>
      </StepShell>
    );
  }

  if (stepKey === "title") {
    return (
      <StepShell title={t.songName} desc={t.songNameDesc}>
        <div className="chip-row mb-4">
          {form.titleOptions.map((t) => (
            <Chip key={t} active={form.title === t} onClick={() => set({ title: t })}>{t}</Chip>
          ))}
        </div>
        <input className="text-input" placeholder={t.ownSongName} value={form.title}
          onChange={(e) => set({ title: e.target.value })} />
      </StepShell>
    );
  }

  if (stepKey === "style") {
    return (
      <StepShell title={t.stylePrompt} desc={t.stylePromptDesc}>
        <textarea className="textarea mono" rows={7} value={form.stylePrompt} onChange={(e) => set({ stylePrompt: e.target.value })} />
        <div className="chip-row mt-3">
          <Chip onClick={() => set({ stylePrompt: generateStylePrompt(form) })}>{t.recreate}</Chip>
        </div>
      </StepShell>
    );
  }

  if (stepKey === "music") {
    return (
      <StepShell title={t.music} desc={t.musicDesc}>
        <div className="flex flex-col gap-3">
          {form.versions.map((v, i) => (
            <div key={v.id} className={`version-wrap ${form.chosenVersion === i ? "version-active" : ""}`} onClick={() => set({ chosenVersion: i })}>
              <Player version={v} />
            </div>
          ))}
        </div>
      </StepShell>
    );
  }

  if (stepKey === "cover") {
    return (
      <StepShell title={t.cover} desc={t.coverDesc}>
        <div className="grid-2 mb-4">
          <OptionCard title={t.aiCover} desc={t.aiCoverDesc} icon={Sparkles}
            active={form.coverOption === "ai"} onClick={() => props.chooseCoverOption("ai")} />
          <OptionCard title={t.uploadPhoto} desc={t.uploadPhotoDesc} icon={Upload}
            active={form.coverOption === "upload"} onClick={() => props.chooseCoverOption("upload")} />
          <OptionCard title={t.existingImage} desc={t.existingImageDesc} icon={ImageIcon}
            active={form.coverOption === "existing"} onClick={() => props.chooseCoverOption("existing")} />
          <OptionCard title={t.noCover} desc={t.noCoverDesc} icon={X}
            active={form.coverOption === "none"} onClick={() => props.chooseCoverOption("none")} />
        </div>

        {form.coverOption === "ai" && form.covers.length > 0 && (
          <div className="grid-4">
            {form.covers.map((c, i) => (
              <div key={c} className={`cover-pick ${form.chosenCoverIdx === i ? "cover-pick-active" : ""}`} onClick={() => set({ chosenCoverIdx: i })}>
                <CoverArt seed={c} size={100} />
              </div>
            ))}
          </div>
        )}

        {form.coverOption === "upload" && (
          <label className="upload-zone">
            <input type="file" accept="image/*" onChange={props.onUpload} style={{ display: "none" }} />
            {form.uploadedImg ? (
              <img src={form.uploadedImg} alt="Upload" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 12 }} />
            ) : (
              <>
                <Upload size={22} />
                <span>{t.chooseImage}</span>
              </>
            )}
          </label>
        )}

        {form.coverOption === "existing" && (
          <div className="grid-4">
            {["Regen über Istanbul", "Sommerlicht"].map((s) => (
              <div key={s} className="cover-pick cover-pick-active"><CoverArt seed={s} size={100} /></div>
            ))}
          </div>
        )}
      </StepShell>
    );
  }

  if (stepKey === "done") {
    const cover = form.coverOption === "ai" && form.chosenCoverIdx !== null ? form.covers[form.chosenCoverIdx]
      : form.coverOption === "existing" ? "Regen über Istanbul" : null;
    return (
      <StepShell title={t.done} desc={t.doneDesc}>
        <div className="done-card">
          {form.coverOption === "upload" && form.uploadedImg ? (
            <img src={form.uploadedImg} alt="" style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 12 }} />
          ) : cover ? <CoverArt seed={cover} size={72} rounded={12} />
            : <div className="cover-empty"><Music2 size={22} /></div>}
          <div>
            <div className="done-title">{form.title}</div>
            <div className="opt-desc">{GENRES.find((g) => g.id === form.genre)?.label} · {form.mood} · {form.language}</div>
          </div>
        </div>

        {form.chosenVersion !== null && <Player version={form.versions[form.chosenVersion]} compact />}

        {!props.videoOpen ? (
          <button className="btn-primary mt-4" onClick={() => props.setVideoOpen(true)}>
            <Video size={16} /> {t.createVideo}
          </button>
        ) : (
          <div className="video-panel">
            <div className="field-label">{t.format}</div>
            <div className="chip-row mb-3">
              <Chip active={props.videoFormat === "16:9"} onClick={() => props.setVideoFormat("16:9")}>16:9 · YouTube</Chip>
              <Chip active={props.videoFormat === "9:16"} onClick={() => props.setVideoFormat("9:16")}>9:16 · Shorts/TikTok</Chip>
            </div>
            <div className="field-label">{t.effect}</div>
            <div className="chip-row mb-4">
              {VIDEO_EFFECTS.map((fx) => (
                <Chip key={fx} active={props.videoFx === fx} onClick={() => props.setVideoFx(fx)}>{fx}</Chip>
              ))}
            </div>

            {props.videoState === "idle" && (
              <button className="btn-primary" onClick={props.renderVideo}><Video size={16} /> {t.render}</button>
            )}
            {props.videoState === "rendering" && (
              <div className="generating small"><Eq size={7} /><p className="mt-2">{t.rendering}</p></div>
            )}
            {props.videoState === "ready" && (
              <div className="ready-box">
                <Check size={16} /> {t.videoReady} — {props.videoFormat} · {props.videoFx}
                <button className="btn-ghost ml-auto" disabled title="Demo – kein echter Export"><Download size={14} /> {t.export}</button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button className="btn-ghost" onClick={props.restart}><RotateCcw size={14} /> {t.restart}</button>
          <button className="btn-ghost" onClick={props.goDashboard}>{t.dashboard}</button>
        </div>
      </StepShell>
    );
  }

  return null;
}

function StepShell({ title, desc, children }) {
  return (
    <div>
      <h2 className="step-title">{title}</h2>
      {desc && <p className="muted mb-5">{desc}</p>}
      {children}
    </div>
  );
}

/* --------------------------------- STYLE ------------------------------------ */

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

      .songora-root {
        --ink: #14181A;
        --ink-2: #1D2326;
        --ink-3: #262D30;
        --paper: #ECEFE8;
        --paper-dim: #B9C0B7;
        --amber: #E3A542;
        --rose: #C4534A;
        --teal: #4E8C82;
        font-family: 'Inter', sans-serif;
        background:
          radial-gradient(ellipse 900px 500px at 15% -10%, rgba(227,165,66,0.14), transparent 60%),
          radial-gradient(ellipse 700px 500px at 100% 10%, rgba(196,83,74,0.12), transparent 55%),
          var(--ink);
        color: var(--paper);
        min-height: 600px;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .songora-root::before {
        content: "";
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        opacity: 0.05; mix-blend-mode: overlay;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }
      .songora-root > * { position: relative; z-index: 1; }
      .songora-root * { box-sizing: border-box; }
      .mb-1{margin-bottom:4px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}.mb-5{margin-bottom:20px}.mb-6{margin-bottom:24px}
      .mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}.mt-6{margin-top:24px}
      .ml-auto{margin-left:auto}
      .flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1}.items-center{align-items:center}
      .items-end{align-items:flex-end}.justify-between{justify-content:space-between}.gap-1{gap:4px}.gap-3{gap:12px}.gap-4{gap:16px}

      .muted { color: var(--paper-dim); font-size: 14px; line-height: 1.5; }
      .label-mono { font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.02em; }

      .brand { display:flex; align-items:center; gap:8px; font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:var(--paper); }
      .brand-dot { color: var(--amber); }

      .header { display:flex; align-items:center; justify-content:space-between; padding:16px 24px; border-bottom:1px solid var(--ink-3); backdrop-filter:blur(6px); }
      .header-right { display:flex; align-items:center; gap:12px; }
      .lang-switch { display:flex; gap:4px; padding:3px; border:1px solid var(--ink-3); background:var(--ink-2); border-radius:999px; }
      .lang-btn { border:0; background:transparent; color:var(--paper-dim); font-size:11px; font-weight:700; padding:5px 8px; border-radius:999px; cursor:pointer; }
      .lang-btn:hover { color:var(--paper); }
      .lang-btn-active { background:var(--amber); color:var(--ink); }
      .credits-pill { display:flex; align-items:center; gap:6px; background:var(--ink-2); padding:6px 12px; border-radius:20px; color:var(--amber); border:1px solid var(--ink-3); box-shadow:inset 0 1px 0 rgba(255,255,255,0.03); }
      .avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg, var(--rose), #a8443c); display:flex; align-items:center; justify-content:center; font-weight:600; font-size:13px; box-shadow:0 4px 12px -4px rgba(196,83,74,0.6); }

      .landing { position:relative; padding:24px; min-height:600px; display:flex; flex-direction:column; }
      .landing-glow { position:absolute; top:-120px; right:-80px; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle, rgba(227,165,66,0.16), transparent 70%); pointer-events:none; }
      .landing-top { display:flex; justify-content:space-between; align-items:center; gap:12px; }
      .landing-body { flex:1; display:flex; align-items:center; gap:32px; padding:20px 12px 40px; flex-wrap:wrap; }
      .landing-hero { flex:1; min-width:320px; display:flex; flex-direction:column; justify-content:center; max-width:520px; }
      .eyebrow { font-family:'IBM Plex Mono',monospace; font-size:12px; color:var(--amber); letter-spacing:0.04em; margin-bottom:18px; }
      .eyebrow .dot { color:var(--paper-dim); }
      .landing-hero h1 { font-family:'Fraunces',serif; font-weight:600; font-size:46px; line-height:1.06; margin:0 0 20px; letter-spacing:-0.01em; }
      .landing-hero h1 em { font-style:italic; color:var(--amber); font-weight:400; }
      .landing-hero p { color:var(--paper-dim); font-size:16px; line-height:1.6; margin-bottom:28px; max-width:440px; }
      .landing-stats { display:flex; gap:28px; margin-top:36px; }
      .landing-stats > div { display:flex; flex-direction:column; gap:2px; }
      .stat-num { font-family:'Fraunces',serif; font-size:20px; font-weight:600; color:var(--paper); }
      .stat-label { font-size:11px; color:var(--paper-dim); text-transform:uppercase; letter-spacing:0.04em; }

      .landing-visual { display:flex; flex-direction:column; align-items:center; gap:24px; min-width:220px; }
      .vinyl { position:relative; width:200px; height:200px; border-radius:50%;
        background: repeating-radial-gradient(circle, #0d1012 0px, #0d1012 2px, #1a2023 3px, #1a2023 5px);
        box-shadow: 0 0 0 1px var(--ink-3), 0 20px 50px -10px rgba(0,0,0,0.6), 0 0 60px -10px rgba(227,165,66,0.25);
        animation: spin 9s linear infinite;
        display:flex; align-items:center; justify-content:center;
      }
      .vinyl-label { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, var(--amber), var(--rose)); display:flex; align-items:center; justify-content:center; color:var(--ink); box-shadow: inset 0 0 0 2px rgba(0,0,0,0.2); }
      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .landing-bars { display:flex; align-items:flex-end; gap:4px; height:44px; opacity:0.85; }
      .landing-bar { background:linear-gradient(180deg, var(--amber), var(--rose)); border-radius:2px; }

      .eq-bar { background:var(--amber); border-radius:2px; animation: eq 1s ease-in-out infinite; height:100%; }
      @keyframes eq { 0%,100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

      .btn-primary { font-family:'Inter',sans-serif; display:flex; align-items:center; gap:8px; justify-content:center; background:linear-gradient(135deg, var(--amber), #d18d2e); color:var(--ink); border:none; padding:11px 20px; border-radius:10px; font-weight:600; font-size:14px; cursor:pointer; transition:transform 0.15s, box-shadow 0.15s; box-shadow: 0 6px 20px -6px rgba(227,165,66,0.5); }
      .btn-primary:hover:not(:disabled) { transform:translateY(-1px); box-shadow: 0 10px 26px -6px rgba(227,165,66,0.6); }
      .btn-primary:active:not(:disabled) { transform:translateY(0); }
      .btn-primary:disabled { opacity:0.35; cursor:not-allowed; box-shadow:none; }
      .btn-lg { padding:14px 26px; font-size:15px; width:fit-content; }
      .btn-ghost { display:flex; align-items:center; gap:6px; background:transparent; color:var(--paper); border:1px solid var(--ink-3); padding:10px 16px; border-radius:10px; font-size:14px; cursor:pointer; transition:border-color 0.15s, background 0.15s; }
      .btn-ghost:hover:not(:disabled) { border-color:var(--paper-dim); background:var(--ink-2); }
      .btn-ghost:disabled { opacity:0.35; cursor:not-allowed; }

      .page { padding:28px 32px; overflow-y:auto; }
      .page-title { font-family:'Fraunces',serif; font-size:26px; font-weight:600; margin:0 0 6px; }
      .section-title { font-family:'Fraunces',serif; font-size:18px; font-weight:600; margin:28px 0 14px; }

      .new-song-card { display:flex; align-items:center; gap:14px; background:var(--ink-2); border:1px solid var(--ink-3); padding:18px 20px; border-radius:14px; cursor:pointer; width:100%; text-align:left; color:var(--paper); transition:border-color 0.15s, transform 0.15s, box-shadow 0.15s; }
      .new-song-card:hover { border-color: var(--amber); transform:translateY(-2px); box-shadow:0 14px 30px -12px rgba(0,0,0,0.5); }
      .new-song-icon { width:40px; height:40px; border-radius:10px; background:linear-gradient(135deg, var(--amber), var(--rose)); color:var(--ink); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 6px 16px -4px rgba(227,165,66,0.5); }

      .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
      .grid-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
      .grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
      .project-card { display:flex; align-items:center; gap:12px; background:var(--ink-2); border:1px solid var(--ink-3); padding:14px; border-radius:12px; transition:transform 0.15s, border-color 0.15s; }
      .project-card:hover { transform:translateY(-2px); border-color:var(--ink-3); box-shadow:0 12px 26px -12px rgba(0,0,0,0.5); }

      .wizard { display:flex; flex:1; overflow:hidden; }
      .rail { width:210px; padding:24px 12px; border-right:1px solid var(--ink-3); display:flex; flex-direction:column; gap:2px; overflow-y:auto; position:relative; }
      .rail-item { display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; position:relative; transition:background 0.15s; }
      .rail-num { width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-family:'IBM Plex Mono',monospace; flex-shrink:0; border:1px solid var(--ink-3); color:var(--paper-dim); transition:all 0.2s; z-index:1; background:var(--ink); }
      .rail-label { font-size:13px; color:var(--paper-dim); transition:color 0.2s; }
      .rail-item:not(:last-child)::before { content:""; position:absolute; left:20px; top:28px; width:1px; height:20px; background:var(--ink-3); }
      .rail-active { background:rgba(227,165,66,0.08); }
      .rail-active .rail-num { background:var(--amber); color:var(--ink); border-color:var(--amber); box-shadow:0 0 0 4px rgba(227,165,66,0.15); }
      .rail-active .rail-label { color:var(--paper); font-weight:600; }
      .rail-done .rail-num { background:var(--teal); border-color:var(--teal); color:var(--ink); }
      .rail-done .rail-label { color:var(--paper-dim); }

      .wizard-main { flex:1; padding:24px 32px; display:flex; flex-direction:column; overflow-y:auto; }
      .panel { background:var(--ink-2); border:1px solid var(--ink-3); border-radius:14px; }
      .wizard-panel { padding:26px; flex:1; box-shadow:0 20px 50px -30px rgba(0,0,0,0.6); }
      .step-title { font-family:'Fraunces',serif; font-size:22px; font-weight:600; margin:0 0 6px; }
      .step-enter { animation: stepIn 0.35s ease both; }
      @keyframes stepIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      .field-label { font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--paper-dim); margin-bottom:8px; }

      .wizard-nav { display:flex; justify-content:space-between; margin-top:20px; }

      .opt-card { display:flex; align-items:center; gap:12px; text-align:left; background:var(--ink-3); border:1px solid transparent; padding:14px; border-radius:12px; cursor:pointer; color:var(--paper); transition:transform 0.15s, border-color 0.15s, background 0.15s; }
      .opt-card:hover { transform:translateY(-1px); background:#2b3336; }
      .opt-card-active { border-color:var(--amber); background:rgba(227,165,66,0.1); box-shadow:0 8px 22px -12px rgba(227,165,66,0.35); }
      .opt-icon { color:var(--amber); flex-shrink:0; }
      .opt-title { font-weight:600; font-size:14px; }
      .opt-desc { font-size:12px; color:var(--paper-dim); margin-top:2px; }
      .opt-check { margin-left:auto; color:var(--amber); flex-shrink:0; }

      .chip-row { display:flex; flex-wrap:wrap; gap:8px; }
      .chip { background:var(--ink-3); border:1px solid transparent; color:var(--paper); padding:8px 14px; border-radius:20px; font-size:13px; cursor:pointer; transition:transform 0.12s, background 0.15s; }
      .chip:hover { background:#2b3336; }
      .chip-active { background:var(--amber); color:var(--ink); font-weight:600; box-shadow:0 6px 16px -6px rgba(227,165,66,0.5); }
      .chip-active:hover { background:var(--amber); }

      .textarea, .text-input { width:100%; background:var(--ink-3); border:1px solid var(--ink-3); color:var(--paper); border-radius:10px; padding:14px; font-size:14px; font-family:'Inter',sans-serif; resize:vertical; transition:border-color 0.15s; }
      .textarea:focus, .text-input:focus { outline:none; border-color:var(--amber); box-shadow:0 0 0 3px rgba(227,165,66,0.12); }
      .mono { font-family:'IBM Plex Mono',monospace; font-size:13px; line-height:1.6; white-space:pre-wrap; }

      .play-btn { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, var(--amber), #d18d2e); color:var(--ink); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; box-shadow:0 6px 16px -6px rgba(227,165,66,0.55); transition:transform 0.12s; }
      .play-btn:hover { transform:scale(1.06); }
      .wave-bar { flex:1; min-width:2px; border-radius:1px; transition:background 0.2s; }

      .version-wrap { border-radius:14px; cursor:pointer; border:2px solid transparent; transition:border-color 0.15s, transform 0.15s; }
      .version-wrap:hover { transform:translateY(-1px); }
      .version-active { border-color: var(--amber); box-shadow:0 10px 26px -14px rgba(227,165,66,0.45); }

      .cover-pick { border-radius:14px; cursor:pointer; border:2px solid transparent; padding:2px; transition:border-color 0.15s, transform 0.15s; }
      .cover-pick:hover { transform:translateY(-2px); }
      .cover-pick-active { border-color:var(--amber); box-shadow:0 10px 24px -14px rgba(227,165,66,0.5); }
      .cover-empty { width:72px; height:72px; border-radius:12px; background:var(--ink-3); display:flex; align-items:center; justify-content:center; color:var(--paper-dim); }

      .upload-zone { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; border:1.5px dashed var(--ink-3); border-radius:12px; padding:28px; cursor:pointer; color:var(--paper-dim); font-size:13px; width:fit-content; transition:border-color 0.15s, background 0.15s; }
      .upload-zone:hover { border-color:var(--amber); background:rgba(227,165,66,0.05); }

      .generating { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; min-height:280px; color:var(--paper-dim); }
      .generating.small { min-height:auto; padding:20px 0; }

      .done-card { display:flex; align-items:center; gap:16px; margin-bottom:20px; padding:14px; background:linear-gradient(135deg, rgba(227,165,66,0.08), rgba(196,83,74,0.05)); border:1px solid var(--ink-3); border-radius:14px; }
      .done-title { font-family:'Fraunces',serif; font-size:20px; font-weight:600; }

      .video-panel { background:var(--ink-3); border-radius:12px; padding:18px; margin-top:14px; animation: stepIn 0.3s ease both; }
      .ready-box { display:flex; align-items:center; gap:8px; background:rgba(78,140,130,0.15); border:1px solid var(--teal); color:var(--paper); padding:12px 14px; border-radius:10px; font-size:13px; box-shadow:0 8px 20px -12px rgba(78,140,130,0.5); }


      /* ---------------------- DEVICE-AWARE RESPONSIVE LAYOUT ---------------------- */
      .songora-root {
        width: 100%;
        max-width: 100%;
      }

      .device-desktop .wizard {
        min-height: calc(100vh - 64px);
      }

      .device-tablet .wizard,
      .device-mobile .wizard {
        flex-direction: column;
        overflow: visible;
      }

      .device-tablet .rail,
      .device-mobile .rail {
        width: 100%;
        max-width: 100%;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
        border-right: 0;
        border-bottom: 1px solid var(--ink-3);
        padding: 10px 12px;
        gap: 8px;
        position: sticky;
        top: 0;
        z-index: 30;
        background: rgba(20,24,26,0.97);
        backdrop-filter: blur(12px);
      }

      .device-tablet .rail-item,
      .device-mobile .rail-item {
        flex: 0 0 auto;
        min-width: max-content;
      }

      .device-tablet .rail-item:not(:last-child)::before,
      .device-mobile .rail-item:not(:last-child)::before {
        display: none;
      }

      .device-tablet .wizard-main,
      .device-mobile .wizard-main {
        width: 100%;
        max-width: 100%;
        overflow: visible;
      }

      .device-tablet .wizard-panel,
      .device-mobile .wizard-panel {
        width: 100%;
        max-width: 100%;
      }

      .device-mobile .grid-2,
      .device-mobile .grid-3,
      .device-mobile .grid-4 {
        grid-template-columns: 1fr !important;
      }

      .device-tablet .grid-3,
      .device-tablet .grid-4 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .device-mobile .rail-label-mobile {
        display: none;
      }

      .device-mobile .opt-card,
      .device-mobile .new-song-card,
      .device-mobile .project-card,
      .device-mobile .textarea,
      .device-mobile .text-input {
        width: 100%;
        max-width: 100%;
      }

      .device-mobile .wizard-main {
        padding: 12px;
      }

      .device-mobile .wizard-panel {
        padding: 14px;
      }

      .device-mobile .wizard-nav {
        position: sticky;
        bottom: 0;
        z-index: 25;
        background: linear-gradient(to top, var(--ink) 78%, transparent);
        padding: 12px 0 4px;
        gap: 8px;
      }

      .device-mobile .wizard-nav .btn-ghost,
      .device-mobile .wizard-nav .btn-primary {
        flex: 1;
        min-width: 0;
      }

      .device-mobile .songora-root,
      .device-tablet .songora-root {
        overflow-x: hidden;
      }

      @media (max-width: 640px) {
        html, body, #root {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .songora-root {
          min-height: 100vh;
          border-radius: 0;
        }

        .landing {
          min-height: 100vh;
        }
      }


      /* --------------------------- RESPONSIVE / MOBILE --------------------------- */
      @media (max-width: 900px) {
        .songora-root {
          min-height: 100vh;
          border-radius: 0;
        }

        .landing {
          min-height: 100vh;
          padding: 18px;
        }

        .landing-body {
          flex-direction: column;
          align-items: stretch;
          padding: 24px 0 20px;
          gap: 36px;
        }

        .landing-hero {
          min-width: 0;
          max-width: none;
        }

        .landing-hero h1 {
          font-size: clamp(38px, 10vw, 52px);
        }

        .landing-visual {
          min-width: 0;
          width: 100%;
        }

        .header {
          padding: 14px 16px;
        }

        .page {
          padding: 22px 18px;
        }

        .wizard {
          flex-direction: column;
          overflow: visible;
        }

        .rail {
          width: 100%;
          border-right: 0;
          border-bottom: 1px solid var(--ink-3);
          padding: 10px 12px;
          flex-direction: row;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: thin;
          position: sticky;
          top: 0;
          background: rgba(20, 24, 26, 0.96);
          backdrop-filter: blur(10px);
          z-index: 20;
        }

        .rail-item {
          flex: 0 0 auto;
          padding: 8px 10px;
          min-width: max-content;
        }

        .rail-item:not(:last-child)::before {
          display: none;
        }

        .rail-label {
          font-size: 12px;
        }

        .wizard-main {
          padding: 18px;
          overflow: visible;
        }

        .wizard-panel {
          padding: 20px;
        }

        .grid-4 {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 640px) {
        .landing {
          padding: 16px;
        }

        .landing-top {
          padding-bottom: 6px;
        }

        .landing-body {
          justify-content: flex-start;
          gap: 28px;
        }

        .landing-hero h1 {
          font-size: clamp(36px, 12vw, 46px);
          line-height: 1.02;
          margin-bottom: 16px;
        }

        .landing-hero p {
          font-size: 15px;
          margin-bottom: 22px;
        }

        .landing-stats {
          gap: 14px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .landing-stats > div {
          min-width: calc(50% - 8px);
        }

        .vinyl {
          width: 160px;
          height: 160px;
        }

        .landing-bars {
          width: 100%;
          justify-content: center;
          overflow: hidden;
        }

        .header {
          padding: 12px 14px;
        }

        .header .lang-switch { display:none; }

        .brand {
          font-size: 17px;
        }

        .credits-pill {
          padding: 5px 9px;
        }

        .avatar {
          width: 28px;
          height: 28px;
        }

        .page {
          padding: 18px 14px;
        }

        .page-title {
          font-size: 24px;
        }

        .grid-2,
        .grid-3,
        .grid-4 {
          grid-template-columns: 1fr;
        }

        .new-song-card,
        .project-card,
        .opt-card {
          padding: 13px;
        }

        .rail {
          padding: 8px 10px;
        }

        .rail-item {
          padding: 7px 9px;
        }

        .rail-label {
          display: none;
        }

        .wizard-main {
          padding: 14px;
        }

        .wizard-panel {
          padding: 16px;
          border-radius: 12px;
        }

        .step-title {
          font-size: 21px;
        }

        .wizard-nav {
          gap: 10px;
          position: sticky;
          bottom: 0;
          padding: 12px 0 4px;
          background: linear-gradient(to top, var(--ink) 75%, transparent);
          z-index: 10;
        }

        .wizard-nav .btn-ghost,
        .wizard-nav .btn-primary {
          flex: 1;
          min-height: 44px;
        }

        .chip-row {
          gap: 7px;
        }

        .chip {
          padding: 8px 12px;
        }

        .textarea,
        .text-input {
          font-size: 16px;
          padding: 13px;
        }

        .done-card {
          align-items: flex-start;
        }

        .video-panel {
          padding: 14px;
        }

        .ready-box {
          flex-wrap: wrap;
        }

        .ready-box .ml-auto {
          margin-left: 0;
          width: 100%;
          justify-content: center;
        }

        .flex.gap-3.mt-6 {
          flex-direction: column;
        }

        .flex.gap-3.mt-6 .btn-ghost {
          width: 100%;
          justify-content: center;
        }
      }

      @media (max-width: 420px) {
        .landing-stats {
          flex-direction: column;
          gap: 10px;
        }

        .landing-stats > div {
          min-width: 100%;
        }

        .landing-hero h1 {
          font-size: 34px;
        }

        .btn-lg {
          width: 100%;
        }

        .header-right {
          gap: 8px;
        }

        .credits-pill .label-mono {
          font-size: 11px;
        }

        .wizard-main {
          padding: 10px;
        }

        .wizard-panel {
          padding: 14px;
        }

        .step-title {
          font-size: 20px;
        }

        .opt-card {
          min-height: 64px;
        }

        .chip {
          font-size: 12px;
        }
      }
    `}</style>
  );
}
