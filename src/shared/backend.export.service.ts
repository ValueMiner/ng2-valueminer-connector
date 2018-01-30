import { Injectable, Inject } from '@angular/core';
import {Headers, Http, RequestMethod, RequestOptions, Response, ResponseContentType} from '@angular/http';
import { ValueMinerAPIUrl, ValueMinerExportAPIUrl, ValueMinerMessagingAPIUrl } from '../tokens';
import { TokenService } from './token.service';
import { BackendService } from './backend.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BackendExportService extends BackendService {

  constructor(@Inject(ValueMinerAPIUrl) apiUrl: string,
              @Inject(ValueMinerMessagingAPIUrl) messagingApiUrl: string,
              @Inject(ValueMinerExportAPIUrl) exportApiUrl: string,
              http: Http,
              token: TokenService) {
    super(apiUrl, messagingApiUrl, exportApiUrl, http, token);
    this.apiUrl = exportApiUrl;
  }

  public post(path: string, body: any): Observable<any> {
    const url = BackendService.pathJoin([this.apiUrl, path]);
    switch (body.data.type) {
      case 'pdf':
        return this.blobRequest(RequestMethod.Post, url, 'application/pdf', body);
      case 'excel':
        return this.blobRequest(RequestMethod.Post, url, 'application/vnd.openxmlformats-officedocument. spreadsheetml.sheet', body);
      case 'png':
        return this.blobRequest(RequestMethod.Post, url, 'image/png', body);
      case 'jpg':
        return this.blobRequest(RequestMethod.Post, url, 'image/jpeg', body);
      case 'word':
        return this.blobRequest(RequestMethod.Post, url, 'application/vnd.openxmlformats-officedocument. wordprocessingml.document', body);
      default:
        return this.request(RequestMethod.Post, url, body);
    }
  }

  protected blobRequest(method: RequestMethod, url: string, contentType: string, body: {} = {}): Observable<{}> {
    return this.sendBlobRequest(this.token.get(), method, url, body)
      .map((response: Response) => {
        return new Blob([response.blob()], {
          type: contentType
        });
      })
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

  protected sendBlobRequest(token: Observable<string>, method: RequestMethod, url: string, body: {} = {}): Observable<Response> {
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
        headers: headers,
        responseType: ResponseContentType.Blob
      });
      return this.http.request(url, requestOptions);
    });
  }

}
