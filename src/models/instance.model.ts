import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IInstanceFields {
    name?: string;
}

export interface IInstance extends JSONAPIResourceObject {
    attributes?: IInstanceFields;
    relationships?: {
        human_resource_ids?: number[];
    };
}

export interface IInstanceCreate extends IInstanceFields {
    name: string;
}
