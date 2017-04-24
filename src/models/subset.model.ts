import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import {
  JSONAPIToManyRelationshipObject,
  JSONAPIToOneRelationshipObject
} from '../jsonapi/jsonapi-relationships-object.model';

export interface ISubsetAttributes {
  name?: string;
  reference?: string;
  crossReference?: string;
  description?: string;
  color?: string;
  date?: string;
  status?: number;
  commercialStatus?: number;
}

export interface ISubsetRelationships {
  nodestructures?: JSONAPIToManyRelationshipObject;
  relationships?: JSONAPIToManyRelationshipObject;
  humanresource?: JSONAPIToOneRelationshipObject;
  tags?: JSONAPIToManyRelationshipObject;
}

export interface ISubset extends JSONAPIResourceObject {
  attributes?: ISubsetAttributes;
  relationships?: ISubsetRelationships;
}

export interface ISubsetCreate extends ISubsetAttributes {
  name: string;
}
