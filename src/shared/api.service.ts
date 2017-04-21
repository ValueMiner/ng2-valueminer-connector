import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { IBusinessarea } from '../models/businessarea.model';
import { IInstance } from '../models/instance.model';
import { IModel } from '../models/model.model';
import { Notification } from '../models/notification.model';
import { BackendMessagingService } from './backend-messaging.service';
import { RepositoryMessagingService } from './repository.messaging.service';
import { Observable } from 'rxjs/Observable';
import { JSONAPIResponse } from '../jsonapi/jsonapi-response.model';
import { INodeStructure } from '../models/node-structure.model';
import { IRelationship } from '../models/relationship.model';
import { IAPIFindAllCreate, IAPIFindAll } from './api.model';
import { ISubset } from '../models/subset.model';
import { INode } from '../models/node.model';
import { IActivity } from '../models/activity.model';
import { IHumanResource } from '../models/humanresource.model';
import { INodeData } from '../models/node-data.model';
import { IImportScheme } from '../models/importscheme.model';

@Injectable()
export class API {

  constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

  }

  public get instances() {
    return new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
  }

  instance(id: number) {
    const apiService = this.apiService;
    return <{ businessareas: IAPIFindAllCreate<IBusinessarea>, humanresources: IAPIFindAllCreate<IHumanResource>, activities: IAPIFindAllCreate<IActivity> }> new class {
      public businessareas = <IAPIFindAllCreate<IBusinessarea>> new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, apiService);
      public humanresources = <IAPIFindAllCreate<IHumanResource>> new JSONAPIResourceService<IHumanResource>('humanresources', `instances/${id}/humanresources`, apiService);
      public activities = <IAPIFindAllCreate<IActivity>> new JSONAPIResourceService<IActivity>('activities', `instances/${id}/activities`, apiService);
    };
  }

  public get businessareas() {
    return new JSONAPIResourceService<IBusinessarea>('businessareas', '/businessareas', this.apiService);
  }

  public businessarea(id: number) {
    const apiService = this.apiService;
    return <{ submodels: IAPIFindAllCreate<IModel>, models: IAPIFindAll<IModel> }> new class {
      public submodels = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, apiService);
      public models = <IAPIFindAll<IModel>> new JSONAPIResourceService<IModel>('models', `businessareas/${id}/models`, apiService);
      public importschemes = <IAPIFindAll<IImportScheme>> new JSONAPIResourceService<IImportScheme>('importschemes', `businessareas/${id}/importschemes`, apiService);
    };
  }

  public get models() {
    return new ModelService(this.apiService);
  }

  public model(id: number) {
    const apiService = this.apiService;
    return <{ submodels: IAPIFindAllCreate<IModel>,
              subsets: IAPIFindAllCreate<ISubset>,
              nodes: IAPIFindAllCreate<INode>,
              nodestructures: IAPIFindAllCreate<INodeStructure>,
              relationships: IAPIFindAllCreate<IRelationship>,
              activities: IAPIFindAll<IActivity> }> new class {
      public submodels = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService);
      public subsets = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('subsets', `models/${id}/subsets`, apiService);
      public nodes = <IAPIFindAllCreate<INode>> new JSONAPIResourceService<INode>('nodes', `models/${id}/nodes`, apiService);
      public nodestructures = <IAPIFindAllCreate<INodeStructure>> new JSONAPIResourceService<INodeStructure>('nodestructures', `models/${id}/nodestructures`, apiService);
      public relationships = <IAPIFindAllCreate<IRelationship>> new JSONAPIResourceService<IRelationship>('relationships', `models/${id}/relationships`, apiService);
      public activities = <IAPIFindAll<IActivity>> new JSONAPIResourceService<IActivity>('activities', `models/${id}/activities`, apiService);
    };
  }

  public nodedatum(id: number) {
    const apiService = this.apiService;
    return <{ activities: IAPIFindAllCreate<IActivity> }> new class {
      public activities = <IAPIFindAllCreate<IActivity>> new JSONAPIResourceService<IActivity>('activities', `nodedata/${id}/activities`, apiService);
    };
  }

  public get relationships() {
    return new JSONAPIResourceService<IRelationship>('relationships', '/relationships', this.apiService);
  }

  public get nodestructures() {
    return new JSONAPIResourceService<INodeStructure>('nodestructures', '/nodestructures', this.apiService);
  }

  public get nodedata() {
    return new JSONAPIResourceService<INodeData>('nodedata', '/nodedata', this.apiService);
  }

  public get notifications() {
    return new RepositoryMessagingService<Notification>('notifications', '/notifications', this.messagingApiService);
  }

  public get activities() {
    return new JSONAPIResourceService<IRelationship>('activities', '/activities', this.apiService);
  }

  public get humanresources() {
    return new JSONAPIResourceService<IRelationship>('humanresources', '/humanresources', this.apiService);
  }

  public get importschemes() {
    return new JSONAPIResourceService<IImportScheme>('importschemes', '/importschemes', this.apiService);
  }
}

export class ModelService extends JSONAPIResourceService<IModel> {
  constructor(private backendService: BackendService) {
    super('models', '/models', backendService);
  }

  public get favorites(): {findAll: () =>  Observable<JSONAPIResponse<IModel[]>>} {
    const apiService = this.apiService;
    return new class {
      public findAll() {
        return new JSONAPIResourceService<IModel>('models', '/models/favorites', apiService).findAll();
      }
    };
  }
}
