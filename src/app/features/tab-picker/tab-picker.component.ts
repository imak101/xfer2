import { Component } from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'xfer2-tab-picker',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    NgClass
  ],
  templateUrl: './tab-picker.component.html',
  styleUrl: './tab-picker.component.scss'
})
export class TabPickerComponent {
  currentTab: string = "today"

  protected readonly history = history;
}
