import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, tap } from 'rxjs';

export interface Config {
  webComponents: { id: string; source: string }[];
}

const isNotNull = <T>(config: T | null): config is NonNullable<T> =>
  config !== null;

@Injectable({ providedIn: 'root' })
export class ConfigStore {
  private readonly _config$ = new BehaviorSubject<Config | null>(null);
  readonly config$ = this._config$.pipe(filter(isNotNull));

  private readonly httpClient = inject(HttpClient);

  loadConfig() {
    return () => {
      return this.httpClient.get<Config>('assets/config.json').pipe(
        tap((config) => {
          this._config$.next(config);
        })
      );
    };
  }
}
