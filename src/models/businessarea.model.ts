import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IBusinessareaAttributes {
    name?: string;
}

export interface IBusinessareaRelationships {
    instance_id?: number;
    responsible_id?: number;
}

export interface IBusinessarea extends JSONAPIResourceObject {
    attributes?: IBusinessareaAttributes;
    relationships?: IBusinessareaRelationships;
}

export interface IBusinessareaCreate extends IBusinessareaAttributes {
    name: string;
}

