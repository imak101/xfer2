import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class XferLocalStorageService {

  constructor() { }

  getUsername(): string | null {
    return localStorage.getItem("username");
  }

  setUsername(username: string) {
    return localStorage.setItem("username", username);
  }
}
