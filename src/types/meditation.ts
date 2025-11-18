export interface MeditationMode {
  id: string;
  name: string;
  description: string;
  color: string;
  inhale: number;
  hold: number;
  exhale: number;
}

export type SessionState = 'idle' | 'active' | 'paused' | 'completed';

export type BreathPhase = 'inhale' | 'hold' | 'exhale';
