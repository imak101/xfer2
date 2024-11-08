import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {ScorecardCycle} from "../../shared/interfaces/scorecard-cycle";

@Component({
  selector: 'xfer2-overall-performance',
  standalone: true,
  imports: [],
  templateUrl: './overall-performance.component.html',
  styleUrl: './overall-performance.component.scss'
})
export class OverallPerformanceComponent {
  @Input() cycles!: ScorecardCycle[];

  getTotalCallsTaken(): number {
    let sum = 0;
    for (let cycle of this.cycles) {
      sum += cycle.entries.reduce((accumulator: number, entry: XferDataEntry) => accumulator + entry.callsTaken, 0);
    }
    return sum;
  }

  getTotalCallsXfer(): number {
    let sum = 0;
    for (let cycle of this.cycles) {
      sum += cycle.entries.reduce((accumulator: number, entry: XferDataEntry) => accumulator + entry.callsXfer, 0);
    }
    return sum;
  }

  getOverallXferRate(): number | null {
    const percent = (this.getTotalCallsXfer() / this.getTotalCallsTaken()) * 100;
    if (!Number.isFinite(percent)) {
      return null;
    }

    return Math.round(percent * 100) / 100;
  }
}
