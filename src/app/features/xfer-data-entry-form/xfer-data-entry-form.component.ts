import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";

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
  @Input() initialEntry!: XferDataEntry;

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

  addOneTo(controlName: "callsTaken" | "callsXfer") {
    let xfer = this.initialEntry.callsXfer;
    let taken = this.initialEntry.callsTaken;

    // switch value that needs to be overridden to that opposite doesn't lose it's state
    if (controlName == "callsTaken") {
      taken += 1;
    } else {
      xfer += 1;
    }

    this.store.dispatch(formValueChanged({entry: this.makePayload(taken, xfer)}));
  }

  onValueChangedFor(inputName: "callsTaken" | "callsXfer") {
    let xfer = this.initialEntry.callsXfer;
    let taken = this.initialEntry.callsTaken;

    // blocks out from updating if input number is negative
    if (this.xferDataForm.invalid) {
      return;
    }

    // switch value that needs to be overridden to that opposite doesn't lose it's state
    if (inputName === "callsTaken") {
      taken = this.xferDataForm.controls.callsTaken.value;
    } else {
      xfer = this.xferDataForm.controls.callsXfer.value;
    }

    this.store.dispatch(formValueChanged({entry: this.makePayload(taken, xfer)}));
  }

  private makePayload(callsTaken: number, callsXfer: number): XferDataEntry {
    return {
      date: this.initialEntry.date,
      // input cannot be decimal
      callsTaken: Math.trunc(callsTaken),
      callsXfer: Math.trunc(callsXfer),
    };
  }
}
