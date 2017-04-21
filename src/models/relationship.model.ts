import { JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';
import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface IRelationshipAttributes {
  weight?: number;
}

export interface IRelationshipRelationships {
  parent?: JSONAPIToOneRelationshipObject;
  child?: JSONAPIToOneRelationshipObject;
}

export interface IRelationship extends JSONAPIResourceObject {
  attributes?: IRelationshipAttributes;
  relationships?: IRelationshipRelationships;
}

export interface IRelationshipCreate extends IRelationshipAttributes {

}
