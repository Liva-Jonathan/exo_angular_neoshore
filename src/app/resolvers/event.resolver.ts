import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {EventService} from "../services/event.service";

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<Event[]> {

  constructor(private eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Event[]> {
    return this.eventService.findAllEvents();
  }
}
