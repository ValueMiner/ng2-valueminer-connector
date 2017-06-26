import { JSONAPIResourceObject, JSONAPIToOneRelationshipObject } from '../jsonapi';

export interface IUserModel extends JSONAPIResourceObject {
  data: IUserData;
}

export interface IUserData {
  type?: string;
  id?: string;
  attributes?: IUserDataAttributes;
  links?: IUserDataLinks;
}

export interface IUserDataAttributes {
  name?: string;
  is_superuser?: boolean;
}

export interface IUserDataLinks {
  self?: string;
}
