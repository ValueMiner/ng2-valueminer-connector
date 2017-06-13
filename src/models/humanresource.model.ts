import { JSONAPIResourceObject, JSONAPIToOneRelationshipObject } from '../jsonapi';

export interface IHumanResourceAttributes {
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  color?: string;
  can_login?: boolean;
  foreign_id?: number;
}

export interface IHumanResourceRelationships {
  instance?: JSONAPIToOneRelationshipObject;
}

export interface IHumanResource extends JSONAPIResourceObject {
  attributes?: IHumanResourceAttributes;
  relationships?: IHumanResourceRelationships;
}
