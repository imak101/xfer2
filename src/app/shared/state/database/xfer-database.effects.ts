import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {XferDatabaseService} from "../../services/xfer-database.service";
import {getHistory} from "../history/history.actions";
import {from, map, switchMap, withLatestFrom} from "rxjs";
import {getHistorySuccess} from "./xfer-database.actions";
import {formValueChanged} from "../today/today.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {selectToday} from "../today/today.selectors";

@Injectable()
export class XferDatabaseEffects {
  getHistory$;
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

    this.saveEntry$ = createEffect(() =>
      this.actions$.pipe(
        ofType(formValueChanged),
        withLatestFrom(this.store.select(selectToday)),
        switchMap(([action, entry]) => from(this.database.saveEntry(entry))),
      ),
      {dispatch: false}
    )
  }
}
