import { AppEffects } from './app.effects';
import { MonthEffects } from './month.effects';

export const effects: any[] = [
  AppEffects,
  MonthEffects
];

export * from './app.effects';
export * from './month.effects';
