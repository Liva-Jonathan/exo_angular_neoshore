import { Injectable } from '@angular/core';
import {Person} from "../models/person";
import { PERSONS_DATA } from "../data/data-list";
import {Observable, of} from "rxjs";
import {PersonEvent} from "../models/PersonEvent";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  findAllPersons(): Observable<Person[]> {
    return of(PERSONS_DATA);
  }

  getPersonsEvents(persons: Person[], events: Event[]): PersonEvent[] {
    return persons.map(person => {
      return {
        person: person,
        events: events.filter(event => event.resourceId === person.id)
      } as PersonEvent;
    });
  }
}
