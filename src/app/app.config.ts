import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importez withFetch

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { environment } from '../env';
import { VoiceRecognitionService } from './voice-recognition.service'; // Importez le service de reconnaissance vocale

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), 
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.siteKeyV2,
      } as RecaptchaSettings,
    },
    VoiceRecognitionService, // Ajoutez le service de reconnaissance vocale aux fournisseurs
  ],
};
