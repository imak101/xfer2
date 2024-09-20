import {createAction, props} from '@ngrx/store';
import {XferDataEntry} from "../../interfaces/xfer-data-entry";

export const formValueChanged = createAction(
  '[XferDataEntryForm] Value Changed',
  props<{entry: XferDataEntry}>(),
)

export const loadToday = createAction('[XferDataEntryForm] Load form with today\'s data')
export const loadTodaySuccess = createAction(
  '[XferDataEntryForm] Load form with today\'s data successful',
  props<{entry: XferDataEntry}>()
);
