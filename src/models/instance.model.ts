import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IInstanceAttributes {
    name?: string;
}

export interface IInstanceRelationships {
    human_resource_ids?: JSONAPIRelationshipObject;
}

export interface IInstance extends JSONAPIResourceObject {
    attributes?: IInstanceAttributes;
    relationships?: IInstanceRelationships;
}

export interface IInstanceCreate extends IInstanceAttributes {
    name: string;
}
