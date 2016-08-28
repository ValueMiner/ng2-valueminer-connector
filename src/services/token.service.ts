import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {OAuth2Config} from '../interfaces';

declare var hello: any;

@Injectable()
export class TokenService {

    constructor(private config: OAuth2Config) {
        this.initService();
    }

    public refresh() {
        return Observable.fromPromise(hello.login({display: 'none', force: true}).then(() => {
            return hello.getAuthResponse().access_token;
        }));
    }

    public get() {
        return Observable.fromPromise(hello.login({display: 'none'}).then(() => {
            return hello.getAuthResponse().access_token;
        }));
    }

    private initService() {
        hello.init({
            valueminer: {
                name: 'ValueMiner',
                oauth: {
                    version: 2,
                    auth: this.config.authURL + '/authorize',
                    grant: this.config.authURL + '/token'
                },

                // Refresh the access_token once expired
                refresh: true,

                // Authorization scopes
                scope: {
                    api: 'api',
                    users: 'users',
                },
            }
        });

        hello.init({
            valueminer: this.config.client_id
        });
    }
}
