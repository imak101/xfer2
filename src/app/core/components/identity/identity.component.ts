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

  usernameForm = new FormGroup(
    {
      username: new FormControl("",
        [
        Validators.required,
        Validators.minLength(4),
      ])
    },
  )

  get usernameInput() {
    return this.usernameForm.controls.username;
  }

  hideCloseButton: boolean = false;
  constructor(private store: Store<AppState>, private xferLocalStorage: XferLocalStorageService) {}

  ngAfterViewInit(): void {
    const username = this.xferLocalStorage.getUsername();
    if (username === null) {
      this.hideCloseButton = true;
      this.usernameDialog.nativeElement.showModal();
      return;
    }
    this.usernameForm.controls.username.setValue(username);
  }

  signInButtonPressed() {
    this.hideCloseButton = false;
    this.xferLocalStorage.setUsername(this.usernameForm.controls.username.value ?? "sampleUser");
    this.dispatchActions();
  }

  userCanceledForm() {
    if (this.xferLocalStorage.getUsername() !== null) return;

    this.xferLocalStorage.setUsername("sampleUser");
    this.usernameForm.controls.username.setValue("sampleUser");
    this.dispatchActions();
  }

  private dispatchActions() {
    this.store.dispatch(getTodayFromDatabase());
    this.store.dispatch(getHistory());
  }

  getTooltip(): string {
    return this.xferLocalStorage.getUsername() ?? "";
  }
}
