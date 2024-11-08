import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {HistoryState} from "./history.reducer";

export const selectHistoryState = (state: AppState) => {
  return state.historyState;
};
export const selectAllHistory = createSelector(
  selectHistoryState,
  (state: HistoryState) => state.history
);
