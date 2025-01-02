import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {XferDataEntry} from "../../../shared/interfaces/xfer-data-entry";
import {XferDataEntryComponent} from "../../../features/xfer-data-entry/xfer-data-entry.component";

import {AsyncPipe, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {selectAllHistory} from "../../../shared/state/history/history.selectors";
import {getHistory} from "../../../shared/state/history/history.actions";
import {AppState} from "../../../shared/state/app.state";
import {OverallPerformanceComponent} from "../../../features/overall-performance/overall-performance.component";
import {ScorecardCycle} from "../../../shared/interfaces/scorecard-cycle";
import {ScorecardCycleComponent} from "../../../features/scorecard-cycle/scorecard-cycle.component";

@Component({
  selector: 'xfer2-history',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    AsyncPipe,
    NgIf,
    OverallPerformanceComponent,
    ScorecardCycleComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent  {
  history$: Observable<ScorecardCycle[]>;
  // entries: XferDataEntry[] | null = null;
  // cycles: ScorecardCycle[] | null = null;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {
    // get history from database
    this.history$ = this.store.select(selectAllHistory);
    this.store.dispatch(getHistory());
  }

  parseEntriesIntoCycles(entries: XferDataEntry[]): ScorecardCycle[] {
    const cycles: ScorecardCycle[] = [];

    for (const entry of entries) {
      const dateObj = new Date(entry.date.replaceAll('-', '/'));
      let startDate: Date;
      let endDate: Date;

      if (dateObj.getDate() >= 29) { // entry is closer towards the beginning of the cycle (29th - 31st)
        startDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), 29);
        endDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 28);
      } else { // entry is already in next month (1st - 28th)
        startDate = new Date(dateObj.getFullYear(), dateObj.getMonth() - 1, 29);
        endDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), 28);
      }

      const cycleIndex = cycles.findIndex((cycle, index) => cycle.start.getTime() === startDate.getTime());
      if (cycleIndex === -1) {
        cycles.push(
          {
            start: startDate,
            end: endDate,
            entries: [entry]
          }
        );
        continue;
      }

      cycles.at(cycleIndex)!.entries.push(entry);
    }

    return cycles;
  }
}
