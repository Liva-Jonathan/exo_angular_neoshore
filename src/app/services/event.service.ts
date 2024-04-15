import { Injectable } from '@angular/core';
import { EVENTS_DATA} from "../data/data-list";
import {Observable, of} from "rxjs";
import {Event} from "../models/Event.js"

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  findAllEvents(): Observable<Event[]> {
    return of(EVENTS_DATA);
  }

}
