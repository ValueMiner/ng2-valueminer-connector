import { JSONAPIResourceObject, JSONAPIToManyRelationshipObject } from '../jsonapi';

export interface INodeDataAttributes {
  name?: string;
  reference?: string;
  crossReference?: string;
  description?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  description4?: string;
  documentUri?: string;
  status?: number;
  responsibleId?: number;
  targetDate?: string;
  actualDate?: string;
  businessBenefit?: number;
  commercialStatus?: number;
  complexity?: number;
  uncertainty?: number;
  risk?: number;
  sizeType?: number;
  budget?: number;
  budgetActual?: number;
  budgetRemaining?: number;
  budgetCalculated?: number;
  benefitBudget?: number;
  benefitActual?: number;
  benefitRemaining?: number;
  costBudget?: number;
  costActual?: number;
  costRemaining?: number;
  investBudget?: number;
  investActual?: number;
  investRemaining?: number;
  updatedAt?: number;
}

export interface INodeDataRelationships {
  models?: JSONAPIToManyRelationshipObject;
  nodestructures?: JSONAPIToManyRelationshipObject;
}

export interface INodeData extends JSONAPIResourceObject {
  attributes?: INodeDataAttributes;
  relationships?: INodeDataRelationships;
}

export interface INodeDataCreate extends INodeDataAttributes {
  name: string;
}
