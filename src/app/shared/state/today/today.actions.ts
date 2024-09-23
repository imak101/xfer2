import {createAction, props} from '@ngrx/store';
import {XferDataEntry} from "../../interfaces/xfer-data-entry";

export const formValueChanged = createAction(
  '[XferDataEntryForm] Value Changed',
  props<{entry: XferDataEntry}>(),
);

export const getTodayFromDatabase = createAction(
  '[Today Page] Load today\'s entry from database'
);
