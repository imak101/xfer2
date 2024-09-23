import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {XferDatabaseEffects} from "./shared/state/database/xfer-database.effects";
import {historyReducer} from "./shared/state/history/history.reducer";
import {todayReducer} from "./shared/state/today/today.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({historyState: historyReducer, todayState: todayReducer}),
    provideEffects(XferDatabaseEffects)
]
};
