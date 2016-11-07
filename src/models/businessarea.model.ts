import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IBusinessareaAttributes {
    name?: string;
}

export interface IBusinessareaRelationships {
    instance?: JSONAPIRelationshipObject;
    responsible?: JSONAPIRelationshipObject;
}

export interface IBusinessarea extends JSONAPIResourceObject {
    attributes?: IBusinessareaAttributes;
    relationships?: IBusinessareaRelationships;
}

export interface IBusinessareaCreate extends IBusinessareaAttributes {
    name: string;
}

