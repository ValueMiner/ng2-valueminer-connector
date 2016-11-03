import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { JSONAPIRelationshipService } from './jsonapi-relationship.service';
import { JSONAPIResourceService } from './jsonapi-resource.service';
import { IBusinessarea } from '../models/businessarea.model';
import { IInstance } from '../models/instance.model';
import { IModel } from '../models/model.model';
import { Notification } from '../models/notification.model';
import { BackendMessagingService } from './backend-messaging.service';
import { RepositoryMessagingService } from './repository.messaging.service';

// Needed by typescript although not referenced
import { Observable } from 'rxjs';

@Injectable()
export class API {

    constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

    }

    public get instances() {
        return new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
    }

    instance(id: number) {
        let me = this;
        return {
            businessareas: {
                create: new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, me.apiService).create
            }
        };
    }

    public get businessareas() {
        return new JSONAPIResourceService<IBusinessarea>('businessareas', '/businessareas', this.apiService);
    }

    public businessarea(id: number) {
        let me = this;
        return {
            submodels: {
                create: new JSONAPIResourceService<IModel>('models', `businessareas/${id}/submodels`, me.apiService).create
            },
            models: {
                findAll: new JSONAPIResourceService<IModel>('models', `businessareas/${id}/models`, me.apiService).findAll
            }
        };
    }

    public get models() {
        return new ModelService(this.apiService);
    }

    public model(id: number) {
        let me = this;
        return {
            submodels: {
                create: new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, me.apiService).create
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

    public get favorites() {
        return {
            findAll: new JSONAPIResourceService<IModel>(`/models/favorites`, 'models', this.backendService).findAll
        };
    }
}
