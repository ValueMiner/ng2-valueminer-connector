import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INotificationAttributes {
    userId?: number;
    logId?: number;
    read?: boolean;
    log?: {
        elementId: number,
        elementType: string,
        element: any,
        responsibleId: number,
        version: string,
        delta: any,
        responsible: any,
        userId: number
    };
}

export interface INotification extends JSONAPIResourceObject {
  attributes?: INotificationAttributes;
}
