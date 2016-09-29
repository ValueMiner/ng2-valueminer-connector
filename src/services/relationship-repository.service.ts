import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';
import {RepositoryService} from './repository.service';

export class RelationshipRepositoryService<T> {

    constructor(private config: RelationshipLinkConfig, private apiService: BackendService) {

    }

    public all(): Observable<T[]> {
        let path = RelationshipRepositoryService.resolveResourcePath(this.config);
        return this.apiService.get(path)
            .map((response: any) => response.data.map((entry: any) => RepositoryService.parseJSONAPIResourceObject<T>(entry)));
    }

    public add(id: number) {
        const path = RelationshipRepositoryService.resolveRelationshipPath(this.config);
        const payload = RelationshipRepositoryService.buildJSONAPIRelationshipObject(this.config.result_type, id);
        return this.apiService.post(path, payload);
    }

    public remove(id: number): Observable<T> {
        const path = RelationshipRepositoryService.resolveRelationshipPath(this.config);
        const payload = RelationshipRepositoryService.buildJSONAPIRelationshipObject(this.config.result_type, id);
        return this.apiService.remove(path, payload);
    }

    private static resolveResourcePath(config: RelationshipLinkConfig) {
        const path = [config.basePath, config.relationship_name];
        return BackendService.pathJoin(path);
    }

    private static resolveRelationshipPath(config: RelationshipLinkConfig) {
        const path = [config.basePath, 'relationships', config.relationship_name];
        return BackendService.pathJoin(path);
    }

    private static buildJSONAPIRelationshipObject(type: string, id: number) {
        let resource = <JSONAPIRelationshipObject>{
            type: type,
            id: id
        };
        return {data: resource};
    }
}

export interface RelationshipLinkConfig {
    basePath: string;
    relationship_name: string;
    result_type: string;
}

export interface JSONAPIRelationshipObject {
    type: string;
    id: number;
}
