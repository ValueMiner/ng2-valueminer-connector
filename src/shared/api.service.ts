import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { IBusinessarea } from '../models/businessarea.model';
import { IInstance } from '../models/instance.model';
import { IModel } from '../models/model.model';
import { Notification } from '../models/notification.model';
import { BackendMessagingService } from './backend-messaging.service';
import { RepositoryMessagingService } from './repository.messaging.service';
import { Observable } from 'rxjs';
import { JSONAPIResponse } from '../jsonapi/jsonapi-response.model';
import { INodeStructure } from '../models/node-structure.model';
import { IRelationship } from '../models/relationship.model';
import { IAPIFindAllCreate, IAPIFindAll } from './api.model';
import {ISubset} from "../models/subset.model";
import {INodeCreate} from "../models/node.model";

@Injectable()
export class API {

    constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

    }

    public get instances() {
        return new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
    }

    instance(id: number) {
        const apiService = this.apiService;
        return <{ businessareas: IAPIFindAllCreate<IBusinessarea> }> new class {
            public businessareas = <IAPIFindAllCreate<IBusinessarea>> new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, apiService);
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
        };
    }

    public get models() {
        return new ModelService(this.apiService);
    }

    public model(id: number) {
        const apiService = this.apiService;
        return <{ submodels: IAPIFindAllCreate<IModel>, subsets: IAPIFindAllCreate<ISubset>, nodes: IAPIFindAllCreate<INodeCreate>, nodestructures: IAPIFindAllCreate<INodeStructure>, relationships: IAPIFindAllCreate<IRelationship> }> new class {
            public submodels = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService);
            public subsets = <IAPIFindAllCreate<IModel>> new JSONAPIResourceService<IModel>('subsets', `models/${id}/subsets`, apiService);
            public nodes = <IAPIFindAllCreate<INodeCreate>> new JSONAPIResourceService<INodeCreate>('nodes', `models/${id}/nodes`, apiService);
            public nodestructures = <IAPIFindAllCreate<INodeStructure>> new JSONAPIResourceService<INodeStructure>('nodestructures', `models/${id}/nodestructures`, apiService);
            public relationships = <IAPIFindAllCreate<IRelationship>> new JSONAPIResourceService<IRelationship>('nodestructures', `models/${id}/relationships`, apiService);
        };
    }

    public get relationships() {
        return new JSONAPIResourceService<IRelationship>('relationships', '/relationships', this.apiService);
    }

    public get nodestructures() {
        return new JSONAPIResourceService<INodeStructure>('nodestructures', '/nodestructures', this.apiService);
    }

    public get notifications() {
        return new RepositoryMessagingService<Notification>('notifications', '/notifications', this.messagingApiService);
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
