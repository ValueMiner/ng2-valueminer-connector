import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import {
  JSONAPIToOneRelationshipObject,
  JSONAPIToManyRelationshipObject
} from '../jsonapi/jsonapi-relationships-object.model';

export interface IBusinessareaAttributes {
  name?: string;
}

export interface IBusinessareaRelationships {
  instance?: JSONAPIToOneRelationshipObject;
  responsible?: JSONAPIToOneRelationshipObject;
  submodels?: JSONAPIToManyRelationshipObject;
  importschemes?: JSONAPIToManyRelationshipObject;
}

export interface IBusinessarea extends JSONAPIResourceObject {
  attributes?: IBusinessareaAttributes;
  relationships?: IBusinessareaRelationships;
}

export interface IBusinessareaCreate extends IBusinessareaAttributes {
  name: string;
}
