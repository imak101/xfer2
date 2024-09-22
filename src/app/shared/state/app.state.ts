import {XferDataEntryFormState} from "./form/xfer-data-entry-form.reducer";
import {HistoryState} from "./history/history.reducer";

export interface AppState {
  formState: XferDataEntryFormState;
  historyState: HistoryState;
}
