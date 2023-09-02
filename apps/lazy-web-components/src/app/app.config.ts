import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { concatMap, from, mergeMap, take, toArray } from 'rxjs';
import { appRoutes } from './app.routes';
import { ConfigStore } from './config';
import { WebComponentLazyLoaderService } from './web-component-lazy-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configStore: ConfigStore) => {
        return configStore.loadConfig();
      },
      deps: [ConfigStore],
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (configStore: ConfigStore, loader: WebComponentLazyLoaderService) => {
    //     return () => {
    //       return configStore.config$.pipe(
    //         take(1),
    //         concatMap((config) => from(config.webComponents)),
    //         mergeMap(({ id, source }) => loader.load(id, source)),
    //         toArray()
    //       );
    //     };
    //   },
    //   deps: [ConfigStore, WebComponentLazyLoaderService],
    //   multi: true
    // },
    provideHttpClient(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation())
  ],
};
