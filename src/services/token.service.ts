import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {Http, Response, ResponseOptions} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TokenService {
    private token: Observable<string>;

    private tokenCounter = 0; // Stube

    constructor(private http: Http) {
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
        let token: Observable<string> = this.fetchTokenFromServer().flatMap((response: any) => {
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

    private fetchTokenFromServer(): Observable<string> {
        return Observable.from([new Response(new ResponseOptions({
            status: 200,
            body: JSON.stringify({
                'access_token': 'token' + this.tokenCounter++,
                'expires_in': 3600
            })
        }))]).map((response: Response) => response.json());
    }

    private storeToken(token: string, expiresAt: Date) {
        sessionStorage.setItem('access_token', JSON.stringify({
            value: token,
            expires_at: expiresAt
        }));
    }

    private loadToken(): string {
        let token: {value: string, expires_at: string} = JSON.parse(sessionStorage.getItem('access_token'));
        let now = new Date(Date.now());
        now.setSeconds(now.getSeconds() - 20);

        if (token && new Date(token.expires_at) > now) {
            return token.value;
        }
        return null;
    }
}
