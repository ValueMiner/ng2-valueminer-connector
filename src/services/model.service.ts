import {RepositoryService} from './repository.service';
import {Model} from '../models/model';
import {RelationshipRepositoryService} from './relationship-repository.service';
export class ModelService extends RepositoryService<Model> {

    public favorites = new RelationshipRepositoryService({
        basePath: this.basePath,
        relationship_name: 'favorites',
        result_type: this.type
    }, this.apiService);
}
