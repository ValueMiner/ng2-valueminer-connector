import { JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';
import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INodeStructureAttributes {
    positionX?: number;
    level?: number;
    readonly isSidestep?: boolean;
}

export interface INodeStructureRelationships {
    nodedata?: JSONAPIToOneRelationshipObject;
    model?: JSONAPIToOneRelationshipObject;
}

export interface INodeStructure extends JSONAPIResourceObject {
    attributes?: INodeStructureAttributes;
    relationships?: INodeStructureRelationships;
}

export interface INodeStructureCreate extends INodeStructureAttributes {
    positionX: number;
    level: number;
}
