import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ScorecardCycle} from "../../shared/interfaces/scorecard-cycle";
import {XferDataEntryMathService} from "../../shared/services/xfer-data-math/xfer-data-entry-math.service";
import {XferDataEntryComponent} from "../xfer-data-entry/xfer-data-entry.component";
import {NgIf, NgStyle} from "@angular/common";
import {OverallPerformanceComponent} from "../overall-performance/overall-performance.component";

@Component({
  selector: 'xfer2-scorecard-cycle',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    NgIf,
    NgStyle,
    OverallPerformanceComponent
  ],
  templateUrl: './scorecard-cycle.component.html',
  styleUrl: './scorecard-cycle.component.scss'
})
export class ScorecardCycleComponent {
  @Input({required: true}) cycle!: ScorecardCycle;

  showEntries: boolean = false;

  get isPassing(): boolean {
    return (this.xferMath.reduceToXferPercent(this.cycle.entries) ?? 100) <= 27.00;
  }

  constructor(private xferMath: XferDataEntryMathService) {}

  formatDateString(): string {
    // scorecard cycles always run from the 29th of current month until the 28th of the next. (unless leap year) february is only 28 days long. add check to adjust suffix on date.
    const isMarch = this.cycle.start.getMonth() === 2;

    const isCurrentYear = this.cycle.end.getFullYear() === new Date().getFullYear();

    const start = this.cycle.start.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + (isMarch? "st" : "th");
    const end = this.cycle.end.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + "th";
    return `${start} - ${end}${isCurrentYear? "" : ", " + this.cycle.end.getFullYear()}`;
  }
}
