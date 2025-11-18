import { MeditationMode } from '../types/meditation';

export const meditationModes: MeditationMode[] = [
  {
    id: 'zen',
    name: 'Zen',
    description: 'Deep relaxation with extended breathing cycles',
    color: '#4A90E2',
    inhale: 4,
    hold: 7,
    exhale: 8,
  },
  {
    id: 'focused',
    name: 'Focused',
    description: 'Balanced breathing for concentration and clarity',
    color: '#50C878',
    inhale: 4,
    hold: 4,
    exhale: 4,
  },
  {
    id: 'energize',
    name: 'Energize',
    description: 'Quick breathing to boost energy and alertness',
    color: '#FF6B6B',
    inhale: 2,
    hold: 1,
    exhale: 3,
  },
];
