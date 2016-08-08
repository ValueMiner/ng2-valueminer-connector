import {TokenService} from './token.service';
import {addProviders, inject} from '@angular/core/testing';
import {Observable} from 'rxjs/Rx';
import {Http, BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

describe('Token Service tests', () => {

    beforeEach(() => {
        addProviders([
            MockBackend,
            BaseRequestOptions,
            {provide: Http, useFactory: (backend, options) => {
                return new Http(backend, options);
            }, deps: [MockBackend, BaseRequestOptions]},
            TokenService,
        ]);
    });

    afterEach(() => {
        sessionStorage.clear();
    });

    it('should get token',
        inject([TokenService], (tokenService: TokenService) => {
            let token: Observable<string> = tokenService.get();
            token.subscribe((t: string) => {
                expect(t).toBe('token0');
            });
    }));

    it('should refresh token',
        inject([TokenService], (tokenService: TokenService) => {
            let token: Observable<string> = tokenService.get();
            let token2 = token.flatMap(() => {
                tokenService.refresh();
                return tokenService.get();
            });
            token.subscribe((t: string) => {
                expect(t).toBe('token0');
            });

            token2.subscribe((t: string) => {
                expect(t).toBe('token1');
            });
        }));

    it('should load token from session storage',
        inject([Http], (http: Http) => {
            let expiresAt = new Date(Date.now());
            expiresAt.setSeconds(expiresAt.getSeconds() + 3600);
            sessionStorage.setItem('access_token', JSON.stringify({
                value: 'randomToken',
                expires_at: expiresAt
            }));
            let tokenService: TokenService = new TokenService(http);
            let token: Observable<string> = tokenService.get();
            token.subscribe((t: string) => {
                expect(t).toBe('randomToken');
            });
        }));
});
