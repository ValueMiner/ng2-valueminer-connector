import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';
import { JSONAPIToOneRelationshipObject } from '../jsonapi/jsonapi-relationships-object.model';

export interface IActivityRelationships {
  instances?: JSONAPIToOneRelationshipObject;
  nodedata?: JSONAPIToOneRelationshipObject;
  humanresources?: JSONAPIToOneRelationshipObject;
}

export interface IActivityAttributes {
  id?: number;
  name?: string;
  description?: string;
  start?: string;
  end?: string;
  startActual?: string;
  endActual?: string;
  reference?: string;
  crossReference?: string;
  type?: number;
  status?: number;
  responsible?: any;
  percentageComplete?: number;
  priority?: number;
  milestone?: number;
  budget?: number;
  budgetPlan?: number;
  benefitBudget?: number;
  benefitActual?: number;
  benefitRemaining?: number;
  costBudget?: number;
  costActual?: number;
  costRemaining?: number;
  investBudget?: number;
  investActual?: number;
  investRemaining?: number;
  riskProfileCategory?: number;
  riskProfileAssessment?: number;
  riskProfileCountermeasures?: string;
}

export interface IActivity extends JSONAPIResourceObject {
  attributes?: IActivityAttributes;
  relationships?: IActivityRelationships;
}
