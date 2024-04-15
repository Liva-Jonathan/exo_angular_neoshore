import {Person} from "./person";
import {Event} from "./Event";

export class PersonEvent {
  person: Person | undefined;
  events: Event[] | undefined;
}
