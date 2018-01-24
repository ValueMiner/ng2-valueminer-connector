import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ValueMinerAPIUrl, ValueMinerExportAPIUrl, ValueMinerMessagingAPIUrl } from '../tokens';
import { TokenService } from './token.service';
import { BackendService } from './backend.service';

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

}
