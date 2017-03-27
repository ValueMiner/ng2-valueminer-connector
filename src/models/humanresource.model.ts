import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface IHumanResourceAttributes {
    id?: number;
    email?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    color?: string;
    can_login?: boolean;
}

export interface IHumanResource extends JSONAPIResourceObject {
    attributes?: IHumanResourceAttributes;
}
