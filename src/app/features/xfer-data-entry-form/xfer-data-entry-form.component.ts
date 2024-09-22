import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {XferDatabaseService} from "../../shared/services/xfer-database.service";

import {Store} from "@ngrx/store";
import {formValueChanged} from "../../shared/state/today/today.actions";
import {AppState} from "../../shared/state/app.state";

@Component({
  selector: 'xfer2-xfer-data-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './xfer-data-entry-form.component.html',
  styleUrl: './xfer-data-entry-form.component.scss'
})
export class XferDataEntryFormComponent implements OnInit {
  @Input() initialEntry!: XferDataEntry

  xferDataForm = new FormGroup({
      callsTaken: new FormControl(),
      callsXfer: new FormControl(),
    });
  private date!: string;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.xferDataForm.controls.callsXfer.setValue(this.initialEntry.callsXfer);
    this.xferDataForm.controls.callsTaken.setValue(this.initialEntry.callsTaken);
    this.date = this.initialEntry.date;
  }

  addOneTo(controlName: string) {
    const control = this.xferDataForm.get(controlName)!;
    control.setValue(control.value + 1);
    this.onValueChanged();
  }

  onValueChanged() {
    const payload: XferDataEntry = {
      date: this.date,
      // input cannot be decimal
      callsTaken: Math.trunc(this.xferDataForm.controls['callsTaken'].value ?? 0),
      callsXfer: Math.trunc(this.xferDataForm.controls['callsXfer'].value ?? 0),
    }

    // blocks out from updating if input number is negative
    if (this.xferDataForm.invalid) {
      return
    }

    this.store.dispatch(formValueChanged({entry: payload}))
  }
}
