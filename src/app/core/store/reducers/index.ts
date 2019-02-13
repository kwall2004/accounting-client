import { ActionReducerMap, MetaReducer, createFeatureSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromRouterStore from '@ngrx/router-store';

import { environment } from '../../../../environments/environment';
import * as fromRouter from './router.reducer';
import * as fromApp from './app.reducer';
import * as fromCalendar from './calendar.reducer';

export interface CoreState {
    router: fromRouterStore.RouterReducerState<fromRouter.RouterStateUrl>;
    app: fromApp.State;
    calendar: fromCalendar.State;
}

export const reducers: ActionReducerMap<CoreState> = {
    router: fromRouterStore.routerReducer,
    app: fromApp.reducer,
    calendar: fromCalendar.reducer
};

export const metaReducers: MetaReducer<CoreState>[] = !environment.production ? [storeFreeze] : [];

export const coreFeatureSelector = createFeatureSelector<CoreState>('core');
export const appFeatureSelector = createFeatureSelector<fromApp.State>('app');
export const calendarFeatureSelector = createFeatureSelector<fromCalendar.State>('calendar');
