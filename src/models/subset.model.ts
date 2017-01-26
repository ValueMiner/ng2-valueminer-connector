import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToManyRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface ISubsetAttributes {
  name?: string;
  color?: string;
}

export interface ISubsetRelationships {
  nodeStructures?: JSONAPIToManyRelationshipObject;
  relationships?: JSONAPIToManyRelationshipObject;
}

export interface ISubset extends JSONAPIResourceObject {
  attributes?: ISubsetAttributes;
  relationships?: ISubsetRelationships;
}

export interface ISubsetCreate extends ISubsetAttributes {
  name: string;
}
