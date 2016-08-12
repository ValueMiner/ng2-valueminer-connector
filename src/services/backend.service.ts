import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import {TokenService} from './token.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BackendService {

    public static pathJoin(parts: string[]) {
        return parts.join('/').replace(/([^:]\/)\/+/g, '$1');
    }

    constructor(private apiUrl: string, private http: Http, private token: TokenService) {

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

    private request(method: RequestMethod, url: string, body: {} = {}): Observable<Response> {
        let request: Observable<Request> = this.createRequest(this.token.get(), method, url, body);
        return this.sendRequest(request)
            .map((response: Response) => response.json())
            .catch((error: any) => {
                if (error.status === 401) {
                    this.token.refresh();
                    let req = this.createRequest(this.token.get(), method, url, body);
                    return this.sendRequest(req).map((response: Response) => response.json());
                }
                return Observable.throw(error);
            }).catch((err: any) => Observable.throw(err.json()));
    }

    private sendRequest(request: Observable<Request>): Observable<Response> {
        return request.flatMap((req: Request) : Observable<Response> => {
            return this.http.request(req);
        });
    }

    private createRequest(token: Observable<string>, method: RequestMethod, url: string, body: {} = {}): Observable<Request> {
        return token.map((accessToken: string) => {
            let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + accessToken);
            return headers;
        }).map((headers: Headers) => {
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
