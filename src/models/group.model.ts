import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import {
  JSONAPIToManyRelationshipObject,
  JSONAPIToOneRelationshipObject
} from '../jsonapi/jsonapi-relationships-object.model';

export interface IGroupAttributes {
  name?: string;
  permissions?: any;
  updatedAt?: number;
}

export interface IGroupRelationships {
  instance?: JSONAPIToOneRelationshipObject;
  humanresources?: JSONAPIToManyRelationshipObject;
}

export interface IGroup extends JSONAPIResourceObject {
  attributes?: IGroupAttributes;
  relationships?: IGroupRelationships;
}
