import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INotificationAttributes {
  title?: string;
  text?: string;
  date?: string;
  link?: string;
}

export interface INotification extends JSONAPIResourceObject {
  attributes?: INotificationAttributes;
}
