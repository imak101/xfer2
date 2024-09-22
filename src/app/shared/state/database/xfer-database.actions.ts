import {createAction, props} from "@ngrx/store";
import {XferDataEntry} from "../../interfaces/xfer-data-entry";

export const getHistorySuccess = createAction(
  '[Xfer Database Service] Get History Success',
  props<{history: XferDataEntry[]}>(),
)

export const getTodaySuccess = createAction(
  '[Xfer Database Service] Get Today\'s entry Success',
  props<{today: XferDataEntry}>(),
)
