import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { TeamPlanningCalendarComponent } from './components/team-planning-calendar/team-planning-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamPlanningCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
