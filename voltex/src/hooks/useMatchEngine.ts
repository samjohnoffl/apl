"use client";
import { useState, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";

export function useMatchEngine() {
  const [apiKey, setApiKey] = useState("");
  const [insight, setInsight] = useState("Connect your Gemini API Key to generate real-time tactical insights for this match.");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedInsight, setDisplayedInsight] = useState(insight);
  const [loading, setLoading] = useState(false);

  // Typewriter effect
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

  const generateRealInsight = async (matchContext: string) => {
    if (!apiKey) {
      alert("Please enter a Gemini API Key first.");
      return;
    }
    
    setLoading(true);
    setDisplayedInsight("Analyzing match telemetry...");
    setIsTyping(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are an expert table tennis sports analyst. 
      Generate a very short, punchy, 1-2 sentence tactical insight about the following match context. 
      Make it sound professional, clean, and insightful like an Apple TV sports broadcast.
      Match Context: ${matchContext}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      
      const text = response.text || "Insight generated successfully.";
      setInsight(text);
      typeText(text);
      
    } catch (error: any) {
      console.error(error);
      const errText = "Error connecting to Gemini. Please check your API key.";
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
    generateRealInsight
  };
}
