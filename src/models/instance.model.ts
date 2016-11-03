import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IInstanceAttributes {
    name?: string;
}

export interface IInstanceRelationships {
    human_resource_ids?: number[];
}

export interface IInstance extends JSONAPIResourceObject {
    attributes?: IInstanceAttributes;
    relationships?: IInstanceRelationships;
}

export interface IInstanceCreate extends IInstanceAttributes {
    name: string;
}
