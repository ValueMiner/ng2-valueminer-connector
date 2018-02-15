import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INotificationAttributes {
    userId?: number;
    logId?: number;
    read?: boolean;
    log?: any;
}

export interface INotification extends JSONAPIResourceObject {
  attributes?: INotificationAttributes;
}
