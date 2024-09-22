import {TodayState} from "./today/today.reducer";
import {HistoryState} from "./history/history.reducer";

export interface AppState {
  todayState: TodayState;
  historyState: HistoryState;
}
