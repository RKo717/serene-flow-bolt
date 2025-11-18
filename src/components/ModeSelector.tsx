import { MeditationMode } from '../types/meditation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Clock } from 'lucide-react';

interface ModeSelectorProps {
  modes: MeditationMode[];
  selectedMode: MeditationMode;
  onSelectMode: (mode: MeditationMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ modes, selectedMode, onSelectMode, disabled }: ModeSelectorProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Choose Your Practice
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const isSelected = selectedMode.id === mode.id;
          return (
            <Card
              key={mode.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? 'ring-2 shadow-md scale-105'
                  : 'hover:scale-102'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                borderColor: isSelected ? mode.color : undefined,
              }}
              onClick={() => !disabled && onSelectMode(mode)}
            >
              <CardHeader className="pb-3">
                <div
                  className="w-12 h-12 rounded-full mb-3 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${mode.color}99, ${mode.color})`,
                  }}
                />
                <CardTitle className="text-xl">{mode.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {mode.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {mode.inhale}s / {mode.hold}s / {mode.exhale}s
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
