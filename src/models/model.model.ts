import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToManyRelationshipObject, JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IModelAttributes {
  name?: string;
  color?: string;
}

export interface IModelRelationships {
  submodels?: JSONAPIToManyRelationshipObject;
  subsets?: JSONAPIToManyRelationshipObject;
  responsible?: JSONAPIToOneRelationshipObject;
  nodestructures?: JSONAPIToManyRelationshipObject;
  relationships?: JSONAPIToManyRelationshipObject;
}

export interface IModel extends JSONAPIResourceObject {
  attributes?: IModelAttributes;
  relationships?: IModelRelationships;
}

export interface IModelCreate extends IModelAttributes {
  name: string;
}
