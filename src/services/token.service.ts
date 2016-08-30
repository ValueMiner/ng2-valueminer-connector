import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {OAuth2Config} from '../interfaces';

declare var hello: any;

@Injectable()
export class TokenService {

    constructor(private config: OAuth2Config) {
        this.initService();
    }

    public get(): Observable<string> {
        return <Observable<string>> Observable.fromPromise(hello.login({display: 'none'}).then(() => {
            return <string> hello.getAuthResponse().access_token;
        }));
    }

    public refresh(): Observable<string> {
        return <Observable<string>> Observable.fromPromise(hello.login({display: 'none', force: true}).then(() => {
            return <string> hello.getAuthResponse().access_token;
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
