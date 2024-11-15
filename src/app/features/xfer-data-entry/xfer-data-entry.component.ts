import {Component, Input} from '@angular/core';
import {XferDataEntry} from "../../shared/interfaces/xfer-data-entry";
import {XferDataEntryMathService} from "../../shared/services/xfer-data-math/xfer-data-entry-math.service";

@Component({
  selector: 'xfer2-xfer-data-entry',
  standalone: true,
  imports: [],
  templateUrl: './xfer-data-entry.component.html',
  styleUrl: './xfer-data-entry.component.scss'
})
export class XferDataEntryComponent {
  @Input({required: true}) entry!: XferDataEntry;

  get isPassing(): boolean {
    return (this.xferMath.calculateXferPercent(this.entry) ?? 100) <= 27.00;
  }

  get xferPercent(): number {
    return this.xferMath.calculateXferPercent(this.entry) ?? 0;
  }

  constructor(private xferMath: XferDataEntryMathService) {}


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

    const dateObj = new Date(this.entry.date.replaceAll('-', '/'));
    return dateObj.toLocaleDateString('en-us', {month: "long", day: "numeric"}) + getSuffix(dateObj.getDate());
  }
}
