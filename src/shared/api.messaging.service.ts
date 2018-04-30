import { Injectable } from '@angular/core';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { BackendMessagingService } from './backend.messaging.service';
import { ISync } from '../models/sync.model';
import { INotification } from '../models/notification.model';

@Injectable()
export class MessagingAPI {

  constructor(private apiService: BackendMessagingService) {}

  public get syncs() {
    return new JSONAPIResourceService<ISync>('syncs', '/syncs', this.apiService);
  }

  public get notifications() {
    return new JSONAPIResourceService<INotification>('notifications', '/notifications', this.apiService);
  }

  public get extoauth() {
    return new JSONAPIResourceService<any>('extoauth', '/extoauth', this.apiService);
  }

  public get sqs() {
    return new JSONAPIResourceService<any>('sqs', '/sqs', this.apiService);
  }

  public get jira() {
    return new JSONAPIResourceService<any>('jira', '/jira', this.apiService);
  }

}
