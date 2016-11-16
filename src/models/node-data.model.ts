import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INodeDataAttributes {
    name?: string;
}

export interface INodeDataRelationships {

}

export interface INodeData extends JSONAPIResourceObject {
    attributes?: INodeDataAttributes;
    relationships?: INodeDataRelationships;
}

export interface INodeDataCreate extends INodeDataAttributes {
    name: string;
}
