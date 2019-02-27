import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './features/calendar/calendar.component';
import { HomeComponent } from './features/home/home.component';
import { RecurrencesComponent } from './features/recurrences/recurrences.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    HomeComponent,
    RecurrencesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
