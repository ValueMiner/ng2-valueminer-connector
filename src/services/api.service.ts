import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import {TokenService} from './token.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class APIService {

    constructor(private apiUrl: string, private http: Http, private token: TokenService) {

    }

    public get(path: string): Observable<{}> {
        let url = this.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Get, url)
            .map((response: Response) : {} => {
                return response.json();
            });
    }

    public post(path: string, body: any): Observable<{}> {
        let url = this.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Post, url, body)
            .map((response: Response) : {} => {
                return response.json();
            });
    }

    public put(path: string, body: any): Observable<{}> {
        let url = this.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Put, url, body)
            .map((response: Response) : {} => {
                return response.json();
            });
    }

    public delete(path: any): Observable<{}> {
        let url = this.pathJoin([this.apiUrl, path]);
        return this.request(RequestMethod.Delete, url)
            .map((response: Response) : {} => {
                return response.json();
            });
    }

    private request(method: RequestMethod, url: string, body: {} = {}): Observable<Response> {
        let request: Observable<Request> = this.createRequest(this.token.get(), method, url, body);
        return this.sendRequest(request)
            .catch((res: Response) => {
                if (res.status === 401) {
                    let req = this.createRequest(this.token.refresh(), method, url, body);
                    return this.sendRequest(req).catch((error: Response) => Observable.throw(error.json()));
                } else {
                    return Observable.throw(res.json());
                }
        });
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

    private pathJoin(parts: string[]) {
        let separator = '/';
        let replace = new RegExp(separator + '{1,}', 'g');
        return parts.join(separator).replace(replace, separator);
    }
}
