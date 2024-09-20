import {createSelector} from '@ngrx/store'
import {AppState} from "../app.state";

export const selectFormState = (state: AppState) => state.formState;
export const selectToday = createSelector(
  selectFormState,

)
