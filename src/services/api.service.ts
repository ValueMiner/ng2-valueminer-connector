import {RepositoryService} from './repository.service';
import {BackendService} from './backend.service';
import {Instance} from '../models/instance';
import {Businessarea} from '../models/businessarea';
import {Model} from '../models/model';
import {Relationship} from '../models/relationship';
import {Injectable} from '@angular/core';

@Injectable()
export class API {
    public instances = new RepositoryService<Instance>(this.apiService);

    constructor(private apiService: BackendService) {

    }

    instance(id: number) {
        return this.instanceNavigatorFactory([['instanceId', id]]);
    }

    private instanceNavigatorFactory(ids: Array<[string, number]>) {
        let service = this;
        return {
            businessareas: new RepositoryService<Businessarea>(this.apiService)
                .for(`/instances/${ids['instanceId']}/businessareas`),
            businessarea: function (id: number) {
                ids.push(['businessareaId', id]);
                return service.businessareaNavigatorFactory(ids);
            }
        };
    }

    private businessareaNavigatorFactory(ids: Array<[string, number]>) {
        let service = this;
        return {
            models: new RepositoryService<Model>(this.apiService)
                .for(`/instances/${ids['instanceId']}/businessareas/${ids['businessareaId']}/models`),
            model: function (id: number) {
                ids.push(['modelId', id]);
                return service.modelNavigatorFactory(ids);
            },
            submodels: new RepositoryService<Model>(this.apiService)
                .for(`/instances/${ids['instanceId']}/businessareas/${ids['businessareaId']}/submodels`)
        };
    };

    private modelNavigatorFactory(ids: Array<[string, number]>) {
        let prefix = `/instances/${ids['instanceId']}/businessareas/${ids['businessareaId']}/models/${ids['businessareaId']}`;
        return {
            submodels: new RepositoryService<Model>(this.apiService)
                .for(`${prefix}/submodels`),
            nodes: new RepositoryService<Node>(this.apiService)
                .for(`${prefix}/nodes`),
            relationships: new RepositoryService<Relationship>(this.apiService)
                .for(`${prefix}/relationships`),
        };
    }
}

