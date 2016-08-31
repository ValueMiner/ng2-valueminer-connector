import {NgModule, ModuleWithProviders} from '@angular/core';
import {OAuth2Config} from './interfaces';
import {ValueMinerAPIUrl, ValueMinerOAuth2Config} from './tokens';
import {BackendService} from './services/backend.service';
import {API} from './services/api.service';
import {TokenService} from './services/token.service';

@NgModule({
    providers: [
        TokenService,
        BackendService,
        API
    ]
})
export class ValueMinerAPIModule {
  static forRoot(apiURL: string, config: OAuth2Config): ModuleWithProviders {
    return {
      ngModule: ValueMinerAPIModule,
      providers: [
        { provide: ValueMinerOAuth2Config, useValue: config },
        { provide: ValueMinerAPIUrl, useValue: apiURL },
      ]
    };
  }
}

export {API} from './services/api.service';
export {BackendService} from './services/backend.service';
export {OAuth2Config} from './interfaces';
export * from './models/index';
