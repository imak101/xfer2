import {XferDataEntry} from "./xfer-data-entry";

export interface ScorecardCycle {
  start: Date,
  end: Date,
  entries: XferDataEntry[]
}
