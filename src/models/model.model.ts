import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IModelAttributes {
    name?: string;
    color?: string;
}

export interface IModelRelationships {
    submodels?: JSONAPIRelationshipObject;
    responsible?: JSONAPIRelationshipObject;
}

export interface IModel extends JSONAPIResourceObject {
    attributes?: IModelAttributes;
    relationships?: IModelRelationships;
}

export interface IModelCreate extends IModelAttributes {
    name: string;
}
