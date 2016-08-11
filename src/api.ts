import {RepositoryService} from './services/repository.service';
import {APIService} from './services/api.service';
import {Instance} from './models/instance';
import {Businessarea} from './models/businessarea';
import {Model} from './models/model';
export class API {
    public instances = new RepositoryService<Instance>(this.apiService);

    private nodeServiceFactory(ids: Array<[string, number]>) {

    }

    constructor(private apiService: APIService) {

    }

    instance(id: number) {
        return this.businessareaServiceFactory([['instanceId', id]]);
    }

    private businessareaServiceFactory(ids: Array<[string, number]>) {
        let service = this;
        return {
            businessareas: new RepositoryService<Businessarea>(this.apiService)
                .for(`/instances/${ids['instanceId']}/businessareas`),
            businessarea: function (id: number) {
                ids.push(['businessareaId', id]);
                return service.modelServiceFactory(ids);
            }
        };
    }

    private modelServiceFactory(ids: Array<[string, number]>) {
        let service = this;
        return {
            models: new RepositoryService<Model>(this.apiService)
                .for(`/instances/${ids['instanceId']}/businessareas/${ids['businessareaId']}/models`),
            model: function (id: number) {
                ids.push(['modelId', id]);
                return service.nodeServiceFactory(ids);
            }
        };
    };
}

