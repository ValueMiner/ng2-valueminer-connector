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
    public instances = new JSONAPIResourceService<IInstance>('instances', '/instances', this.apiService);
    public businessareas = new JSONAPIResourceService<IBusinessarea>('businessareas', '/businessareas', this.apiService);
    public models = new JSONAPIResourceService<IModel>('models', '/models', this.apiService);
    public notifications = new RepositoryMessagingService<Notification>('notifications', '/notifications', this.messagingApiService);

    constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

    }

    instance(id: number) {
        let me = this;
        return {
            businessareas: {
                create: new JSONAPIResourceService<IBusinessarea>('businessareas', `instances/${id}/businessareas`, me.apiService).create
            }
        };
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

    public model(id: number) {
        let me = this;
        return {
            submodels: {
                create: new JSONAPIResourceService<IModel>('models', `models/${id}/submodels`, me.apiService).create
            },
            relationships: {
                favorites: new JSONAPIRelationshipService(`/models/${id}/favorites`, 'models', me.apiService)
            }
        };
    }
}
