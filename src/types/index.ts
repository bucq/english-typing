export interface WordData {
  word: string;
  meaning: string;
  difficulty: 'easy' | 'medium' | 'hard';
  id?: number;
}

export interface GameStats {
  wpm: number;
  accuracy: number;
  timer: string;
}

export interface FinalStats {
  totalWords: number;
  correctWords: number;
  finalWpm: number;
  finalAccuracy: number;
  finalTime: string;
}

export interface StatsProps {
  wpm: number;
  accuracy: number;
  timer: string;
}

export interface WordDisplayProps {
  currentWord: WordData | undefined;
  isGameActive: boolean;
}

export interface ProgressProps {
  currentProgress: number;
  totalWords: number;
}

export interface ResultsProps {
  isVisible: boolean;
  totalWords: number;
  correctWords: number;
  finalWpm: number;
  finalAccuracy: number;
  finalTime: string;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type InputClassName = '' | 'correct' | 'incorrect';