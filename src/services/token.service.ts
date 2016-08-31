import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {OAuth2Config} from '../interfaces';
import {ValueMinerOAuth2Config} from '../tokens';

declare var hello: any;

@Injectable()
export class TokenService {
    private scope = 'api';

    constructor(@Inject(ValueMinerOAuth2Config) private config: OAuth2Config) {
        this.initService();
        hello('valueminer').login({display: 'page', scope: this.scope});
    }

    public get(): Observable<string> {
        return <Observable<string>> Observable.fromPromise(hello('valueminer').login({
            display: 'none',
            scope: this.scope
        })
            .then(() => <string> hello.getAuthResponse().access_token));
    }

    public refresh(): Observable<string> {
        return <Observable<string>> Observable.fromPromise(hello('valueminer').login({
            display: 'none',
            force: true,
            scope: this.scope
        })
            .then(() => <string> hello.getAuthResponse().access_token));
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
