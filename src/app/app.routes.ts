import { Routes } from '@angular/router';
import {TodayComponent} from "./features/today/today.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full'
  },
  {
    path: 'today',
    component: TodayComponent,
    // title: 'Today'
  }
];
