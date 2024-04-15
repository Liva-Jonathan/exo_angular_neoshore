import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import {PersonService} from "../../services/person.service";
import {EventService} from "../../services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-team-planning-calendar',
  templateUrl: './team-planning-calendar.component.html',
  styleUrls: ['./team-planning-calendar.component.scss']
})
export class TeamPlanningCalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    plugins: [ resourceTimelinePlugin, interactionPlugin ],
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek'
    },
    locale: 'fr',
    timeZone: 'UTC',
    themeSystem: 'flatly',
    initialView: 'resourceTimelineDay',
    editable: true,
    aspectRatio: 5,
    resourceAreaColumns: [
      {
        field: 'name',
        headerContent: 'Nom'
      },
      {
        field: 'photo',
        headerContent: 'Photo'
      }
    ]
  };

  constructor(private route: ActivatedRoute) {
    const {persons, events} = this.route.snapshot.data;
    this.calendarOptions.resources = persons;
    this.calendarOptions.events = events;
  }

  ngOnInit(): void {
  }

}
