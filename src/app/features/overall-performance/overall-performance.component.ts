import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {ScorecardCycle} from "../../shared/interfaces/scorecard-cycle";
import {XferDataEntryMathService} from "../../shared/services/xfer-data-math/xfer-data-entry-math.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'xfer2-overall-performance',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './overall-performance.component.html',
  styleUrl: './overall-performance.component.scss'
})
export class OverallPerformanceComponent {
  @Input() cycles!: ScorecardCycle[];

  constructor(private xferMath: XferDataEntryMathService) {}

  get isPassing(): boolean {
    return (this.overallXferPercent ?? 100) <= 27.00;
  }

  get isOnlyOneCycle(): boolean {
    return this.cycles.length === 1;
  }

  get totalCallsTaken(): number | null {
    return this.xferMath.reduceCyclesTo("callsTaken", this.cycles);
  }

  get totalCallsXfer(): number | null{
    return this.xferMath.reduceCyclesTo("callsXfer", this.cycles);
  }

  get overallXferPercent(): number | null {
    return this.xferMath.reduceCyclesTo("xferPercent", this.cycles);
  }
}
