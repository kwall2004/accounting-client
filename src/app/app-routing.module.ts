import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './features/calendar/calendar.component';
import { HomeComponent } from './features/home/home.component';
import { RecurrencesComponent } from './features/recurrences/recurrences.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'recurrences',
    component: RecurrencesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
