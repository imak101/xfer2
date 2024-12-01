import { Injectable } from '@angular/core';
import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {ScorecardCycle} from "../../interfaces/scorecard-cycle";

@Injectable({
  providedIn: 'root'
})
export class XferDataEntryMathService {
  // Returns null if result is NaN or Infinity
  calculateXferPercent(entry: XferDataEntry): number | null {
    const percent = (entry.callsXfer / entry.callsTaken) * 100;
    if (!Number.isFinite(percent)) {
      return null;
    }

    return Math.round(percent * 100) / 100;
  }

  // Returns null if result is NaN or Infinity
  reduceToXferPercent(entries: XferDataEntry[]): number | null {
    const payload: XferDataEntry = {
      callsXfer: this.reduceToTotalCallsXfer(entries),
      callsTaken: this.reduceToTotalCallsTaken(entries),
      date: "null"
    };
    return this.calculateXferPercent(payload);
  }

  reduceToTotalCallsTaken(entries: XferDataEntry[]): number {
    return entries.reduce((accumulator: number, entry: XferDataEntry) => accumulator + entry.callsTaken, 0);
  }

  reduceToTotalCallsXfer(entries: XferDataEntry[]): number {
    return entries.reduce((accumulator: number, entry: XferDataEntry) => accumulator + entry.callsXfer, 0);
  }

  reduceCyclesTo(method: "callsXfer" | "callsTaken" | "xferPercent", cycles: ScorecardCycle[]): number | null {
    const reduceToEntries: XferDataEntry[] = cycles.reduce(
      (accumulator: XferDataEntry[], cycle: ScorecardCycle): XferDataEntry[] => accumulator.concat(cycle.entries), []
    );

    switch (method) {
      case "callsXfer":
        return this.reduceToTotalCallsXfer(reduceToEntries);
      case "callsTaken":
        return this.reduceToTotalCallsTaken(reduceToEntries);
      case "xferPercent":
        return this.reduceToXferPercent(reduceToEntries);
    }
  }
}
