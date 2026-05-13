"use client";
import { useState, useEffect, useRef } from "react";
import { useMatchEngine } from "@/hooks/useMatchEngine";
import { KeyRound, Activity, Link as LinkIcon, RefreshCw, BarChart2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function PremiumDashboard() {
  const { apiKey, setApiKey, displayedInsight, isTyping, loading, matchData, syncWithYouTube, generateRealInsight } = useMatchEngine();
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=7nBUXOOWgwU");
  const [inputUrl, setInputUrl] = useState("https://www.youtube.com/watch?v=7nBUXOOWgwU");
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);

  // Dynamic state for interactivity
  const [p1WinProb, setP1WinProb] = useState(50);
  const [aggression, setAggression] = useState(85);
  const [score, setScore] = useState({ p1: 3, p2: 2 });
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handleSync = () => {
    setVideoUrl(inputUrl);
    syncWithYouTube(inputUrl);
  };

  useEffect(() => {
    syncWithYouTube(inputUrl);
    // Simulate real-time dynamic changes ONLY when video is playing
    const interval = setInterval(() => {
      if (playing) {
        setAggression(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 15)));
      }
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const handlePredict = (player: 1 | 2) => {
    const shift = player === 1 ? 5 : -5;
    setP1WinProb(prev => Math.max(10, Math.min(90, prev + shift)));
    setPredictionResult(`Predicted ${player === 1 ? matchData.player1 : matchData.player2}! (+150 XP)`);
    
    if (Math.random() > 0.5) {
      setScore(prev => player === 1 ? { ...prev, p1: prev.p1 + 1 } : { ...prev, p2: prev.p2 + 1 });
    }

    setTimeout(() => setPredictionResult(null), 3000);
  };

  const handleGenerateInsight = () => {
    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : 0;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    const timestampStr = `${minutes}:${seconds}`;
    generateRealInsight(timestampStr);
  };

  return (
    <>
      <div className="mesh-bg" />
      <div className="min-h-screen p-4 md:p-8 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* Top Navigation */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">VOLTEX</h1>
              <p className="text-[var(--text-muted)] text-sm font-bold tracking-widest uppercase mt-1">Live Match Intelligence</p>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-96">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Gemini API Key"
                  className="apple-input w-full pl-12 text-sm font-medium"
                />
              </div>
            </div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Video & Insights */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Stream Sync Bar */}
              <div className="broadcast-card p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4 w-full px-2">
                  <LinkIcon size={20} className="text-[var(--text-muted)]" />
                  <input 
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Paste YouTube Link Here..."
                    className="bg-transparent border-none outline-none w-full font-semibold md:text-lg text-sm"
                  />
                </div>
                <button onClick={handleSync} disabled={loading} className="apple-button flex justify-center items-center gap-2 whitespace-nowrap w-full sm:w-auto">
                  {loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
                  Sync Stream
                </button>
              </div>

              {/* ReactPlayer Video Embed */}
              <div className="broadcast-card aspect-video bg-black/5 relative overflow-hidden flex items-center justify-center">
                <ReactPlayer 
                  ref={playerRef}
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls={true}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
                <div className="absolute top-6 left-6 live-badge flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${playing ? 'bg-[var(--accent-red)] animate-pulse' : 'bg-gray-400'}`} /> 
                  {playing ? 'LIVE' : 'PAUSED'}
                </div>
              </div>

              {/* Real-time Insight Panel */}
              <div className="broadcast-card p-6 md:p-8 relative group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--accent-blue)]" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="font-bold flex items-center gap-3 text-[var(--accent-blue)] text-sm tracking-widest uppercase">
                    <Activity size={18} /> Tactical AI Analysis
                  </h3>
                  <button 
                    onClick={handleGenerateInsight}
                    disabled={loading}
                    className="text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase tracking-wider bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full"
                  >
                    Sync Insight to Video
                  </button>
                </div>
                <p className={`text-lg md:text-2xl font-semibold leading-relaxed tracking-tight ${isTyping ? 'typing-indicator' : ''}`}>
                  {displayedInsight}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Real Data Telemetry */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Dynamic Scoreboard */}
              <div className="broadcast-card p-6 md:p-8 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 relative">
                <h3 className="text-[10px] md:text-xs font-black text-[var(--text-muted)] mb-8 text-center uppercase tracking-[0.2em] break-words">
                  {matchData.tournament}
                </h3>
                
                <div className="flex justify-between items-end px-2">
                  <div className="text-center w-1/3">
                    <div className="font-bold text-lg md:text-xl leading-tight line-clamp-2 mb-2">{matchData.player1}</div>
                    <div className="cinematic-score text-6xl md:text-5xl">{score.p1}</div>
                  </div>
                  
                  <div className="pb-4 text-center px-2 md:px-4">
                    <div className="text-[var(--text-muted)] font-black text-lg">VS</div>
                  </div>
                  
                  <div className="text-center w-1/3">
                    <div className="font-bold text-lg md:text-xl leading-tight line-clamp-2 mb-2">{matchData.player2}</div>
                    <div className="cinematic-score text-6xl md:text-5xl">{score.p2}</div>
                  </div>
                </div>
              </div>

              {/* Live Telemetry Stats */}
              <div className="broadcast-card p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-bold mb-6 flex items-center gap-3 text-sm uppercase tracking-widest">
                  <BarChart2 size={18} /> Telemetry & Context
                </h3>
                
                <div className="p-4 md:p-5 bg-black/5 dark:bg-white/5 rounded-2xl mb-8">
                  <p className="text-sm md:text-[15px] font-medium leading-relaxed">
                    <span className="font-bold text-[var(--accent-blue)] block mb-1 uppercase tracking-wider text-xs">Match Context</span> 
                    {matchData.context}
                  </p>
                </div>

                <div className="space-y-8 flex-1">
                  {/* Win Probability */}
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-3 uppercase tracking-wider">
                      <span>Win Probability</span>
                      <span className="text-[var(--text-muted)]">{Math.round(p1WinProb)} / {Math.round(100 - p1WinProb)}</span>
                    </div>
                    <div className="progress-track flex">
                      <div className="bg-[var(--accent-blue)] progress-fill" style={{width: `${p1WinProb}%`}}></div>
                      <div className="bg-[var(--accent-red)] progress-fill" style={{width: `${100 - p1WinProb}%`}}></div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-[var(--text-muted)] mt-3">
                      <span className="truncate w-1/2">{matchData.player1}</span>
                      <span className="truncate w-1/2 text-right">{matchData.player2}</span>
                    </div>
                  </div>

                  {/* Pace */}
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-3 uppercase tracking-wider">
                      <span>Rally Aggression</span>
                      <span className="font-black text-[var(--accent-red)]">{Math.round(aggression)}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="bg-gradient-to-r from-orange-400 to-[var(--accent-red)] progress-fill" style={{width: `${aggression}%`}}></div>
                    </div>
                  </div>
                  
                  {/* Interactive Prediction Section */}
                  <div className="pt-8 border-t border-[var(--card-border)] mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest">Live Prediction</h4>
                      {predictionResult && (
                        <motion.span 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] md:text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded"
                        >
                          {predictionResult}
                        </motion.span>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      <button onClick={() => handlePredict(1)} className="predict-btn blue w-full text-left flex justify-between items-center">
                        <span className="truncate pr-2">{matchData.player1} Point</span>
                        <span className="text-[10px] opacity-50 uppercase tracking-wider shrink-0">Select</span>
                      </button>
                      <button onClick={() => handlePredict(2)} className="predict-btn red w-full text-left flex justify-between items-center">
                        <span className="truncate pr-2">{matchData.player2} Point</span>
                        <span className="text-[10px] opacity-50 uppercase tracking-wider shrink-0">Select</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
