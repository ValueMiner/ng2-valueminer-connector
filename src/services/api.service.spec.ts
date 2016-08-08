import {addProviders, inject} from '@angular/core/testing';
import {Http, ResponseOptions, Response, BaseRequestOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {APIService} from './api.service';
import {TokenService} from './token.service';
import {Observable} from 'rxjs/Rx';

describe('API Service tests', () => {

    let apiServiceFactory = (http: Http, token: TokenService) => {
        return new APIService('http://test.dev', http, token);
    };

    let createTokenServiceMock = () => {
        return {
            get: () => Observable.from(['token']),
            refresh: () => Observable.from(['token'])
        };
    };

    beforeEach(() => {
        addProviders([
            MockBackend,
            BaseRequestOptions,
            {provide: Http, useFactory: (backend, options) => {
                return new Http(backend, options);
            }, deps: [MockBackend, BaseRequestOptions]},
            {provide: TokenService, useFactory: createTokenServiceMock},
            {provide: APIService, useFactory: apiServiceFactory, deps: [Http, TokenService]}
        ]);
    });

    it('should get data',
        inject([MockBackend, APIService], (mockBackend: MockBackend, apiService: APIService) => {

            // first we register a mock response - when a connection
            // comes in, we will respond by giving it an array of (one)
            // blog entries
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                body: {'success' : true}
                            }
                        )));
                });
            // with our mock response configured, we now can
            // ask the blog service to get our blog entries
            // and then test them
            apiService.get('/data').subscribe((data: any) => {
                expect(data.success).toBeTruthy();
            });

        }));
});
