import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValueMinerAPIUrl, ValueMinerOAuth2Config, ValueMinerMessagingAPIUrl } from './tokens';
import { API, BackendService, BackendMessagingService, TokenService, Socket } from './shared/index';

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
        Socket,
        API,
    ]
})
export class ValueMinerAPIModule {
    static forRoot(apiURL: string, messagingApiURL: string, config: OAuth2Config): ModuleWithProviders {
        return {
            ngModule: ValueMinerAPIModule,
            providers: [
                {provide: ValueMinerOAuth2Config, useValue: config},
                {provide: ValueMinerAPIUrl, useValue: apiURL},
                {provide: ValueMinerMessagingAPIUrl, useValue: messagingApiURL},
            ]
        };
    }
}
