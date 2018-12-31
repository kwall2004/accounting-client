import { AuthEffects } from './auth.effects';
import { CalendarEffects } from './calendar.effects';

export const effects: any[] = [
  AuthEffects,
  CalendarEffects
];

export * from './auth.effects';
export * from './calendar.effects';
