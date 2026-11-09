import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';
import { SeoTitleStrategy } from './services/seo-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // URL parameters like :id are passed into page inputs with the same name
      withComponentInputBinding(),
      // Start each new page at the top, and support #anchor links
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      // Animate between pages with the browser's View Transitions API.
      // The animation itself is defined in styles.css (::view-transition-…).
      withViewTransitions({ skipInitialTransition: true }),
      // After the first page loads, download the other pages in the background
      // so every later click opens instantly
      withPreloading(PreloadAllModules),
    ),
    // Sets the page title and meta description on every navigation
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
  ],
};
