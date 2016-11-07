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
import { INodeStructure, INodeStructureCreate } from '../models/node-structure.model';

@Injectable()
export class API {

    constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

    }

    public get instances() {
        return new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
    }

    instance(id: number) {
        let apiService = this.apiService;
        return {
            businessareas: <{create: (data: any) =>  Observable<JSONAPIResponse<IBusinessarea>>}>new class {
                public create(data: any) {
                    return new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, apiService).create(data);
                }
            }
        };
    }

    public get businessareas() {
        return new JSONAPIResourceService<IBusinessarea>('businessareas', '/businessareas', this.apiService);
    }

    public businessarea(id: number) {
        let apiService = this.apiService;
        return {
            submodels: <{findAll: () =>  Observable<JSONAPIResponse<IModel[]>>, create: (data: any) =>  Observable<JSONAPIResponse<IModel>>}>new class {
                public findAll() {
                    return new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, apiService).findAll();
                }

                public create(data: any) {
                    return new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, apiService).create(data);
                }
            },
            models: <{findAll: (data: any) =>  Observable<JSONAPIResponse<IModel[]>>}>new class {
                public findAll() {
                    return new JSONAPIResourceService<IModel>('models', `businessareas/${id}/models`, apiService).findAll()
                }
            }
        };
    }

    public get models() {
        return new ModelService(this.apiService);
    }

    public model(id: number) {
        let apiService = this.apiService;
        return {
            submodels: <{findAll: () =>  Observable<JSONAPIResponse<IModel[]>>, create: (data: any) =>  Observable<JSONAPIResponse<IModel>>}>new class {
                public findAll() {
                    return new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService).findAll();
                }

                public create(data: any) {
                    return new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService).create(data);
                }
            },
            nodeStructures: <{findAll: () =>  Observable<JSONAPIResponse<INodeStructure[]>>, create: (data: INodeStructureCreate) =>  Observable<JSONAPIResponse<INodeStructure>>}>new class {
                public findAll() {
                    return new JSONAPIResourceService<INodeStructure[]>('nodestructures', `models/${id}/nodestructures`, apiService).findAll();
                }

                public create(data: INodeStructureCreate) {
                    new JSONAPIResourceService<INodeStructure>('nodestructures', `models/${id}/nodestructures`, apiService).include(['nodedata']).create(data);
                }
            }
        };
    }

    public get notifications() {
        return new RepositoryMessagingService<Notification>('notifications', '/notifications', this.messagingApiService);
    }
}

export class ModelService extends JSONAPIResourceService<IModel> {
    constructor(private backendService: BackendService) {
        super('models', '/models', backendService)
    }

    public get favorites(): {findAll: () =>  Observable<JSONAPIResponse<IModel[]>>} {
        let apiService = this.apiService;
        return new class {
            public findAll() {
                return new JSONAPIResourceService<IModel>(`/models/favorites`, 'models', apiService).findAll();
            }
        };
    }
}
