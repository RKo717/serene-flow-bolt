import { useState, useEffect, useCallback } from 'react';
import { MeditationMode, SessionState, BreathPhase } from '../types/meditation';
import { Button } from './ui/button';
import { Play, Pause, Square } from 'lucide-react';

interface MeditationCanvasProps {
  mode: MeditationMode;
  sessionDuration: number;
  onComplete: () => void;
}

export function MeditationCanvas({ mode, sessionDuration, onComplete }: MeditationCanvasProps) {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inhale');
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(mode.inhale);
  const [totalTimeLeft, setTotalTimeLeft] = useState(sessionDuration);
  const [scale, setScale] = useState(1);

  const getPhaseLabel = (phase: BreathPhase): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getNextPhase = useCallback(
    (currentPhase: BreathPhase): { phase: BreathPhase; duration: number } => {
      switch (currentPhase) {
        case 'inhale':
          return { phase: 'hold', duration: mode.hold };
        case 'hold':
          return { phase: 'exhale', duration: mode.exhale };
        case 'exhale':
          return { phase: 'inhale', duration: mode.inhale };
      }
    },
    [mode]
  );

  const startSession = () => {
    setSessionState('active');
    setBreathPhase('inhale');
    setPhaseTimeLeft(mode.inhale);
    setTotalTimeLeft(sessionDuration);
    setScale(1.4);
  };

  const pauseSession = () => {
    setSessionState('paused');
  };

  const resumeSession = () => {
    setSessionState('active');
  };

  const stopSession = () => {
    setSessionState('idle');
    setBreathPhase('inhale');
    setPhaseTimeLeft(mode.inhale);
    setTotalTimeLeft(sessionDuration);
    setScale(1);
  };

  useEffect(() => {
    if (sessionState !== 'active') return;

    const interval = setInterval(() => {
      setPhaseTimeLeft((prev) => {
        if (prev <= 1) {
          const next = getNextPhase(breathPhase);
          setBreathPhase(next.phase);

          if (next.phase === 'inhale') {
            setScale(1.4);
          } else if (next.phase === 'hold') {
            setScale(1.4);
          } else {
            setScale(1);
          }

          return next.duration;
        }
        return prev - 1;
      });

      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          setSessionState('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionState, breathPhase, getNextPhase]);

  useEffect(() => {
    if (sessionState === 'completed') {
      onComplete();
    }
  }, [sessionState, onComplete]);

  useEffect(() => {
    if (sessionState === 'active') {
      if (breathPhase === 'inhale') {
        setScale(1.4);
      } else if (breathPhase === 'exhale') {
        setScale(1);
      }
    }
  }, [breathPhase, sessionState]);

  const getTransitionDuration = (): number => {
    if (breathPhase === 'inhale') return mode.inhale;
    if (breathPhase === 'exhale') return mode.exhale;
    return 0;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold text-gray-800">
          {mode.name} Practice
        </h1>
        <p className="text-lg text-gray-600">
          {sessionState === 'idle' ? 'Ready to begin' : formatTime(totalTimeLeft)}
        </p>
      </div>

      <div className="relative flex items-center justify-center min-h-[400px]">
        <div
          className="w-64 h-64 rounded-full flex items-center justify-center shadow-2xl transition-transform"
          style={{
            background: `linear-gradient(135deg, ${mode.color}66, ${mode.color}99)`,
            transform: `scale(${scale})`,
            transitionDuration: `${getTransitionDuration()}s`,
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          <div className="text-center text-white space-y-3">
            <p className="text-2xl font-medium tracking-wide">
              {sessionState === 'idle' ? 'Ready' : getPhaseLabel(breathPhase)}
            </p>
            {sessionState !== 'idle' && (
              <p className="text-6xl font-bold tabular-nums">
                {Math.ceil(phaseTimeLeft)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {sessionState === 'idle' && (
          <Button
            size="lg"
            onClick={startSession}
            className="min-w-32 text-base"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </Button>
        )}

        {sessionState === 'active' && (
          <>
            <Button
              size="lg"
              variant="outline"
              onClick={pauseSession}
              className="min-w-32 text-base"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={stopSession}
              className="min-w-32 text-base"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          </>
        )}

        {sessionState === 'paused' && (
          <>
            <Button
              size="lg"
              onClick={resumeSession}
              className="min-w-32 text-base"
            >
              <Play className="w-5 h-5 mr-2" />
              Resume
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={stopSession}
              className="min-w-32 text-base"
            >
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
