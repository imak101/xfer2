import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {XferDatabaseService} from "../../services/database/xfer-database.service";
import {getHistory} from "../history/history.actions";
import {from, map, switchMap, withLatestFrom} from "rxjs";
import {getHistorySuccess, getTodaySuccess} from "./xfer-database.actions";
import {formValueChanged, getTodayFromDatabase} from "../today/today.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {selectToday} from "../today/today.selectors";
import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {ScorecardCycle} from "../../interfaces/scorecard-cycle";

@Injectable()
export class XferDatabaseEffects {
  getHistory$;
  getToday$;
  saveEntry$;

  constructor(
    private readonly actions$: Actions,
    private readonly database: XferDatabaseService,
    private readonly store: Store<AppState>,
  ) {
    this.getHistory$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getHistory),
        switchMap(() =>
          from(this.database.getAllEntries()).pipe(
            map((data) => getHistorySuccess({history: this.parseEntriesIntoCycles(data).reverse()}))
          )
        )
      )
    );

    this.getToday$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getTodayFromDatabase),
        switchMap(() =>
          from(this.database.getAllEntries()).pipe(
            map((data) => getTodaySuccess({
              // returns 0 as index if entry is not found for today. a default value is used downstream if there is no server data for today
              today: data[this.getIndexForTodaysEntry(data)]
            }))
          )
        )
      )
    );

    this.saveEntry$ = createEffect(() =>
      this.actions$.pipe(
        ofType(formValueChanged),
        withLatestFrom(this.store.select(selectToday)),
        switchMap(([action, entry]) => from(this.database.saveEntry(entry))),
      ),
      {dispatch: false}
    );
  }

  private getIndexForTodaysEntry(entries: XferDataEntry[]): number {
    const todayStr = new Date().toLocaleDateString('en-us', {month: "2-digit", day: "2-digit", year: "2-digit"}).replaceAll('/', '-');
    const index = entries.findIndex((value) => value.date === todayStr);
    return index === -1? 0 : index;
  }

  // A scorecard cycle starts on the 29th of each month and runs until the 28th of the next
  private parseEntriesIntoCycles(entries: XferDataEntry[]): ScorecardCycle[] {
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

    cycles.sort((a, b) => a.start.getTime() - b.start.getTime());
    return cycles;
  }
}
