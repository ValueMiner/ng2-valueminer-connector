import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ValueMinerAPIUrl, ValueMinerMessagingAPIUrl } from '../tokens';
import { TokenService } from './token.service';
import { BackendService } from './backend.service';

@Injectable()
export class BackendMessagingService extends BackendService {

  constructor(@Inject(ValueMinerAPIUrl) apiUrl: string,
              @Inject(ValueMinerMessagingAPIUrl) messagingApiUrl: string,
              http: Http,
              token: TokenService) {
    super(apiUrl, messagingApiUrl, http, token);
    this.apiUrl = messagingApiUrl;
  }

}
