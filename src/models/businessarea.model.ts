import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import {
  JSONAPIToOneRelationshipObject,
  JSONAPIToManyRelationshipObject
} from '../jsonapi/jsonapi-relationships-object.model';

export interface IBusinessareaAttributes {
  name?: string;
  reference?: string;
  crossReference?: string;
  description?: string;
  color?: string;
  date?: string;
  status?: number;
  commercialStatus?: number;
  isAggregationEnabled?: boolean;
  isNormalizationEnabled?: boolean;
}

export interface IBusinessareaRelationships {
  instance?: JSONAPIToOneRelationshipObject;
  responsible?: JSONAPIToOneRelationshipObject;
  submodels?: JSONAPIToManyRelationshipObject;
  importschemes?: JSONAPIToManyRelationshipObject;
  humanresource?: JSONAPIToOneRelationshipObject;
}

export interface IBusinessarea extends JSONAPIResourceObject {
  attributes?: IBusinessareaAttributes;
  relationships?: IBusinessareaRelationships;
}

export interface IBusinessareaCreate extends IBusinessareaAttributes {
  name: string;
}
