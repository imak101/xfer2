import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";

@Component({
  selector: 'xfer2-xfer-data-entry',
  standalone: true,
  imports: [],
  templateUrl: './xfer-data-entry.component.html',
  styleUrl: './xfer-data-entry.component.scss'
})
export class XferDataEntryComponent {
  @Input({required: true}) entry!: XferDataEntry;

  constructor() {
  }

  formatDate(): string {
    let getSuffix = (date: number): string => {
      if (date > 3 && date < 21) return "th";
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const dateObj = new Date(this.entry.date.replaceAll('.', '/'));
    return dateObj.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + getSuffix(dateObj.getDate());
  }

  // Returns null if result is NaN or Infinity
  callsXferPercent(): number | null {
    const percent = (this.entry.callsXfer / this.entry.callsTaken) * 100;
    if (!Number.isFinite(percent)) {
      return null;
    }

    return Math.round(percent * 100) / 100;
  }
}
