import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {XferDatabaseService} from "../../services/xfer-database.service";
import {getHistory} from "../history/history.actions";
import {from, map, switchMap, withLatestFrom} from "rxjs";
import {getHistorySuccess, getTodaySuccess} from "./xfer-database.actions";
import {formValueChanged, getTodayFromDatabase} from "../today/today.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {selectToday} from "../today/today.selectors";

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
            map((data) => getHistorySuccess({history: data.reverse()}))
          )
        )
      )
    );

    // this.getToday$ = createEffect(() =>
    //   this.actions$.pipe(
    //     ofType(getTodayFromDatabase),
    //     withLatestFrom(this.store.select(selectToday)),
    //     switchMap(([action, todayLatest]) =>
    //       from(this.database.getAllEntries()).pipe(
    //         map((data) => getTodaySuccess({
    //           today: data.reverse()[0].date !== todayLatest.date.replaceAll('/', '-')? todayLatest : data.reverse()[0]
    //         }))
    //       )
    //     )
    //   )
    // );

    this.getToday$ = createEffect(() =>
      this.actions$.pipe(
        ofType(getTodayFromDatabase),
        switchMap(() =>
          from(this.database.getAllEntries()).pipe(
            map((data) => getTodaySuccess({
              today: data.reverse()[0]
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
}
