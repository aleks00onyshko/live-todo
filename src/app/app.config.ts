import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {DateService} from './core/services/date-service/date.service';
import {DateManager} from './core/services/date-service/date-manager';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    {
      provide: DateManager, useClass: DateService
    },
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAZL6Z6u_fSUF7zwmQz_tX_73mTMtXE8Eo",
        authDomain: "live-todo-19553.firebaseapp.com",
        projectId: "live-todo-19553",
        storageBucket: "live-todo-19553.firebasestorage.app",
        messagingSenderId: "1058706499105",
        appId: "1:1058706499105:web:f0ab94115b864cf823e560"
      })), provideFirestore(() => getFirestore()),
  ]
};
