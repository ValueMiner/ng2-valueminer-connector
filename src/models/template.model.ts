import { JSONAPIResourceObject } from '../jsonapi';

export interface ITemplateAttributes {
  name?: string;
  language?: string;
  type?: string;
  settings?: any;
  nodes?: any;
  activities?: any;
  created_at?: number;
  updated_at?: number;
}

export interface ITemplate extends JSONAPIResourceObject {
  attributes?: ITemplateAttributes;
}
