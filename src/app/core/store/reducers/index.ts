import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouterStore from '@ngrx/router-store';

import { environment } from '../../../../environments/environment';
import * as fromRouter from './router.reducer';
import * as fromAuth from './auth.reducer';
import * as fromCalendar from './calendar.reducer';

export interface CoreState {
    router: fromRouterStore.RouterReducerState<fromRouter.RouterStateUrl>;
    auth: fromAuth.State;
    calendar: fromCalendar.State;
}

export const reducers: ActionReducerMap<CoreState> = {
    router: fromRouterStore.routerReducer,
    auth: fromAuth.reducer,
    calendar: fromCalendar.reducer
};

export const metaReducers: MetaReducer<CoreState>[] = !environment.production ? [storeFreeze] : [];

export const coreFeatureSelector = createFeatureSelector<CoreState>('core');
export const authFeatureSelector = createFeatureSelector<fromAuth.State>('auth');
export const calendarFeatureSelector = createFeatureSelector<fromCalendar.State>('calendar');
