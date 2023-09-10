import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { fromEvent, map, of, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebComponentLazyLoaderService {
  private readonly _document = inject(DOCUMENT);

  load(id: string, source: string) {
    const script = this._document.createElement('script');

    if (this._document.getElementById(id)) {
      return of(null);
    }

    script.src = source;
    script.id = id;

    this._document.head.appendChild(script);

    return fromEvent<null>(script, 'load').pipe(
      map(() => null),
      take(1)
    );
  }
}
