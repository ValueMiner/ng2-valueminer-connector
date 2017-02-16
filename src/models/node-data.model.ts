import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface INodeDataAttributes {
    name?: string;
    reference?: string;
    crossReference?: string;
    description?: string;
    documentUri?: string;
    status?: number;
    responsibleId?: number;
    targetDate?: string;
    businessBenefit?: number;
    commercialStatus?: number;
    complexity?: number;
    size?: number;
    uncertainty?: number;
    risk?: number;
    budgetActual?: number;
    budgetRemaining?: number;
    benefitBudget?: number;
    benefitActual?: number;
    benefitRemaining?: number;
    costBudget?: number;
    costActual?: number;
    costRemaining?: number;
    investBudget?: number;
    investActual?: number;
    investRemaining?: number;
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
