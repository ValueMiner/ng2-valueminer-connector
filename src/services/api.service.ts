import { RepositoryService } from './repository.service';
import { RepositoryMessagingService } from './repository.messaging.service';
import { BackendService } from './backend.service';
import { BackendMessagingService } from './backend.messaging.service';
import { Instance } from '../models/instance';
import { Businessarea } from '../models/businessarea';
import { Model } from '../models/model';
import { Relationship } from '../models/relationship';
import { Notification } from '../models/notification';
import { Injectable } from '@angular/core';
import {ModelService} from './model.service';

@Injectable()
export class API {
    public instances = new RepositoryService<Instance>('instances', '/instances', this.apiService);
    public businessareas = new RepositoryService<Businessarea>('businessareas', '/businessareas', this.apiService);
    public models = new ModelService('models', '/models', this.apiService);
    public notifications = new RepositoryMessagingService<Notification>('notifications', '/notifications', this. messagingApiService);

    constructor(private apiService: BackendService, private messagingApiService: BackendMessagingService) {

    }

    instance(id: number) {
        return {
            businessareas: new RepositoryService<Businessarea>('businessareas', `/instances/${id}/businessareas`, this.apiService)
        };
    }

    public businessarea(id: number) {
        return {
            models: new RepositoryService<Model>('models', `/businessareas/${id}/models`, this.apiService),
            submodels: new RepositoryService<Model>('models', `/businessareas/${id}/submodels`, this.apiService)
        };
    }

    public model(id: number) {
        return {
            submodels: new RepositoryService<Model>('models', `/models/${id}/submodels`, this.apiService),
            nodes: new RepositoryService<Node>('nodes', `/models/${id}/nodes`, this.apiService),
            relationships: new RepositoryService<Relationship>('relationships', `$/models/${id}/relationships`, this.apiService)
        };
    }

}

