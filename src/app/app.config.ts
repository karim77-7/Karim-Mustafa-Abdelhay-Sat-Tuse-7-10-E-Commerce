import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { provideToastr } from 'ngx-toastr';
import { unauthorizedInterceptor } from './core/interceptors/unauthorized/unauthorized-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor , headerInterceptor , unauthorizedInterceptor])),
    provideRouter(routes),
    provideClientHydration(withEventReplay()) 
  ]
};