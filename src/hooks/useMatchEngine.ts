"use client";
import { useState, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";

export function useMatchEngine() {
  const [apiKey, setApiKey] = useState("AIzaSyAyWEOUDWAV92etqz-TUuKubY3E-LvYV_8");
  const [insight, setInsight] = useState("System online. Ready to analyze live stream telemetry.");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedInsight, setDisplayedInsight] = useState(insight);
  const [loading, setLoading] = useState(false);
  
  // Real match state extracted from YouTube
  const [matchData, setMatchData] = useState({
    player1: "Player 1",
    player2: "Player 2",
    tournament: "Live Table Tennis Match",
    context: "Awaiting stream connection..."
  });

  const typeText = useCallback((text: string) => {
    setIsTyping(true);
    setDisplayedInsight("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedInsight(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 20);
  }, []);

  const syncWithYouTube = async (youtubeUrl: string) => {
    if (!apiKey) {
      setLoading(true);
      setDisplayedInsight("Syncing with YouTube Stream...");
      setIsTyping(true);
      setTimeout(() => {
        setMatchData({
          player1: "Wang Chuqin",
          player2: "Felix Lebrun",
          tournament: "ITTF World Table Tennis",
          context: "Intense semi-final clash with extreme speed and spin variations."
        });
        const msg = "Successfully connected to stream. (Simulated sync active).";
        setInsight(msg);
        typeText(msg);
        setLoading(false);
      }, 2000);
      return;
    }

    setLoading(true);
    setDisplayedInsight("Gemini is analyzing the YouTube stream metadata...");
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a sports data extraction AI. Look at this YouTube URL (and any slug/ID context): ${youtubeUrl}. 
      If it's a known table tennis match (e.g. from the URL slug or common knowledge), extract the two players and the tournament. 
      If you can't be sure, generate a highly realistic current table tennis matchup based on context clues.
      Respond ONLY in valid JSON format:
      {
        "player1": "Name",
        "player2": "Name",
        "tournament": "Tournament Name",
        "context": "1 sentence describing their typical playstyle clash."
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });
      
      const text = response.text || "{}";
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const data = JSON.parse(cleanJson);
      
      setMatchData({
        player1: data.player1 || "Wang Chuqin",
        player2: data.player2 || "Felix Lebrun",
        tournament: data.tournament || "ITTF World Table Tennis",
        context: data.context || "Live matchup analysis active."
      });
      
      const successMsg = `Stream synchronized. Now tracking ${data.player1} vs ${data.player2}.`;
      setInsight(successMsg);
      typeText(successMsg);

    } catch (error: any) {
      console.error(error);
      const errText = "Error connecting to Gemini. Falling back to local data.";
      setInsight(errText);
      typeText(errText);
      
      setMatchData({
        player1: "Wang Chuqin",
        player2: "Felix Lebrun",
        tournament: "ITTF World Table Tennis",
        context: "Live stream tracking active."
      });
    } finally {
      setLoading(false);
    }
  };

  const generateRealInsight = async (videoTimestamp: string = "00:00") => {
    if (!apiKey) {
      const mockInsights = [
        `[${videoTimestamp}] Tactical Alert: ${matchData.player1} is favoring a heavy backspin serve to control the rally pace.`,
        `[${videoTimestamp}] ${matchData.player2} is attempting to pivot for forehand loops, but struggling with the wide angles.`,
        `[${videoTimestamp}] The rally lengths are increasing. Both players are settling into mid-distance counter-topspin rallies.`
      ];
      const randomMock = mockInsights[Math.floor(Math.random() * mockInsights.length)];
      setInsight(randomMock);
      typeText(randomMock);
      return;
    }
    
    setLoading(true);
    setDisplayedInsight("Generating synchronized tactical insight...");
    setIsTyping(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a premium Apple TV sports analyst. Generate a very short, punchy 1-2 sentence tactical insight about this live table tennis match between ${matchData.player1} and ${matchData.player2}. The video stream is currently at timestamp ${videoTimestamp}. Base your insight on this context: ${matchData.context}. Make it sound incredibly professional, insightful, and specifically reference the timing of the match.`;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });
      
      const text = response.text || "Insight generated.";
      setInsight(`[${videoTimestamp}] ${text}`);
      typeText(`[${videoTimestamp}] ${text}`);
      
    } catch (error: any) {
      const errText = "Error generating insight.";
      setInsight(errText);
      typeText(errText);
    } finally {
      setLoading(false);
    }
  };

  return {
    apiKey,
    setApiKey,
    displayedInsight,
    isTyping,
    loading,
    matchData,
    syncWithYouTube,
    generateRealInsight
  };
}
