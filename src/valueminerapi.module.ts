import { NgModule, ModuleWithProviders } from '@angular/core';
import { OAuth2Config } from './interfaces';
import { ValueMinerAPIUrl, ValueMinerMessagingAPIUrl, ValueMinerOAuth2Config } from './tokens';
import { BackendService } from './services/backend.service';
import { API } from './services/api.service';
import { TokenService } from './services/token.service';
import {BackendMessagingService} from "./services/backend.messaging.service";

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
