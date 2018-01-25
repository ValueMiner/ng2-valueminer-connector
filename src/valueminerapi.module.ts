import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValueMinerAPIUrl, ValueMinerOAuth2Config, ValueMinerMessagingAPIUrl, ValueMinerExportAPIUrl } from './tokens';
import {
  API, MessagingAPI, BackendService, BackendMessagingService, TokenService, Socket,
  ExportAPI
} from './shared/index';
import { BackendExportService } from './shared/backend.export.service';

export interface OAuth2Config {
  authURL: string;
  redirectURL: string;
  scopes: string[];
  client_id: string;
}

@NgModule({
  providers: [
    TokenService,
    BackendService,
    BackendMessagingService,
    BackendExportService,
    Socket,
    API,
    MessagingAPI,
    ExportAPI
  ]
})
export class ValueMinerAPIModule {
  static forRoot(apiURL: string, messagingApiURL: string, exportApiURL: string, config: OAuth2Config): ModuleWithProviders {
    return {
      ngModule: ValueMinerAPIModule,
      providers: [
        {provide: ValueMinerOAuth2Config, useValue: config},
        {provide: ValueMinerAPIUrl, useValue: apiURL},
        {provide: ValueMinerMessagingAPIUrl, useValue: messagingApiURL},
        {provide: ValueMinerExportAPIUrl, useValue: exportApiURL},
      ]
    };
  }
}
