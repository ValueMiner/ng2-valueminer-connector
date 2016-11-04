import { BackendMessagingService } from './backend-messaging.service';
import { Observable } from 'rxjs/Rx';

export class RepositoryMessagingService<T> {

    constructor(protected type: string, protected basePath: string, protected apiService: BackendMessagingService) {

    }

    public all(): Observable<T[]> {
        let path = this.resolvePath();
        return this.apiService.get(path)
            .map((response: any) => response.data.map((entry: any) => RepositoryMessagingService.parseJSONAPIResourceObject<T>(entry)));
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        return BackendMessagingService.pathJoin(path);
    }

    public static parseJSONAPIResourceObject<U>(resource: JSONAPIResourceObject) {
        return <U>Object.assign({}, resource);
    }

}

export interface JSONAPIResourceObject {
    id?: number;
}
