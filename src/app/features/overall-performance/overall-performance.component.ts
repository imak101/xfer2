import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";

@Component({
  selector: 'xfer2-overall-performance',
  standalone: true,
  imports: [],
  templateUrl: './overall-performance.component.html',
  styleUrl: './overall-performance.component.scss'
})
export class OverallPerformanceComponent {
  @Input() entries!: XferDataEntry[];

  getTotalCallsTaken(): number {
    let sum = 0;
    for (let entry of this.entries) {
      sum += entry.callsTaken;
    }
    return sum;
  }

  getTotalCallsXfer(): number {
    let sum = 0;
    for (let entry of this.entries) {
      sum += entry.callsXfer;
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
