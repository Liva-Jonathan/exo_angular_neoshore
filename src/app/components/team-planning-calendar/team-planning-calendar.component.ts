import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {Person} from "../../models/person";
import {Event} from "../../models/Event";

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

        }
      }
    }
  };

  constructor(private route: ActivatedRoute,
              private personService: PersonService) {
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

}
