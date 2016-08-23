import {NgModule, ModuleWithProviders } from '@angular/core';
import {OAuth2Config} from './interfaces';
import {ValueMinerAPIUrl, ValueMinerOAuth2Config} from './tokens';
import {TokenService} from './services/token.service';
import {BackendService} from './services/backend.service';
import {Http} from '@angular/http';
import {API} from './services/api.service';

export const COMMON_PROVIDERS: any[] = [
    { provide: TokenService, deps: [Http] },
    { provide: BackendService, deps: [ValueMinerAPIUrl, Http, TokenService] },
    { provide: API, deps: [BackendService] }
];


@NgModule({
    providers: COMMON_PROVIDERS
})
export class ValueMinerAPIModule {
  static forRoot(apiURL: string, config: OAuth2Config): ModuleWithProviders {
    return {
      ngModule: ValueMinerAPIModule,
      providers: [
        { provide: ValueMinerOAuth2Config, useValue: config },
        { provide: ValueMinerAPIUrl, useValue: apiURL },
        { provide: Window, useValue: window}
      ]
    };
  }
}

export {API} from './services/api.service';
export {OAuth2Config} from './interfaces'
