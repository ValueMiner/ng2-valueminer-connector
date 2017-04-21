import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToManyRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IInstanceAttributes {
  name?: string;
}

export interface IInstanceRelationships {
  humanResources?: JSONAPIToManyRelationshipObject;
  businessareas?: JSONAPIToManyRelationshipObject;
}

export interface IInstance extends JSONAPIResourceObject {
  attributes?: IInstanceAttributes;
  relationships?: IInstanceRelationships;
}

export interface IInstanceCreate extends IInstanceAttributes {
  name: string;
}
