export interface ISync {
  id?: string;
  instanceId?: number;
  businessareaId?: number;
  modelId?: number;
  clientUid?: string;
  clientId?: string;
  clientUri?: string;
  clientToken?: string;
  synced?: boolean;
  additionalData?: string;
  createdAt?: number;
  updatedAt?: number;
}
