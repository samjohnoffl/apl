export type Player = {
  id: string;
  name: string;
  country: string;
  flag: string;
  ranking: number;
  color: string;
  avatar: string;
};

export type MatchState = {
  player1: Player;
  player2: Player;
  score1: number;
  score2: number;
  set: number;
  setScores: Array<{ p1: number; p2: number }>;
  momentum: number;
  isLive: boolean;
  matchPhase: "warmup" | "playing" | "timeout" | "break" | "finished";
  currentRally: number;
  rallyCount: number;
};

export type PredictionCard = {
  id: string;
  question: string;
  options: PredictionOption[];
  timeLimit: number;
  triggerAt: number;
  type: "rally_winner" | "shot_type" | "rally_length" | "serve_type" | "momentum";
  xpReward: number;
};

export type PredictionOption = {
  id: string;
  label: string;
  emoji: string;
  correctFor?: string;
};

export type UserPrediction = {
  cardId: string;
  optionId: string;
  timestamp: number;
  correct?: boolean;
  xpEarned: number;
};

export type AIInsight = {
  id: string;
  text: string;
  type: "tactical" | "momentum" | "serve" | "pattern" | "pressure";
  confidence: number;
  timestamp: number;
  icon: string;
};

export type RallyEvent = {
  id: string;
  timestamp: number;
  type: "rally_start" | "rally_end" | "point" | "serve" | "timeout" | "set_end";
  winner?: string;
  rallyLength?: number;
  shotType?: "smash" | "loop" | "push" | "flick" | "block" | "chop";
  label: string;
  isHighlight: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  xp: number;
  streak: number;
  accuracy: number;
  predictions: number;
};

export type HypeOverlay = {
  id: string;
  text: string;
  subtext: string;
  emoji: string;
  color: "blue" | "pink" | "purple" | "green" | "fire";
  duration: number;
};

export type CrowdPrediction = {
  question: string;
  option1: { label: string; percentage: number; color: string };
  option2: { label: string; percentage: number; color: string };
  totalVotes: number;
  trend: "rising" | "falling" | "stable";
};

export type MomentumPoint = {
  time: number;
  value: number;
  event?: string;
};
