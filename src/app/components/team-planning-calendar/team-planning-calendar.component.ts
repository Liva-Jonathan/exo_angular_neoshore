import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person";
import {Event} from "../../models/Event";
import {MatDialog} from "@angular/material/dialog";
import {DialogEventComponent} from "../dialog-event/dialog-event.component";
import {EventService} from "../../services/event.service";
import {EventImpl} from "@fullcalendar/core/internal";

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
      left: 'today prev,next saveButton',
      center: 'title',
      right: 'newEvent resourceTimelineDay,resourceTimelineWeek'
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
    ],
    customButtons: {
      saveButton: {
        text: 'Sauvegarder les changements',
        click: () => {
          this.saveCalendar();
        }
      },

      newEvent: {
        text: 'Ajouter une mission',
        click: () => {
          this.openDialogEvent();
        }
      }
    },
    eventChange: (change) => {
      this.updateEvent(change.oldEvent, change.event);
    }
  };

  constructor(private route: ActivatedRoute,
              private personService: PersonService,
              private eventService: EventService,
              public dialog: MatDialog) {
    const {persons, events} = this.route.snapshot.data;
    this.calendarOptions.resources = persons;
    this.calendarOptions.events = events;
  }

  ngOnInit(): void {
  }

  saveCalendar() {
    console.log(
      "Les missions de l'équipe: ",
      this.personService.getPersonsEvents(this.calendarOptions.resources as Person[], this.calendarOptions.events as Event[])
    );
  }

  openDialogEvent() {
    const dialogRef = this.dialog.open(DialogEventComponent, {
      width: '30%',
      height: '90%',
      data: {
        persons: this.calendarOptions.resources
      }
    });

    dialogRef.afterClosed().subscribe(resultEvent => {
      if(resultEvent) {

        /* setting event dates */
        const today = new Date();
        resultEvent.start = today.toISOString().slice(0, 19) + "Z";
        today.setHours(today.getHours() + 2);
        resultEvent.end = today.toISOString().slice(0, 19) + "Z";
        resultEvent.allDay = false;

        /* add new events */
        const newTabEvents =  [...(this.calendarOptions.events as Event[])];
        newTabEvents.push(resultEvent);
        this.calendarOptions.events = newTabEvents;
      }
    });
  }

  updateEvent(oldEvent: EventImpl, newEvent: EventImpl) {
    const tabEvents = [...(this.calendarOptions.events as Event[])];
    for (let i = 0; i < tabEvents.length; i++) {
      if (tabEvents[i].title === oldEvent._def.title) {
        // @ts-ignore
        tabEvents[i].resourceId = newEvent._def.resourceIds[0];
        tabEvents[i].start = newEvent._instance?.range.start.toISOString().slice(0, 19) + "Z";
        tabEvents[i].end = newEvent._instance?.range.end.toISOString().slice(0, 19) + "Z";
        break;
      }
    }
    this.calendarOptions.events = tabEvents;
  }

}
