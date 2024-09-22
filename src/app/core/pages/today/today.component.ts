import { Component } from '@angular/core';
import {XferDataEntryComponent} from "../../../features/xfer-data-entry/xfer-data-entry.component";
import {XferDataEntry} from "../../../shared/interfaces/xfer-data-entry";
import {XferDataEntryFormComponent} from "../../../features/xfer-data-entry-form/xfer-data-entry-form.component";
import {DataEntryFeedbackComponent} from "../../../features/data-entry-feedback/data-entry-feedback.component";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {Observable} from "rxjs";
import {selectToday} from "../../../shared/state/today/today.selectors";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'xfer2-today',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    XferDataEntryFormComponent,
    DataEntryFeedbackComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.scss'
})
export class TodayComponent {
  todaysEntry$: Observable<XferDataEntry>

  constructor(private store: Store<AppState>) {
    this.todaysEntry$ = this.store.select(selectToday);
  }
}
