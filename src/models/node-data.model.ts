import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INodeDataAttributes {
    name?: string;
}

export interface INodeDataRelationships {

}

export interface INodeStructure extends JSONAPIResourceObject {
    attributes?: INodeDataAttributes;
    relationships?: INodeDataRelationships;
}

export interface INodeStructureCreate extends INodeDataAttributes {
    name: string;
}
