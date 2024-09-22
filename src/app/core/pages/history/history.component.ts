import { Component } from '@angular/core';
import {XferDataEntry} from "../../../shared/interfaces/xfer-data-entry";
import {XferDataEntryComponent} from "../../../features/xfer-data-entry/xfer-data-entry.component";
import {XferDatabaseService} from "../../../shared/services/xfer-database.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'xfer2-history',
  standalone: true,
  imports: [
    XferDataEntryComponent,
    AsyncPipe
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  constructor(protected database: XferDatabaseService) {
    this.database.getAllEntries().subscribe(data => this.sample = data)
  }

  test() {
    const x = this.database.getAllEntries().subscribe();
    console.log(x)
  }

  sample: XferDataEntry[] = [
    {callsTaken: 10, callsXfer: 20, date: '23'}, {callsTaken: 45, callsXfer: 465, date: '465165'}, {callsTaken: 415410, callsXfer: 2440, date: '14853'}
  ]
}
