import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface IVersionAttributes {
  modelId?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IVersion extends JSONAPIResourceObject {
  attributes?: IVersionAttributes;
}
