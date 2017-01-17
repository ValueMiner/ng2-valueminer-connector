import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { OAuth2Config } from '../valueminerapi.module';
import { ValueMinerOAuth2Config } from '../tokens';
import * as hello from 'hellojs';

@Injectable()
export class TokenService {
    private valueminer: any;

    constructor(@Inject(ValueMinerOAuth2Config) private config: OAuth2Config) {
        this.valueminer = this.initService();
    }

    public get(): Observable<string> {
        let token = this.valueminer.login({force: false, display: 'page'})
            .then(() => <string> this.valueminer.getAuthResponse().access_token);
        let promise = Promise.resolve(token);   // Abstraction to make the promise compatible
        return <Observable<string>> Observable.fromPromise(promise);
    }

    public refresh(): Observable<string> {
        let token = this.valueminer.login({force: true})
            .then(() => <string> this.valueminer.getAuthResponse().access_token);
        let promise = Promise.resolve(token);   // Abstraction to make the promise compatible
        return <Observable<string>> Observable.fromPromise(promise);
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

                scope_delim: ' ',
            }
        });

        hello.init(
            {valueminer: this.config.client_id},
            {scope: this.config.scopes.join(',')}
        );
        return hello('valueminer');
    }
}
