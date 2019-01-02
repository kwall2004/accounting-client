import { AppEffects } from './app.effects';
import { CalendarEffects } from './calendar.effects';

export const effects: any[] = [
  AppEffects,
  CalendarEffects
];

export * from './app.effects';
export * from './calendar.effects';
