import {ChangeDetectorRef, Component, Input, AfterViewInit} from '@angular/core';
import {ScorecardCycle} from "../../shared/interfaces/scorecard-cycle";

@Component({
  selector: 'xfer2-scorecard-cycle',
  standalone: true,
  imports: [],
  templateUrl: './scorecard-cycle.component.html',
  styleUrl: './scorecard-cycle.component.scss'
})
export class ScorecardCycleComponent implements AfterViewInit {
  @Input({required: true}) cycle: ScorecardCycle = {start: null};

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }


}
