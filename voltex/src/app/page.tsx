"use client";
import { useState } from "react";
import { useMatchEngine } from "@/hooks/useMatchEngine";
import { KeyRound, Activity, Settings2, PlayCircle, BarChart3, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CleanDashboard() {
  const { apiKey, setApiKey, displayedInsight, isTyping, loading, generateRealInsight } = useMatchEngine();
  const [showSettings, setShowSettings] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/embed/5D3I9R5lO4E");

  const handleGenerateInsight = () => {
    // We pass a mock match context for the hackathon demo, but it uses the REAL Gemini model to generate the insight
    const contexts = [
      "Player 1 (Ma Long) just hit a powerful forehand winner down the line after a long backhand rally.",
      "Player 2 (Fan Zhendong) is stepping back from the table to defend against heavy topspin loops.",
      "The score is tied 9-9 in the final set. Both players are playing very cautious short pushes.",
      "Player 1 just served a fast, long side-spin serve that completely surprised Player 2."
    ];
    const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
    generateRealInsight(randomContext);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">Voltex</h1>
            <p className="text-gray-500 text-sm mt-1">Match Intelligence Dashboard</p>
          </div>
          
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500"
          >
            <Settings2 size={24} />
          </button>
        </header>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="clean-card p-6 mb-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <KeyRound size={16} /> Gemini API Key
                  </label>
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-xs text-gray-500">Required for real-time tactical insights.</p>
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <PlayCircle size={16} /> YouTube Embed URL
                  </label>
                  <input 
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="clean-card aspect-video bg-black relative shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                src={videoUrl} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0"
              />
            </div>
            
            {/* Real AI Insight Area */}
            <div className="clean-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Activity size={18} /> Tactical AI Analyst
                </h3>
                <button 
                  onClick={handleGenerateInsight}
                  disabled={loading}
                  className="btn-clean text-sm flex items-center gap-2"
                >
                  {loading ? "Analyzing..." : "Generate Insight"} <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 min-h-[100px] flex items-center">
                <p className={`text-lg text-gray-800 dark:text-gray-200 font-medium ${isTyping ? 'typing-cursor' : ''}`}>
                  {displayedInsight}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Match Stats */}
          <div className="space-y-6">
            
            {/* Scoreboard */}
            <div className="clean-card p-6 bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border-blue-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-500 mb-4 text-center">CURRENT MATCH</h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-2 border border-gray-100 dark:border-gray-600">🏓</div>
                  <div className="font-semibold">Ma Long</div>
                </div>
                <div className="text-4xl font-light tracking-tight">
                  <span className="font-bold text-gray-900 dark:text-white">3</span>
                  <span className="text-gray-300 mx-2">-</span>
                  <span className="font-bold text-gray-900 dark:text-white">2</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-2 border border-gray-100 dark:border-gray-600">⚡</div>
                  <div className="font-semibold">Fan Zhendong</div>
                </div>
              </div>
            </div>

            {/* Match Telemetry Placeholder */}
            <div className="clean-card p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-gray-400" /> Match Telemetry
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Forehand Winners</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Avg Rally Length</span>
                    <span className="font-semibold">6.2 Shots</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Momentum</span>
                    <span className="font-semibold">Even</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden flex">
                    <div className="bg-blue-500 h-2" style={{width: '50%'}}></div>
                    <div className="bg-red-500 h-2" style={{width: '50%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Simple Prediction Card */}
            <div className="clean-card p-6">
              <h3 className="font-semibold mb-4 text-center">Live Prediction</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">Who will win the next rally?</p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all font-medium">
                  Ma Long
                </button>
                <button className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium">
                  Fan Zhendong
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
