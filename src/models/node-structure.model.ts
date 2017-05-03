import {
  JSONAPIToOneRelationshipObject,
  JSONAPIToManyRelationshipObject,
  JSONAPIResourceObject
} from '../jsonapi';

export interface INodeStructureAttributes {
  positionX?: number;
  level?: number;
  readonly isSidestep?: boolean;
  readonly updatedAt?: number;
}

export interface INodeStructureRelationships {
  nodedata?: JSONAPIToOneRelationshipObject;
  original?: JSONAPIToOneRelationshipObject;
  model?: JSONAPIToOneRelationshipObject;
  sidesteps?: JSONAPIToManyRelationshipObject;
}

export interface INodeStructure extends JSONAPIResourceObject {
  attributes?: INodeStructureAttributes;
  relationships?: INodeStructureRelationships;
}

export interface INodeStructureCreate extends INodeStructureAttributes {
  positionX: number;
  level: number;
}
