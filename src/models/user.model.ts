import { JSONAPIResourceObject } from '../jsonapi';

export interface IUserData extends JSONAPIResourceObject {
  type: string;
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
