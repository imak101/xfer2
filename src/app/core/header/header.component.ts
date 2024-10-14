import { Component } from '@angular/core';
import {IdentityComponent} from "../components/identity/identity.component";

@Component({
  selector: 'xfer2-header',
  standalone: true,
  imports: [
    IdentityComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
