import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { IBusinessarea } from '../models/businessarea.model';
import { IInstance } from '../models/instance.model';
import { IModel } from '../models/model.model';
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
import { IUser } from '../models/user.model';
import { JSONAPIUserService } from '../jsonapi/jsonapi-user.service';
import { IGroup } from '../models/group.model';
import { ITemplate } from '../models/template.model';
import { IVersion } from '../models/version.model';
import {IHierarchy} from "../models/hierarchy.model";
import {JSONAPIRelationshipService} from "../jsonapi";

@Injectable()
export class API {

  constructor(private apiService: BackendService) {}

  public get instances() {
    return new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
  }

  instance(id: number) {
    const apiService = this.apiService;
    return <{ businessareas: IAPIFindAllCreate<IBusinessarea>, humanresources: IAPIFindAllCreate<IHumanResource>, activities: IAPIFindAllCreate<IActivity>, groups: IAPIFindAllCreate<IGroup> }> new class {
      public businessareas = <IAPIFindAllCreate<IBusinessarea>> new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, apiService);
      public humanresources = <IAPIFindAllCreate<IHumanResource>> new JSONAPIResourceService<IHumanResource>('humanresources', `instances/${id}/humanresources`, apiService);
      public activities = <IAPIFindAllCreate<IActivity>> new JSONAPIResourceService<IActivity>('activities', `instances/${id}/activities`, apiService);
      public groups = <IAPIFindAllCreate<IGroup>> new JSONAPIResourceService<IGroup>('groups', `instances/${id}/groups`, apiService);
    };
  }

  public get businessareas() {
    return new JSONAPIResourceService<IBusinessarea>('businessareas', '/businessareas', this.apiService);
  }

  public businessarea(id: number) {
    const apiService = this.apiService;
    return <{ submodels: IAPIFindAllCreate<IModel>, models: IAPIFindAll<IModel>, importschemes: IAPIFindAllCreate<IImportScheme> }> new class {
      public submodels = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, apiService);
      public models = <IAPIFindAll<IModel>> new JSONAPIResourceService<IModel>('models', `businessareas/${id}/models`, apiService);
      public importschemes = <IAPIFindAllCreate<IImportScheme>> new JSONAPIResourceService<IImportScheme>('importschemes', `businessareas/${id}/importschemes`, apiService);
    };
  }

  public get models() {
    return new ModelService(this.apiService);
  }

  public model(id: number) {
    const apiService = this.apiService;
    return <{
      submodels: IAPIFindAllCreate<IModel>,
      subsets: IAPIFindAllCreate<ISubset>,
      nodes: IAPIFindAllCreate<INode>,
      nodestructures: IAPIFindAllCreate<INodeStructure>,
      relationships: IAPIFindAllCreate<IRelationship>,
      versions: IAPIFindAllCreate<IVersion>
      activities: IAPIFindAll<IActivity> }> new class {

      public versions = <IAPIFindAllCreate<IVersion>> new JSONAPIResourceService<IVersion>('versions', `models/${id}/versions`, apiService);
      public submodels = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService);
      public subsets = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('subsets', `models/${id}/subsets`, apiService);
      public nodes = <IAPIFindAllCreate<INode>> new JSONAPIResourceService<INode>('nodes', `models/${id}/nodes`, apiService);
      public nodestructures = <IAPIFindAllCreate<INodeStructure>> new JSONAPIResourceService<INodeStructure>('nodestructures', `models/${id}/nodestructures`, apiService);
      public relationships = <IAPIFindAllCreate<IRelationship>> new JSONAPIResourceService<IRelationship>('nodestructures', `models/${id}/relationships`, apiService);
      public activities = <IAPIFindAll<IActivity>> new JSONAPIResourceService<IActivity>('activities', `models/${id}/activities`, apiService);
    };
  }

  public nodedatum(id: number) {
    const apiService = this.apiService;
    return <{ activities: IAPIFindAllCreate<IActivity> }> new class {
      public activities = <IAPIFindAllCreate<IActivity>> new JSONAPIResourceService<IActivity>('activities', `nodedata/${id}/activities`, apiService);
    };
  }

  public get hierarchy() {
    return new JSONAPIResourceService<IHierarchy>('hierarchy', '/hierarchy', this.apiService);
  }

  public get versions() {
    return new JSONAPIResourceService<IVersion>('versions', '/versions', this.apiService);
  }

  public get subsets() {
    return new JSONAPIResourceService<ISubset>('subsets', '/subsets', this.apiService);
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

  public get activities() {
    return new JSONAPIResourceService<IRelationship>('activities', '/activities', this.apiService);
  }

  public get humanresources() {
    return new JSONAPIResourceService<IRelationship>('humanresources', '/humanresources', this.apiService);
  }

  public get importschemes() {
    return new JSONAPIResourceService<IImportScheme>('importschemes', '/importschemes', this.apiService);
  }

  public get templates() {
    return new JSONAPIResourceService<ITemplate>('templates', '/templates', this.apiService);
  }

  public get me() {
    return new JSONAPIUserService<IUser>('user', '/me', this.apiService);
  }

  public get groups() {
    return new JSONAPIResourceService<IGroup>('groups', '/groups', this.apiService);
  }
}

export class ModelService extends JSONAPIResourceService<IModel> {

  public constructor (private backendService: BackendService) {
    super('models', '/models', backendService);
  }

  public get favorites(): {
    all: () =>  Observable<any>,
    add: (id: string) =>  Observable<any>,
    remove: (id: string) =>  Observable<any>
  } {
    const apiService = this.apiService;
    return new class {

      public all() {
        return new JSONAPIRelationshipService('models/relationships/favorites', 'models', apiService).all();
      }

      public add(id: string) {
        return new JSONAPIRelationshipService('models/relationships/favorites', 'models', apiService).add(id);
      }

      public remove(id: string) {
        return new JSONAPIRelationshipService('models/relationships/favorites', 'models', apiService).remove(id);
      }

    };
  }
}
