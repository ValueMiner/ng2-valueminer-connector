import {enableProdMode} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ELEMENT_PROBE_PROVIDERS} from '@angular/platform-browser/esm/src/dom/debug/ng_probe';

const ENV_PROVIDERS = [];
// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'prod') {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {API} from './services/api.service';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  return bootstrap(API, [
    ...ENV_PROVIDERS
  ])
  .catch(err => console.error(err));
});
