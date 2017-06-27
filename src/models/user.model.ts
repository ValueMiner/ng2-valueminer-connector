import { JSONAPIResourceObject } from '../jsonapi';

export interface IUser extends JSONAPIResourceObject {
  attributes?: IUserAttributes;
  links?: IUserLinks;
}

export interface IUserAttributes {
  name?: string;
  is_superuser?: boolean;
}

export interface IUserLinks {
  self?: string;
}
