import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/state/app.state";
import {XferLocalStorageService} from "../../../shared/services/local-storage/xfer-local-storage.service";
import {getTodayFromDatabase} from "../../../shared/state/today/today.actions";
import {getHistory} from "../../../shared/state/history/history.actions";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'xfer2-identity',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.scss'
})
export class IdentityComponent implements AfterViewInit {
  @ViewChild('usernameDialog', {static: false}) usernameDialog: ElementRef<HTMLDialogElement> = {} as ElementRef;

  get version(): string {
    return "v2.2.0c";
  }

  constructor() {}

  ngAfterViewInit(): void {
  }
}
