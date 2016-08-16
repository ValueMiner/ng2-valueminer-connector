import {NgModule, ModuleWithProviders } from '@angular/core';
import {ValueMinerConfig} from './interfaces';
import {ValueMinerUserConfig, ValueMinerAPIUrl} from './tokens';
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
  static forRoot(config: ValueMinerConfig): ModuleWithProviders {
    return {
      ngModule: ValueMinerAPIModule,
      providers: [
        { provide: ValueMinerUserConfig, useValue: config },
        { provide: ValueMinerAPIUrl, useValue: config.apiURL },
      ]
    };
  }
}

export {API} from './services/api.service';
export {ValueMinerConfig} from './interfaces'
