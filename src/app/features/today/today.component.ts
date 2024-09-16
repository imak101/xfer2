import { Component } from '@angular/core';
import {XferDataEntryComponent} from "../xfer-data-entry/xfer-data-entry.component";
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {XferDataEntryFormComponent} from "../xfer-data-entry-form/xfer-data-entry-form.component";
import {DataEntryFeedbackComponent} from "../data-entry-feedback/data-entry-feedback.component";

@Component({
  selector: 'xfer2-today',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    XferDataEntryFormComponent,
    DataEntryFeedbackComponent
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  sample: XferDataEntry;

  constructor() {
    this.sample = {callsTaken: 0, callsXfer: 0, date: new Date().toLocaleDateString( 'us-en', {month: "2-digit", day: "2-digit", year: "2-digit"})}
  }

}
