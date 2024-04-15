import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TeamPlanningCalendarComponent} from "./components/team-planning-calendar/team-planning-calendar.component";
import {PersonResolver} from "./resolvers/person.resolver";
import {EventResolver} from "./resolvers/event.resolver";

const routes: Routes = [
  {
      path: '',
      component: TeamPlanningCalendarComponent,
      resolve: {
        persons: PersonResolver,
        events: EventResolver
      }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
