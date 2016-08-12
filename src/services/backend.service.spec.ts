import {addProviders, inject} from '@angular/core/testing';
import {Http, ResponseOptions, Response, BaseRequestOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BackendService} from './backend.service';
import {TokenService} from './token.service';
import {Observable} from 'rxjs/Rx';

describe('Backend Service tests', () => {

    const baseUrl = 'http://test.dev';

    let apiServiceFactory = (http: Http, token: TokenService) => {
        return new BackendService(baseUrl, http, token);
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
            {provide: BackendService, useFactory: apiServiceFactory, deps: [Http, TokenService]}
        ]);
    });

    it('should use full url',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    expect(connection.request.url).toBe(baseUrl + '/data');
                });

            apiService.get('/data').subscribe((data: any) => {

            });

        }));

    it('should get data',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                body: {'success' : true}
                            }
                        )));
                });

            apiService.get('/data').subscribe((data: any) => {
                expect(data.success).toBeTruthy();
            });

        }));

    it('should post data',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    expect(connection.request.getBody()).toEqual(JSON.stringify({name: 'Test'}));
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                status: 201,
                                body: {
                                    id : 1,
                                    name: 'Test'
                                }
                            }
                        )));
                });

            apiService.post('/data', {name: 'Test'}).subscribe((data: any) => {
                expect(data.id).toBe(1);
            });

        }));

    it('should put data',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    expect(connection.request.getBody()).toEqual(JSON.stringify({name: 'Demo'}));
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                status: 200,
                                body: {
                                    id : 1,
                                    name: 'Demo'
                                }
                            }
                        )));
                });

            apiService.put('/data/1', {name: 'Demo'}).subscribe((data: any) => {
                expect(data.id).toBe(1);
                expect(data.name).toBe('Demo');
            });

        }));

    it('should delete data',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                status: 200,
                                body: {
                                    id : 1,
                                    name: 'Demo'
                                }
                            }
                        )));
                });

            apiService.remove('/data/1').subscribe((data: any) => {
                expect(data.id).toBe(1);
                expect(data.name).toBe('Demo');
            });

        }));

    it('should rerun request on invalid token',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            let responses = [];
            responses.push({type: 'error', data: new Response(new ResponseOptions({status: 401, body: {error: 'Invalid Token'}}))});
            responses.push({type: 'response', data: new Response(new ResponseOptions({status: 200, body: {success: true}}))});

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    let response = responses.shift();
                    if (response.type === 'error') {
                        connection.mockError(response.data);
                    } else {
                        connection.mockRespond(response.data);
                    }
                });

            apiService.get('/data').subscribe((data: any) => {
                expect(data.error).not.toBe('Invalid Token');
                expect(data.success).toBeTruthy();
            });

        }));

    it('should return error',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError((<any> new Response(new ResponseOptions({status: 400, body: {error: 'Bad Request'}}))));
                });

            apiService.get('/data').subscribe((data: any) => {
                fail('Should throw error');
            }, (error: any) => {
                expect(error.error).toBe('Bad Request');
            });

        }));

    it('should return error on second 401',
        inject([MockBackend, BackendService], (mockBackend: MockBackend, apiService: BackendService) => {

            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    connection.mockError((<any> new Response(new ResponseOptions({status: 401, body: {error: 'Invalid Token'}}))));
                });

            apiService.get('/data').subscribe((data: any) => {
                fail('Should throw error');
            }, (error: any) => {
                expect(error.error).toBe('Invalid Token');
            });

        }));
});
