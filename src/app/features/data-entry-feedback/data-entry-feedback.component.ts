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
  private lastEntry: XferDataEntry | null = null;
  private currentPositivePhrase: string = "";

  private positivePhrases: string[] = [
    "You are doing great!",
    "Keep up the good work!",
    "Excellent!",
    "One call at a time.",
    "Thank you for all you do!",
    "Crush those stats!",
    "Your customers are thankful for you.",
    "Keep going!",
    "Great job."
  ];

  private getRandomPositivePhrase(): string {
    const randomIndex = Math.random() * (this.positivePhrases.length) + 1;
    return this.positivePhrases[Math.trunc(randomIndex - 1)];
  }

  getCurrentPositivePhrase(): string {
    // Only update the phrase if there was actually a change in the entry
    if (JSON.stringify(this.entry) === JSON.stringify(this.lastEntry ?? "null")) {
      return this.currentPositivePhrase;
    }

    this.lastEntry = this.entry;

    // Make sure the new phrase is unique
    let newPhrase: string;
    do {
      newPhrase = this.getRandomPositivePhrase();
    } while (newPhrase === this.currentPositivePhrase);

    this.currentPositivePhrase = newPhrase;
    return this.currentPositivePhrase;
  }

  callsNeededForLevelUpWithXferOffsetOf(xferOffset: number): number {
    let callsNeeded = 0;

    // take current call count and add one call.
    // calculate transfer percentage.
    // if new call count is under 27% transferred, user needs to take [callsNeeded] amount of calls to reach KPI.
    // else, loop.
    while (true) {
      let newPercentXfer = ( (this.entry.callsXfer + xferOffset) / (this.entry.callsTaken + callsNeeded) * 100);
      if ( (Math.round(newPercentXfer * 100) / 100) < 27) {
        return callsNeeded;
      }
      callsNeeded += 1;
    }
  }

  remainingXfers(): number {
    let remaining: number = 1;
    while (true) {
      const callsNeededWithOffset = this.callsNeededForLevelUpWithXferOffsetOf(remaining);
      if (callsNeededWithOffset > 0) {
        return remaining;
      }
      remaining += 1;
    }
  }
}
