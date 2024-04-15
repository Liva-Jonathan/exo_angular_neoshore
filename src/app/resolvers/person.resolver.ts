import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {PersonService} from "../services/person.service";
import {Person} from "../models/person";

@Injectable({
  providedIn: 'root'
})
export class PersonResolver implements Resolve<Person[]> {

  constructor(private personService: PersonService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Person[]> {
    return this.personService.findAllPersons();
  }
}
