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
  ];


  // fixme: this component is rebuilt every time the user changes form data. its input is bound to the
  // main observable that handles all state for input change. the observable emits more than once when new data
  // is submitted from the form. we don't want the text to be updating more than once so I've put in a counter to
  // account for the repeated calls from the main observable. only update after this value has been retrieved 4 times.
  // Seems to work for now, will put in proper fix when I have time.
  private _positivePhrase: string = "";
  private _phraseCounter: number = 0;
  get positivePhrase(): string {
    console.log(this._phraseCounter);
    if (this._phraseCounter == 4) {
      this._positivePhrase = this.getPositivePhrase();
      this._phraseCounter = 0;
    }
    this._phraseCounter += 1;
    return this._positivePhrase;
  }

  constructor() {
    this._positivePhrase = this.getPositivePhrase();
  }

  getPositivePhrase(): string { // fixme
    const randomIndex = Math.random() * (this.positivePhrases.length) + 1;
    return this.positivePhrases[Math.trunc(randomIndex - 1)];
  }

  callsNeededForLevelUp(): number {
    let callsNeeded = 0;

    // take current call count and add one call.
    // calculate transfer percentage.
    // if new call count is under 27% transferred, user needs to take [callsNeeded] amount of calls to reach KPI.
    // else, loop.
    while (true) {
      let newPercentXfer = (this.entry.callsXfer / (this.entry.callsTaken + callsNeeded) * 100);
      if ( (Math.round(newPercentXfer * 100) / 100) < 27) {
        return callsNeeded;
      }
      callsNeeded += 1;
    }
  }
}
