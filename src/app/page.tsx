"use client";
import { useState, useEffect, useCallback } from "react";
import { useMatchEngine } from "@/hooks/useMatchEngine";
import { KeyRound, Activity, Link as LinkIcon, RefreshCw, BarChart2, Zap, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_URL = "https://www.youtube.com/watch?v=7nBUXOOWgwU";

function extractYoutubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,
    /youtu\.be\/([^?&#]+)/,
    /\/embed\/([^?&#]+)/,
    /\/shorts\/([^?&#]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function toEmbedUrl(url: string): string {
  const id = extractYoutubeId(url);
  if (!id) return url;
  return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;
}

function toWatchUrl(url: string): string {
  const id = extractYoutubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

export default function PremiumDashboard() {
  const {
    apiKey, setApiKey,
    audioEnabled, setAudioEnabled,
    displayedInsight, isTyping, loading,
    matchData, syncWithYouTube, generateRealInsight,
  } = useMatchEngine();

  const [embedUrl, setEmbedUrl] = useState(() => toEmbedUrl(DEFAULT_URL));
  const [inputUrl, setInputUrl] = useState(DEFAULT_URL);

  // Live telemetry state
  const [p1WinProb, setP1WinProb] = useState(52);
  const [aggression, setAggression] = useState(85);
  const [score, setScore] = useState({ p1: 3, p2: 2 });

  // XP / Streak Prediction System
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalPredictions, setTotalPredictions] = useState(0);
  const [correctPredictions, setCorrectPredictions] = useState(0);
  const [lastEvent, setLastEvent] = useState<{ text: string; type: "win" | "loss" | "bonus" } | null>(null);
  const [predictionLog, setPredictionLog] = useState<string[]>([]);
  const [pendingPrediction, setPendingPrediction] = useState<1 | 2 | null>(null);

  // Run initial sync once on mount
  useEffect(() => {
    syncWithYouTube(DEFAULT_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Telemetry ticks — always running to keep dashboard alive
  useEffect(() => {
    const id = setInterval(() => {
      setAggression(v => parseFloat(Math.max(60, Math.min(100, v + (Math.random() - 0.48) * 6)).toFixed(1)));
      setP1WinProb(v => parseFloat(Math.max(20, Math.min(80, v + (Math.random() - 0.5) * 5)).toFixed(1)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  // Auto-insight every 30s
  const generateInsight = useCallback(() => {
    generateRealInsight("live");
  }, [generateRealInsight]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!loading) generateInsight();
    }, 30000);
    return () => clearInterval(id);
  }, [loading, generateInsight]);

  const handleSync = () => {
    const raw = inputUrl.trim() || DEFAULT_URL;
    setEmbedUrl(toEmbedUrl(raw));
    syncWithYouTube(toWatchUrl(raw));
  };

  const getRank = (xp: number) => {
    if (xp >= 2000) return { label: "🏆 Legend", color: "text-yellow-500" };
    if (xp >= 1000) return { label: "💎 Expert", color: "text-blue-400" };
    if (xp >= 500)  return { label: "🔥 Pro", color: "text-orange-400" };
    if (xp >= 200)  return { label: "⚡ Rising", color: "text-purple-400" };
    return { label: "🎯 Rookie", color: "text-[var(--text-muted)]" };
  };

  const handlePredict = (player: 1 | 2) => {
    if (pendingPrediction !== null) return; // already waiting on a result
    setPendingPrediction(player);

    const shift = player === 1 ? 6 : -6;
    setP1WinProb(v => Math.max(10, Math.min(90, v + shift)));

    // Simulate result after 1.5s (random, slightly biased toward predicted player)
    setTimeout(() => {
      const isCorrect = Math.random() < 0.62; // 62% chance correct to feel rewarding
      const name = player === 1 ? matchData.player1 : matchData.player2;
      const streakBonus = isCorrect && streak >= 2;
      const xpGain = isCorrect ? (streakBonus ? 200 : 100) : 0;

      setTotalPredictions(p => p + 1);
      if (isCorrect) {
        setCorrectPredictions(p => p + 1);
        setStreak(s => s + 1);
        setXp(x => x + xpGain);
        setScore(s => player === 1 ? { ...s, p1: s.p1 + 1 } : { ...s, p2: s.p2 + 1 });
        if (streakBonus) {
          setLastEvent({ text: `🔥 ${streak + 1}x Streak! +${xpGain} XP`, type: "bonus" });
        } else {
          setLastEvent({ text: `✓ ${name} won! +${xpGain} XP`, type: "win" });
        }
        setPredictionLog(log => [`✓ ${name} point (+${xpGain} XP)`, ...log].slice(0, 5));
      } else {
        setStreak(0);
        setLastEvent({ text: `✗ Wrong pick — 0 XP`, type: "loss" });
        setPredictionLog(log => [`✗ ${name} lost (0 XP)`, ...log].slice(0, 5));
      }

      setPendingPrediction(null);
      setTimeout(() => setLastEvent(null), 2500);
    }, 1500);
  };

  return (
    <>
      <div className="mesh-bg" />
      <div className="min-h-screen p-3 sm:p-5 md:p-8 relative z-10">
        <div className="max-w-[1440px] mx-auto">

          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter">VOLTEX</h1>
              <p className="text-[var(--text-muted)] text-xs font-bold tracking-widest uppercase mt-0.5">Table Tennis Live Intelligence</p>
            </div>
            <div className="relative w-full sm:w-80">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Gemini API Key"
                className="apple-input w-full pl-10 text-sm"
              />
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-7">

            {/* LEFT — Video + Insight */}
            <div className="lg:col-span-8 flex flex-col gap-5">

              {/* URL bar */}
              <div className="broadcast-card p-3 sm:p-4 flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex items-center gap-3 flex-1 min-w-0 px-1">
                  <LinkIcon size={18} className="text-[var(--text-muted)] shrink-0" />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={e => setInputUrl(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSync()}
                    placeholder="Paste YouTube URL..."
                    className="bg-transparent border-none outline-none w-full font-semibold text-sm sm:text-base truncate"
                  />
                </div>
                <button
                  onClick={handleSync}
                  disabled={loading}
                  className="apple-button flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto shrink-0"
                >
                  {loading ? <RefreshCw className="animate-spin" size={16} /> : <Zap size={16} />}
                  Sync Stream
                </button>
              </div>

              {/* Video Player — direct iframe embed */}
              <div className="broadcast-card relative w-full overflow-hidden bg-black rounded-[28px]" style={{ aspectRatio: "16/9" }}>
                <iframe
                  key={embedUrl}
                  src={embedUrl}
                  title="Match Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Insight Panel */}
              <div className="broadcast-card p-5 sm:p-7 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-blue)] rounded-l-full" />
                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                  <h3 className="font-bold flex items-center gap-2 text-[var(--accent-blue)] text-xs tracking-widest uppercase">
                    <Activity size={16} /> Tactical AI Analysis
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      title={audioEnabled ? "Disable audio commentary" : "Enable audio commentary"}
                      className={`p-2 rounded-full transition-all ${audioEnabled ? "bg-[var(--accent-blue)] text-white" : "bg-black/5 dark:bg-white/5 text-[var(--text-muted)]"}`}
                    >
                      {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    </button>
                    <button
                      onClick={generateInsight}
                      disabled={loading}
                      className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase tracking-wider bg-black/5 dark:bg-white/5 px-3 py-2 rounded-full disabled:opacity-40"
                    >
                      {loading ? "Analyzing..." : "Generate Insight"}
                    </button>
                  </div>
                </div>
                <p className={`text-base sm:text-xl md:text-2xl font-semibold leading-relaxed tracking-tight min-h-[3rem] ${isTyping ? "typing-indicator" : ""}`}>
                  {displayedInsight}
                </p>
              </div>
            </div>

            {/* RIGHT — Scoreboard + Telemetry */}
            <div className="lg:col-span-4 flex flex-col gap-5">

              {/* Scoreboard */}
              <div className="broadcast-card p-5 sm:p-7">
                <p className="text-[10px] font-black text-[var(--text-muted)] text-center uppercase tracking-[0.2em] mb-5 truncate">
                  {matchData.tournament}
                </p>
                <div className="flex justify-between items-end gap-2">
                  <div className="text-center flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base leading-tight line-clamp-2 mb-1">{matchData.player1}</div>
                    <div className="cinematic-score">{score.p1}</div>
                  </div>
                  <div className="text-[var(--text-muted)] font-black text-base pb-3 shrink-0">VS</div>
                  <div className="text-center flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base leading-tight line-clamp-2 mb-1">{matchData.player2}</div>
                    <div className="cinematic-score">{score.p2}</div>
                  </div>
                </div>
              </div>

              {/* Telemetry */}
              <div className="broadcast-card p-5 sm:p-7 flex flex-col gap-6 flex-1">
                <h3 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                  <BarChart2 size={16} /> Telemetry
                </h3>

                {/* Context */}
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl">
                  <span className="font-bold text-[var(--accent-blue)] block mb-1 uppercase tracking-wider text-[10px]">Match Context</span>
                  <p className="text-sm font-medium leading-relaxed">{matchData.context}</p>
                </div>

                {/* Win Probability */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>Win Probability</span>
                    <span className="text-[var(--text-muted)]">{Math.round(p1WinProb)} / {Math.round(100 - p1WinProb)}</span>
                  </div>
                  <div className="progress-track flex">
                    <div className="bg-[var(--accent-blue)] progress-fill" style={{ width: `${p1WinProb}%` }} />
                    <div className="bg-[var(--accent-red)] progress-fill" style={{ width: `${100 - p1WinProb}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] mt-2">
                    <span className="truncate w-1/2">{matchData.player1}</span>
                    <span className="truncate w-1/2 text-right">{matchData.player2}</span>
                  </div>
                </div>

                {/* Rally Aggression */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-wider">
                    <span>Rally Aggression</span>
                    <span className="font-black text-[var(--accent-red)]">{Math.round(aggression)}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="bg-gradient-to-r from-orange-400 to-[var(--accent-red)] progress-fill" style={{ width: `${aggression}%` }} />
                  </div>
                </div>

                {/* Live Prediction */}
                <div className="border-t border-[var(--card-border)] pt-4">
                  
                  {/* XP Header */}
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Live Prediction</h4>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${getRank(xp).color}`}>{getRank(xp).label}</span>
                  </div>

                  {/* XP Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-black/5 dark:bg-white/5 rounded-xl p-2 text-center">
                      <div className="text-lg font-black text-[var(--accent-blue)]">{xp}</div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide font-bold">XP</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 rounded-xl p-2 text-center">
                      <div className="text-lg font-black text-orange-500">{streak}</div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide font-bold">Streak</div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 rounded-xl p-2 text-center">
                      <div className="text-lg font-black text-green-500">
                        {totalPredictions > 0 ? Math.round((correctPredictions / totalPredictions) * 100) : 0}%
                      </div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wide font-bold">Accuracy</div>
                    </div>
                  </div>

                  {/* Event Toast */}
                  <AnimatePresence>
                    {lastEvent && (
                      <motion.div
                        key="event"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`text-center text-sm font-black py-2 rounded-xl mb-3 ${
                          lastEvent.type === "bonus" ? "bg-orange-500/15 text-orange-500" :
                          lastEvent.type === "win"   ? "bg-green-500/15 text-green-500" :
                          "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {lastEvent.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Predict Buttons */}
                  <div className="flex flex-col gap-2 mb-3">
                    <button
                      onClick={() => handlePredict(1)}
                      disabled={pendingPrediction !== null}
                      className={`predict-btn blue w-full text-left flex justify-between items-center ${
                        pendingPrediction === 1 ? "opacity-50" : ""
                      }`}
                    >
                      <span className="truncate pr-2 text-sm">{matchData.player1} Point</span>
                      <span className="text-[10px] opacity-50 uppercase tracking-wider shrink-0">
                        {pendingPrediction === 1 ? "Waiting..." : "+100 XP"}
                      </span>
                    </button>
                    <button
                      onClick={() => handlePredict(2)}
                      disabled={pendingPrediction !== null}
                      className={`predict-btn red w-full text-left flex justify-between items-center ${
                        pendingPrediction === 2 ? "opacity-50" : ""
                      }`}
                    >
                      <span className="truncate pr-2 text-sm">{matchData.player2} Point</span>
                      <span className="text-[10px] opacity-50 uppercase tracking-wider shrink-0">
                        {pendingPrediction === 2 ? "Waiting..." : "+100 XP"}
                      </span>
                    </button>
                  </div>

                  {/* Prediction Log */}
                  {predictionLog.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Recent</p>
                      {predictionLog.map((entry, i) => (
                        <div key={i} className={`text-[10px] font-semibold px-2 py-1 rounded-lg ${
                          entry.startsWith("✓") ? "text-green-500 bg-green-500/5" : "text-red-400 bg-red-500/5"
                        }`}>{entry}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
