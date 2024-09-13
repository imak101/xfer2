import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'xfer2-xfer-data-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './xfer-data-entry-form.component.html',
  styleUrl: './xfer-data-entry-form.component.scss'
})
export class XferDataEntryFormComponent {
  xferDataForm = new FormGroup({
    callsTaken: new FormControl(0),
    callsXfer: new FormControl(0),
  });
}
