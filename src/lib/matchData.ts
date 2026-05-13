import type { AIInsight, HypeOverlay, MomentumPoint, PredictionCard, RallyEvent } from "@/types";

export const PLAYERS = {
  player1: { id: "p1", name: "MA Long", country: "China", flag: "CN", ranking: 1, color: "#00d4ff", avatar: "ML" },
  player2: { id: "p2", name: "FAN Zhendong", country: "China", flag: "CN", ranking: 2, color: "#ff0080", avatar: "FZ" },
};

export const PREDICTION_CARDS: PredictionCard[] = [
  { id: "pred_1", question: "Who wins this rally?", options: [{ id: "o1", label: "MA Long", emoji: "🔵", correctFor: "p1" }, { id: "o2", label: "FAN Zhendong", emoji: "🔴", correctFor: "p2" }], timeLimit: 8, triggerAt: 0, type: "rally_winner", xpReward: 100 },
  { id: "pred_2", question: "What shot ends this rally?", options: [{ id: "o1", label: "Power Smash", emoji: "💥" }, { id: "o2", label: "Topspin Loop", emoji: "🌀" }, { id: "o3", label: "Defensive Push", emoji: "🛡️" }], timeLimit: 8, triggerAt: 0, type: "shot_type", xpReward: 150 },
  { id: "pred_3", question: "Will this rally exceed 10 shots?", options: [{ id: "o1", label: "Yes — Mega Rally!", emoji: "🚀" }, { id: "o2", label: "No — Quick Point", emoji: "⚡" }], timeLimit: 10, triggerAt: 0, type: "rally_length", xpReward: 75 },
  { id: "pred_4", question: "What serve type next?", options: [{ id: "o1", label: "Short Backspin", emoji: "🔄" }, { id: "o2", label: "Fast Long", emoji: "➡️" }, { id: "o3", label: "Side-Spin", emoji: "🌪️" }], timeLimit: 6, triggerAt: 0, type: "serve_type", xpReward: 120 },
  { id: "pred_5", question: "Momentum shift incoming?", options: [{ id: "o1", label: "MA Long surges", emoji: "🔵⚡" }, { id: "o2", label: "FAN stays dominant", emoji: "🔴💪" }], timeLimit: 12, triggerAt: 0, type: "momentum", xpReward: 200 },
];

export const AI_INSIGHTS: AIInsight[] = [
  { id: "ai1", text: "MA Long is forcing wide backhand returns — 78% of last 9 rallies targeted FAN's weaker backhand diagonal.", type: "tactical", confidence: 0.87, timestamp: Date.now(), icon: "🧠" },
  { id: "ai2", text: "Notice the repeated short-backspin serve strategy. MA Long wins 70% of points following this pattern.", type: "serve", confidence: 0.91, timestamp: Date.now(), icon: "🎯" },
  { id: "ai3", text: "Momentum shifting — FAN Zhendong increasing forehand attack frequency. Expect more direct winners.", type: "momentum", confidence: 0.79, timestamp: Date.now(), icon: "⚡" },
  { id: "ai4", text: "Rally length averaging 8.3 shots — significantly above tournament average of 5.1. Both players in elite defensive mode.", type: "pattern", confidence: 0.95, timestamp: Date.now(), icon: "📊" },
  { id: "ai5", text: "High pressure detected: Deuce situation approaching. Historical data shows FAN Zhendong wins 65% of deuce points.", type: "pressure", confidence: 0.82, timestamp: Date.now(), icon: "🔥" },
  { id: "ai6", text: "MA Long transitioning to mid-distance game — creating more table space. Classic counter-strategy emerging.", type: "tactical", confidence: 0.88, timestamp: Date.now(), icon: "🧠" },
  { id: "ai7", text: "FAN Zhendong's footwork pattern: dominant left foot pivot detected in 6 of last 8 attacking sequences.", type: "pattern", confidence: 0.76, timestamp: Date.now(), icon: "👣" },
  { id: "ai8", text: "Critical juncture: Set point pressure intensifying. Watch for timeout request if deficit reaches 3 points.", type: "pressure", confidence: 0.84, timestamp: Date.now(), icon: "🔥" },
  { id: "ai9", text: "Serve variation dropping — MA Long used the same short side-spin 4 times consecutively. FAN adapting.", type: "serve", confidence: 0.80, timestamp: Date.now(), icon: "🎯" },
  { id: "ai10", text: "Both players showing elite consistency — unforced error rate below 8%. This match demands precision over power.", type: "tactical", confidence: 0.93, timestamp: Date.now(), icon: "🧠" },
];

export const HYPE_OVERLAYS: HypeOverlay[] = [
  { id: "h1", text: "INSANE RALLY", subtext: "15+ shot exchange detected", emoji: "🔥", color: "fire", duration: 3000 },
  { id: "h2", text: "MOMENTUM SHIFT", subtext: "The tide is turning", emoji: "⚡", color: "blue", duration: 3000 },
  { id: "h3", text: "PERFECT FOREHAND", subtext: "Textbook execution", emoji: "🎯", color: "purple", duration: 3000 },
  { id: "h4", text: "CROWD CORRECT!", subtext: "72% predicted right", emoji: "🚀", color: "green", duration: 3000 },
  { id: "h5", text: "MATCH POINT", subtext: "One point from victory", emoji: "👑", color: "pink", duration: 4000 },
  { id: "h6", text: "COMEBACK MODE", subtext: "Don't count them out", emoji: "💪", color: "blue", duration: 3000 },
];

export const MOCK_RALLY_EVENTS: RallyEvent[] = [
  { id: "e1", timestamp: 0, type: "rally_start", label: "Match begins — SET 1", isHighlight: false },
  { id: "e2", timestamp: 15, type: "point", winner: "p1", rallyLength: 7, shotType: "loop", label: "MA Long wins 7-shot rally", isHighlight: true },
  { id: "e3", timestamp: 32, type: "point", winner: "p2", rallyLength: 3, shotType: "smash", label: "FAN Zhendong smash winner", isHighlight: false },
  { id: "e4", timestamp: 48, type: "point", winner: "p1", rallyLength: 12, shotType: "loop", label: "Epic 12-shot exchange!", isHighlight: true },
  { id: "e5", timestamp: 67, type: "point", winner: "p2", rallyLength: 2, shotType: "flick", label: "FAN flip winner", isHighlight: false },
  { id: "e6", timestamp: 85, type: "point", winner: "p1", rallyLength: 9, shotType: "smash", label: "MA Long forehand smash!", isHighlight: true },
  { id: "e7", timestamp: 103, type: "point", winner: "p2", rallyLength: 15, shotType: "block", label: "15-shot marathon rally!", isHighlight: true },
  { id: "e8", timestamp: 125, type: "timeout", label: "Technical Timeout", isHighlight: false },
  { id: "e9", timestamp: 145, type: "point", winner: "p1", rallyLength: 6, shotType: "push", label: "MA Long returns to form", isHighlight: false },
  { id: "e10", timestamp: 162, type: "point", winner: "p2", rallyLength: 21, shotType: "loop", label: "INSANE 21-SHOT RALLY!", isHighlight: true },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, userId: "u1", username: "PingMaster_X", avatar: "PM", xp: 4850, streak: 7, accuracy: 78, predictions: 42 },
  { rank: 2, userId: "u2", username: "SpinGenius", avatar: "SG", xp: 4200, streak: 5, accuracy: 72, predictions: 38 },
  { rank: 3, userId: "u3", username: "RallyQueen", avatar: "RQ", xp: 3900, streak: 4, accuracy: 69, predictions: 35 },
  { rank: 4, userId: "u4", username: "TopspiN_99", avatar: "T9", xp: 3400, streak: 3, accuracy: 65, predictions: 31 },
  { rank: 5, userId: "u5", username: "SmashKing", avatar: "SK", xp: 2950, streak: 2, accuracy: 61, predictions: 28 },
  { rank: 6, userId: "u6", username: "DeepSpin", avatar: "DS", xp: 2600, streak: 1, accuracy: 58, predictions: 25 },
  { rank: 7, userId: "u7", username: "NetNinja", avatar: "NN", xp: 2100, streak: 0, accuracy: 54, predictions: 22 },
  { rank: 8, userId: "me", username: "YOU", avatar: "ME", xp: 1750, streak: 3, accuracy: 67, predictions: 18 },
];

export function getRandomPredictionCard(): PredictionCard {
  return PREDICTION_CARDS[Math.floor(Math.random() * PREDICTION_CARDS.length)];
}

export function getRandomInsight(): AIInsight {
  return { ...AI_INSIGHTS[Math.floor(Math.random() * AI_INSIGHTS.length)], timestamp: Date.now() };
}

export function getRandomHype(): HypeOverlay {
  return HYPE_OVERLAYS[Math.floor(Math.random() * HYPE_OVERLAYS.length)];
}

export function generateMomentumHistory(): MomentumPoint[] {
  const points: MomentumPoint[] = [];
  let value = 0;
  for (let i = 0; i <= 80; i++) {
    const change = (Math.random() - 0.48) * 22;
    value = Math.max(-100, Math.min(100, value + change));
    points.push({ time: i, value: Math.round(value) });
  }
  return points;
}
