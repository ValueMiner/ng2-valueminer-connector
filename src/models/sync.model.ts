import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface ISyncAttributes {
  id?: string;
  instanceId?: number;
  businessareaId?: number;
  modelId?: number;
  clientUid?: string;
  clientId?: string;
  clientUri?: string;
  clientToken?: string;
  synced?: boolean;
  additionalData?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface ISync extends JSONAPIResourceObject {
  attributes?: ISyncAttributes;
}
