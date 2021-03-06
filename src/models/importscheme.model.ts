import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IImportSchemeAttributes {
  id?: number;
  name?: string;
  reference?: string;
  crossReference?: string;
  description?: string;
  documentUri?: string;
  status?: string;
  responsibleId?: string;
  targetDate?: string;
  businessBenefit?: string;
  commercialStatus?: string;
  complexity?: string;
  uncertainty?: string;
  risk?: string;
  sizeType?: string;
  budget?: string;
  budgetCalculated?: string;
  budgetActual?: string;
  budgetRemaining?: string;
  benefitBudget?: string;
  benefitActual?: string;
  benefitRemaining?: string;
  costBudget?: string;
  costActual?: string;
  costRemaining?: string;
  investBudget?: string;
  investActual?: string;
  investRemaining?: string;
  importName?: string;
  actualDate?: string;
  aggregationKPI?: string;
  KPI?: string;
  updatedAt?: number;
}

export interface IImportScheme extends JSONAPIResourceObject {
  attributes?: IImportSchemeAttributes;
  relationships?: IImportSchemeRelationships;
}

export interface IImportSchemeRelationships {
  businessarea?: JSONAPIToOneRelationshipObject;
}

export interface IImportSchemeCreate extends IImportSchemeAttributes {
  importName: string;
}
