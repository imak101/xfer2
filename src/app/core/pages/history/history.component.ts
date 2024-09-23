import { Component } from '@angular/core';
import {XferDataEntry} from "../../../shared/interfaces/xfer-data-entry";
import {XferDataEntryComponent} from "../../../features/xfer-data-entry/xfer-data-entry.component";

import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {selectAllHistory} from "../../../shared/state/history/history.selectors";
import {getHistory} from "../../../shared/state/history/history.actions";
import {AppState} from "../../../shared/state/app.state";

@Component({
  selector: 'xfer2-history',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    AsyncPipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent  {
  history$: Observable<XferDataEntry[]>;

  constructor(private store: Store<AppState>) {
    // get history from database
    this.history$ = this.store.select(selectAllHistory);
    this.store.dispatch(getHistory());
  }
}
