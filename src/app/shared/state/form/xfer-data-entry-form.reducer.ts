import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {createReducer, on} from "@ngrx/store";
import {formValueChanged} from "./xfer-data-entry-form.actions";

export interface XferDataEntryFormState {
  today: XferDataEntry
}

export const initialState: XferDataEntryFormState = {
  today: {
    callsTaken: 0,
    callsXfer: 0,
    date: new Date().toLocaleDateString( 'us-en', {month: "2-digit", day: "2-digit", year: "2-digit"})
  }
}

export const formReducer = createReducer(
  initialState,
  on(formValueChanged, (state, { entry }) => ({
    ...entry
  }))
)
