import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ValueMinerAPIUrl} from '../tokens';
import {TokenService} from './token.service';

@Injectable()
export class BackendService {

    public static pathJoin(parts: string[]) {
        return parts.join('/').replace(/([^:]\/)\/+/g, '$1');
    }

    constructor(@Inject(ValueMinerAPIUrl) private apiUrl: string, private http: Http, private token: TokenService) {

    }

    public get(path: string): Observable<any> {
        let url = BackendService.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Get, url);
    }

    public post(path: string, body: any): Observable<any> {
        let url = BackendService.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Post, url, body);
    }

    public put(path: string, body: any): Observable<any> {
        let url = BackendService.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Put, url, body);
    }

    public remove(path: any): Observable<any> {
        let url = BackendService.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Delete, url);
    }

    private request(method: RequestMethod, url: string, body: {} = {}): Observable<{}> {
        let request: Observable<Request> = this.createRequest(this.token.get(), method, url, body);
        return this.sendRequest(request)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                if (error.status === 401) {
                    let req = this.createRequest(this.token.refresh(), method, url, body);
                    return this.sendRequest(req).map((response: Response) => response.json());
                }
                return Observable.throw(error);
            }).catch((err: any) => {
                if (typeof err.json === 'function') {
                    err = err.json();
                }
                return Observable.throw(err);
            });
    }

    private sendRequest(request: Observable<Request>): Observable<Response> {
        return <Observable<Response>> request.flatMap((req: Request): Observable<Response> => this.http.request(req));
    }

    private createRequest(token: Observable<string>, method: RequestMethod, url: string, body: {} = {}): Observable<Request> {
        return token.map((accessToken: string) => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + accessToken);
            return headers;
        }).map((headers: Headers) : Request => {
            let requestOptions = new RequestOptions({
                method: method,
                url: url,
                body: JSON.stringify(body),
                headers
            });
            return new Request(requestOptions);
        });
    }
}
