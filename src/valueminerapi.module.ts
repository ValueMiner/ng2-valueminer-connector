import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValueMinerAPIUrl, ValueMinerOAuth2Config, ValueMinerMessagingAPIUrl } from './tokens';
import { API, BackendService, BackendMessagingService, TokenService } from './shared';

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
        API
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
