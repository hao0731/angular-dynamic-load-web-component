import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';

import { RainbowBlockComponent } from './app/rainbow-block.component';

(async () => {
  const app = await createApplication({
    providers: [],
  });
  const rainbowBlockElement = createCustomElement(RainbowBlockComponent, {
    injector: app.injector,
  });

  customElements.define('rainbow-block', rainbowBlockElement);
})();
