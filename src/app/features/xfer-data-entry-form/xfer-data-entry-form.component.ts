import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {XferDatabaseService} from "../../shared/services/xfer-database.service";

import {Store} from "@ngrx/store";
import {formValueChanged} from "../../shared/state/form/xfer-data-entry-form.actions";

@Component({
  selector: 'xfer2-xfer-data-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './xfer-data-entry-form.component.html',
  styleUrl: './xfer-data-entry-form.component.scss'
})
export class XferDataEntryFormComponent {
  @Output() valueChanged = new EventEmitter<XferDataEntry>();

  xferDataForm = new FormGroup({
    callsTaken: new FormControl(0),
    callsXfer: new FormControl(0),
  });
  private readonly date: string;

  constructor(private store: Store) {
    this.date = new Date().toLocaleDateString( 'us-en', {month: "2-digit", day: "2-digit", year: "2-digit"})
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
      callsTaken: Math.trunc(this.xferDataForm.controls.callsTaken.value ?? 0),
      callsXfer: Math.trunc(this.xferDataForm.controls.callsXfer.value ?? 0),
    }

    // blocks out from updating if input number is negative
    if (this.xferDataForm.invalid) {
      return
    }

    this.store.dispatch(formValueChanged({entry: payload}))
    this.valueChanged.emit(payload);
  }
}
