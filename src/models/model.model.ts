import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IModelFields {
    name?: string;
    color?: string;
}

export interface IModel extends JSONAPIResourceObject {
    attributes?: IModelFields;
    relationships?: {
        submodel_ids?: number[];
        responsible_id?: number;
    };
}

export interface IModelCreate extends IModelFields {
    name: string;
}
