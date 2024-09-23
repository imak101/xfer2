import { Routes } from '@angular/router';
import {TodayComponent} from "./core/pages/today/today.component";
import {HistoryComponent} from "./core/pages/history/history.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full'
  },
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  }
];
