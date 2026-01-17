import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {provideDateManager} from './core/services/date';
import {TodoConverterConfig} from './core/models/converters/todo/todo.converter';
import {
  FirestoreDataProviderService,
  provideDataProvider,
  provideEntityConverters, provideIdGenerator
} from 'data-provider-firebase-angular';
import {IdGeneratorImplementation} from '@positional_advantage_coder/id-generator';
import {provideFocusEngine} from './core/focus';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() =>
      // TODO: move later to environment.ts
      initializeApp({
        apiKey: "AIzaSyAZL6Z6u_fSUF7zwmQz_tX_73mTMtXE8Eo",
        authDomain: "live-todo-19553.firebaseapp.com",
        projectId: "live-todo-19553",
        storageBucket: "live-todo-19553.firebasestorage.app",
        messagingSenderId: "1058706499105",
        appId: "1:1058706499105:web:f0ab94115b864cf823e560"
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDateManager(),
    provideEntityConverters([TodoConverterConfig]),
    provideIdGenerator(IdGeneratorImplementation),
    provideDataProvider(FirestoreDataProviderService),
    provideFocusEngine()
  ]
};
