import {createAction, props} from "@ngrx/store";
import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {ScorecardCycle} from "../../interfaces/scorecard-cycle";

export const getHistorySuccess = createAction(
  '[Xfer Database Service] Get History Success',
  props<{history: ScorecardCycle[]}>(),
);

export const getTodaySuccess = createAction(
  '[Xfer Database Service] Get Today\'s Entry from Database Success',
  props<{today: XferDataEntry}>(),
);
