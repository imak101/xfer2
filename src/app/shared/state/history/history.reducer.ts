import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {createReducer, on} from "@ngrx/store";
import {getHistorySuccess} from "../database/xfer-database.actions";

export interface HistoryState {
  history: XferDataEntry[]
}

export const initialState: HistoryState = {
  history: []
};

export const historyReducer = createReducer(
  initialState,
  on(getHistorySuccess, (state, {history}) => ({
    ...state,
    history: history
  }))
);