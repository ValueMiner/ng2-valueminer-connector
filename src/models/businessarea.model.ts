import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IBusinessareaFields {
    name?: string;
}

export interface IBusinessarea extends JSONAPIResourceObject {
    attributes?: IBusinessareaFields;
    relationships?: {
        instance_id?: number;
        responsible_id?: number;
    };
}

export interface IBusinessareaCreate extends IBusinessareaFields {
    name: string;
}

