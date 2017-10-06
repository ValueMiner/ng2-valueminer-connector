import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ValueMinerMessagingAPIUrl } from '../tokens';
import { TokenService } from './token.service';

@Injectable()
export class BackendMessagingService {

  public static pathJoin(parts: string[]) {
    return parts.join('/').replace(/([^:]\/)\/+/g, '$1');
  }

  constructor(@Inject(ValueMinerMessagingAPIUrl) private apiUrl: string, private http: Http, private token: TokenService) {

  }

  public get(path: string): Observable<any> {
    const url = BackendMessagingService.pathJoin([this.apiUrl, path]);
    return this.request(RequestMethod.Get, url);
  }

  public post(path: string, body: any): Observable<any> {
    const url = BackendMessagingService.pathJoin([this.apiUrl, path]);
    return this.request(RequestMethod.Post, url, body);
  }

  public put(path: string, body: any): Observable<any> {
    const url = BackendMessagingService.pathJoin([this.apiUrl, path]);
    return this.request(RequestMethod.Put, url, body);
  }

  public remove(path: any, body?: any): Observable<any> {
    const url = BackendMessagingService.pathJoin([this.apiUrl, path]);
    return this.request(RequestMethod.Delete, url, body);
  }

  private request(method: RequestMethod, url: string, body: {} = {}): Observable<{}> {
    return this.sendRequest(this.token.get(), method, url, body)
      .map((response: Response) => response.json())
      .catch((error: any) => {
        if (error.status === 401) {
          return this.sendRequest(this.token.refresh(), method, url, body).map((response: Response) => response.json());
        }
        return Observable.throw(error);
      }).catch((err: any) => {
        if (typeof err.json === 'function') {
          err = err.json();
        }
        return Observable.throw(err);
      });
  }

  private sendRequest(token: Observable<string>, method: RequestMethod, url: string, body: {} = {}): Observable<Response> {
    return token.flatMap((accessToken: string) => {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.api.v2+json',
        'Authorization': `Bearer ${accessToken}`
      });

      const requestOptions = new RequestOptions({
        method: method,
        url: url,
        body: JSON.stringify(body),
        headers: headers
      });
      return this.http.request(url, requestOptions);
    });
  }
}
