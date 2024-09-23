import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {createReducer, on} from "@ngrx/store";
import {formValueChanged} from "./today.actions";
import {getTodaySuccess} from "../database/xfer-database.actions";

export interface TodayState {
  today: XferDataEntry
}

export const initialState: TodayState = {
  today: {
    callsTaken: 0,
    callsXfer: 0,
    date: new Date().toLocaleDateString( 'us-en', {month: "2-digit", day: "2-digit", year: "2-digit"})
  }
};

export const todayReducer = createReducer(
  initialState,
  on(formValueChanged, (state, { entry }) => ({
    today: entry
  })),
  on(getTodaySuccess, (state, { today }) => ({
    // returns [state.today] whenever the database doesn't have an entry for today. the initial state is an empty entry with today's date loaded.
    today: today.date === state.today.date.replaceAll('/', '-') ? today : state.today
  })),
);
