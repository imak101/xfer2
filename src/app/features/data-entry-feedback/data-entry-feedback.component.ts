import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";

@Component({
  selector: 'xfer2-data-entry-feedback',
  standalone: true,
  imports: [],
  templateUrl: './data-entry-feedback.component.html',
  styleUrl: './data-entry-feedback.component.scss'
})
export class DataEntryFeedbackComponent {
  @Input({required: true}) entry!: XferDataEntry;

  private positivePhrases: string[] = [
    "You are doing great!",
    "Keep up the good work!",
    "Excellent!",
    "One call at a time.",
    "Thank you for all you do!",
    // "Your numbers are great!",
  ]

  getPositivePhrase(): string {
    const randomIndex = Math.random() * (this.positivePhrases.length) + 1;
    console.log(Math.trunc(randomIndex - 1))
    return this.positivePhrases[Math.trunc(randomIndex - 1)]
}

  callsNeededForLevelUp(): number {
    let callsNeeded = 0;
    while (true) {
      let newPercentXfer = (this.entry.callsXfer / (this.entry.callsTaken + callsNeeded) * 100);
      if ( (Math.round(newPercentXfer * 100) / 100) < 27) {
        return callsNeeded;
      }
      callsNeeded += 1;
    }
  }
}
