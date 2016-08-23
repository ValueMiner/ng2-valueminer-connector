import {TokenService} from './token.service';
import {addProviders, inject} from '@angular/core/testing';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Http, BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {IFrameService} from './iframe.service';
import {OAuth2Config} from '../interfaces';
import {ValueMinerOAuth2Config} from '../tokens';

describe('Token Service tests', () => {

    let iframeService = () => {
        let spy = jasmine.createSpyObj('IFrameService', ['navigateTo']);
        spy.navigateTo.and.returnValues(
            new BehaviorSubject({hash: 'access_token=token0&expires_in=3600'}),
            new BehaviorSubject({hash: 'access_token=token1&expires_in=3600'}));
        return spy;
    };

    let tokenServiceFactory = (config: OAuth2Config, iframe: IFrameService) => {
        return new TokenService(config, iframe);
    };

    beforeEach(() => {
        addProviders([
            MockBackend,
            BaseRequestOptions,
            {provide: Http, useFactory: (backend, options) => {
                return new Http(backend, options);
            }, deps: [MockBackend, BaseRequestOptions]},
            {provide: ValueMinerOAuth2Config, useValue: <OAuth2Config>{
                authURL: 'http://auth.dev',
                client_id: 'test',
                redirectURL: 'http://this.dev',
                scopes: ['test']
            }},
            {provide: IFrameService, useFactory: iframeService},
            {provide: TokenService, useFactory: tokenServiceFactory, deps: [ValueMinerOAuth2Config, IFrameService]},
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
        inject([ValueMinerOAuth2Config, IFrameService], (config: OAuth2Config, iframe: IFrameService) => {
            let expiresAt = new Date(Date.now());
            expiresAt.setSeconds(expiresAt.getSeconds() + 3600);
            sessionStorage.setItem('access_token', JSON.stringify({
                value: 'randomToken',
                expires_at: expiresAt
            }));
            let tokenService: TokenService = new TokenService(config, iframe);
            let token: Observable<string> = tokenService.get();
            token.subscribe((t: string) => {
                expect(t).toBe('randomToken');
            });
        }));
});
