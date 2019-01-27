import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthComponent } from './features/month/month.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'calendar',
    component: MonthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
