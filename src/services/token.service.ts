import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {URLSearchParams} from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {OAuth2Config} from '../interfaces';
import {BackendService} from './backend.service';
import {IFrameService} from './iframe.service';
import {ValueMinerOAuth2Config} from '../tokens';

@Injectable()
export class TokenService {
    private token: Observable<string>;

    constructor(@Inject(ValueMinerOAuth2Config) private config: OAuth2Config, private iframe: IFrameService) {
        let token = this.loadToken();
        if (token) {
            this.token = new BehaviorSubject<string>(token);
        } else {
            this.refresh();
        }
    }

    public get(): Observable<string> {
        return this.token;
    }

    public refresh() {
        let token: Observable<{}> = this.fetchTokenFromServer().flatMap((response: any) => {
           return new BehaviorSubject<any>(response);
        });

        this.token = token.map((response: any) => response.access_token);
        token.subscribe((response: any) => {
           let value = response.access_token;
           let expiresAt = new Date(Date.now());
           expiresAt.setSeconds(expiresAt.getSeconds() + response.expires_in);
           this.storeToken(value, expiresAt);
        });
    }

    private fetchTokenFromServer(): Observable<{}> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('client_id', this.config.client_id);
        params.set('response_type', 'token');
        params.set('scope', this.config.scopes.join('+'));
        params.toString();

        let path = BackendService.pathJoin([this.config.authURL, '/authorize']);
        let location = this.iframe.navigateTo(path);

        return location.filter(response => response !== undefined).map(response => {
            let result = new URLSearchParams(response.hash);
            return <{access_token: string, expires_in: string}> {
                access_token: result.get('access_token'),
                expires_in: result.get('expires_in')
            };
        });
    }

    private storeToken(token: string, expiresAt: Date) {
        sessionStorage.setItem('access_token', JSON.stringify({
            value: token,
            expires_at: expiresAt
        }));
    }

    private loadToken(): string {
        let token: {value: string, expires_at: string} = JSON.parse(sessionStorage.getItem('access_token'));

        if (this.isValid(token)) {
            return token.value;
        }
        return null;
    }

    private isValid(token: {value: string, expires_at: string}): boolean {
        let now = new Date(Date.now());
        now.setSeconds(now.getSeconds() - 20); // Buffer to reduce usage of outdated tokens
        return token && new Date(token.expires_at) > now;
    }
}
