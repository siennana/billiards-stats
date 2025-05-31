import { Shot, ShotType } from '@/types/turn.ts';

export const defaultStats: Shot[] = [
  { name: 'Safety Recovery', type: ShotType.Make, count: 0 },
  { name: 'Self Safety', type: ShotType.Make, count: 0 },
  { name: 'Bank', type: ShotType.Make, count: 0 },
  { name: 'Kick', type: ShotType.Make, count: 0 },
  { name: 'Make', type: ShotType.Make, count: 0 },
  { name: 'Miss', type: ShotType.Miss, count: 0 },
  { name: 'Foul', type: ShotType.Miss, count: 0 },
  { name: 'Scratch', type: ShotType.Miss, count: 0 },
  { name: 'Safety', type: ShotType.Miss, count: 0 },
  { name: 'Miss', type: ShotType.Miss, count: 0 },
  { name: 'Make 8', type: ShotType.EndGame, count: 0 },
  { name: 'Make 8 Early', type: ShotType.EndGame, count: 0 },
  { name: 'Scratch on 8', type: ShotType.EndGame, count: 0 },
];
