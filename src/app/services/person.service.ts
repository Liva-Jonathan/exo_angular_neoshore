import { Injectable } from '@angular/core';
import {Person} from "../models/person";
import { PERSONS_DATA } from "../data/data-list";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  findAllPersons(): Observable<Person[]> {
    return of(PERSONS_DATA);
  }
}
