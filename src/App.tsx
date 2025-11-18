import { useState } from 'react';
import { MeditationCanvas } from './components/MeditationCanvas';
import { ModeSelector } from './components/ModeSelector';
import { CompletionMessage } from './components/CompletionMessage';
import { meditationModes } from './data/modes';
import { MeditationMode } from './types/meditation';

function App() {
  const [selectedMode, setSelectedMode] = useState<MeditationMode>(meditationModes[0]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);

  const sessionDuration = 120;

  const handleComplete = () => {
    setShowCompletion(true);
    setSessionActive(false);
  };

  const handleCompletionDismiss = () => {
    setShowCompletion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-gray-50">
      <div className="container mx-auto py-8 space-y-12">
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            Serene Flow
          </h1>
          <p className="text-lg text-gray-600">
            Find your calm through guided breathing
          </p>
        </header>

        <MeditationCanvas
          mode={selectedMode}
          sessionDuration={sessionDuration}
          onComplete={handleComplete}
        />

        <ModeSelector
          modes={meditationModes}
          selectedMode={selectedMode}
          onSelectMode={(mode) => {
            setSelectedMode(mode);
            setSessionActive(false);
          }}
          disabled={sessionActive}
        />
      </div>

      {showCompletion && <CompletionMessage onComplete={handleCompletionDismiss} />}
    </div>
  );
}

export default App;
