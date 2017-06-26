import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToManyRelationshipObject, JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IModelAttributes {
  name?: string;
  reference?: string;
  crossReference?: string;
  description?: string;
  color?: string;
  date?: string;
  status?: number;
  commercialStatus?: number;
  updatedAt?: number;
}

export interface IModelRelationships {
  submodels?: JSONAPIToManyRelationshipObject;
  subsets?: JSONAPIToManyRelationshipObject;
  nodestructures?: JSONAPIToManyRelationshipObject;
  relationships?: JSONAPIToManyRelationshipObject;
  humanresource?: JSONAPIToOneRelationshipObject;
}

export interface IModel extends JSONAPIResourceObject {
  attributes?: IModelAttributes;
  relationships?: IModelRelationships;
}

export interface IModelCreate extends IModelAttributes {
  name: string;
}
