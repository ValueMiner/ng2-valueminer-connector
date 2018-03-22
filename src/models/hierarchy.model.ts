import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface IHierarchyAttributes {
  id?: string;
  name?: string;
  children?: IHierarchyAttributes | null;
}

export interface IHierarchy extends JSONAPIResourceObject {
  attributes?: IHierarchyAttributes;
}
