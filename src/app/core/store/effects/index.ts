import { AppEffects } from './app.effects';
import { CalendarEffects } from './month.effects';

export const effects: any[] = [
  AppEffects,
  CalendarEffects
];

export * from './app.effects';
export * from './month.effects';
