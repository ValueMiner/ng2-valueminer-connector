import { NgModule, ModuleWithProviders } from '@angular/core';
import { OAuth2Config } from './interfaces';
import { ValueMinerAPIUrl, ValueMinerOAuth2Config } from './tokens';
import { BackendService } from './services/backend.service';
import { API } from './services/api.service';
import { TokenService } from './services/token.service';
import { RepositoryService } from './services/repository.service';

@NgModule({
    providers: [
        TokenService,
        BackendService,
        RepositoryService,
        API
    ]
})
export class ValueMinerAPIModule {
    static forRoot(apiURL: string, config: OAuth2Config): ModuleWithProviders {
        return {
            ngModule: ValueMinerAPIModule,
            providers: [
                {provide: ValueMinerOAuth2Config, useValue: config},
                {provide: ValueMinerAPIUrl, useValue: apiURL},
            ]
        };
    }
}
