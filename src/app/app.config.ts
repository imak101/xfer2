import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {XferDatabaseEffects} from "./shared/state/database/xfer-database.effects";
import {historyReducer} from "./shared/state/history/history.reducer";
import {formReducer} from "./shared/state/form/xfer-data-entry-form.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({historyState: historyReducer, formState: formReducer}),
    provideEffects(XferDatabaseEffects)
]
};
