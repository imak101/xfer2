import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {XferDatabaseService} from "../../services/xfer-database.service";
import {getHistory} from "../history/history.actions";
import {from, map, switchMap} from "rxjs";
import {getHistorySuccess} from "./xfer-database.actions";

@Injectable()
export class XferDatabaseEffects {
  getHistory$;

  constructor(
    private readonly actions$: Actions,
    private readonly database: XferDatabaseService
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
    )
  }
}
