import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Person} from "../../models/person";

@Component({
  selector: 'app-dialog-event',
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss']
})
export class DialogEventComponent implements OnInit {

  title = "";

  event =  {
    title: "",
    description: "",
    color: "",
    resourceId: ""
  }

  persons: Person[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.persons = data.persons;
    if(data.event) {
      this.event = data.event;
    }

    this.title = data.event ? "Modification de la mission" : "Nouvelle mission";
  }

  ngOnInit(): void {
  }

}
