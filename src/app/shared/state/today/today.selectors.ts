import {createSelector} from '@ngrx/store'
import {AppState} from "../app.state";

export const selectTodayState = (state: AppState) => state.todayState;
export const selectToday = createSelector(
  selectTodayState,
  (state) => state.today
)
