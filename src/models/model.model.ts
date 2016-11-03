import { JSONAPIResourceObject } from '../services/jsonapi-resource.service';

export interface IModelAttributes {
    name?: string;
    color?: string;
}

export interface IModelRelationships {
    submodel_ids?: number[];
    responsible_id?: number;
}

export interface IModel extends JSONAPIResourceObject {
    attributes?: IModelAttributes;
    relationships?: IModelRelationships;
}

export interface IModelCreate extends IModelAttributes {
    name: string;
}
