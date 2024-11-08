import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ScorecardCycle} from "../../shared/interfaces/scorecard-cycle";

@Component({
  selector: 'xfer2-scorecard-cycle',
  standalone: true,
  imports: [],
  templateUrl: './scorecard-cycle.component.html',
  styleUrl: './scorecard-cycle.component.scss'
})
export class ScorecardCycleComponent {
  @Input({required: true}) cycle!: ScorecardCycle;

  formatDateString(): string {
    // scorecard cycles always run from the 29th of current month until the 28th of the next. (unless leap year) february is only 28 days long. add check to adjust suffix on date.
    const isMarch = this.cycle.start.getMonth() === 2;

    const start = this.cycle.start.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + (isMarch? "st" : "th");
    const end = this.cycle.end.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + "th";
    return `${start} - ${end}`;
  }

  constructor() {
  }
}
