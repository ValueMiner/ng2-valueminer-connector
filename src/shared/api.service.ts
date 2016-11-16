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
import { IRelationship, IRelationshipCreate } from '../models/relationship.model';

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
                private service = new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, apiService);

                public create(data: any) {
                    return this.service.create(data);
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
                private service = new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, apiService);

                public findAll() {
                    return this.service.findAll();
                }

                public create(data: any) {
                    return this.service.create(data);
                }
            },
            models: <{findAll: (data: any) =>  Observable<JSONAPIResponse<IModel[]>>}>new class {
                private service = new JSONAPIResourceService<IModel>('models', `businessareas/${id}/models`, apiService);

                public findAll() {
                    return this.service.findAll()
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
                private service = new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, apiService);

                public findAll() {
                    return this.service.findAll();
                }

                public create(data: any) {
                    return this.service.create(data);
                }
            },
            nodeStructures: <{include: (include: string[]) => NodeStructureService, findAll: () =>  Observable<JSONAPIResponse<INodeStructure[]>>, create: (data: INodeStructureCreate) =>  Observable<JSONAPIResponse<INodeStructure>>}> new NodeStructureService(apiService, `models/${id}/nodestructures`),
            relationships: <{findAll: () =>  Observable<JSONAPIResponse<IRelationship[]>>, create: (data: IRelationshipCreate) =>  Observable<JSONAPIResponse<IRelationship>>}>new class {
                private service = new JSONAPIResourceService<IRelationship>('nodestructures', `models/${id}/relationships`, apiService);

                public findAll() {
                    return this.service.findAll();
                }

                public create(data: IRelationshipCreate) {
                    return this.service.create(data);
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
                return new JSONAPIResourceService<IModel>('models', '/models/favorites', apiService).findAll();
            }
        };
    }
}

export class NodeStructureService {
    private service: JSONAPIResourceService<INodeStructure>;

    constructor(private backendService: BackendService, path: string) {
        this.service = new JSONAPIResourceService<INodeStructure>('nodestructures', path, backendService);
    }

    public include(include: string[]) {
        this.service = this.service.include(include);
        return this;
    }

    public findAll() {
        return this.service.findAll();
    }

    public create(data: INodeStructureCreate) {
        return this.service.create(data);
    }
}
