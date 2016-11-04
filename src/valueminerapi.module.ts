import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValueMinerAPIUrl, ValueMinerOAuth2Config, ValueMinerMessagingAPIUrl } from './tokens';
import { BackendService } from './shared/backend.service';
import { API } from './shared/api.service';
import { TokenService } from './shared/token.service';
import { BackendMessagingService } from './shared/backend-messaging.service';

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
