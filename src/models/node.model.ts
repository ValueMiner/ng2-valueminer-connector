import { JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';
import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INodeAttributes {
  type?: string;
  name?: string;
  positionX?: number;
  level?: number;
  updatedAt?: number;
}

export interface INode extends JSONAPIResourceObject {
  attributes?: INodeAttributes;
}

export interface INodeCreate extends INodeAttributes {
  type: string;
  name: string;
  positionX: number;
  level: number;
}
