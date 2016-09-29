import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';

export class RepositoryService<T> {

    constructor(protected type: string, protected basePath: string, protected apiService: BackendService) {

    }

    public all(): Observable<T[]> {
        let path = this.resolvePath();
        return this.apiService.get(path)
            .map((response: any) => response.data.map((entry: any) => RepositoryService.parseJSONAPIResourceObject<T>(entry)));
    }

    public get(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.get(path)
            .map((response: any) => RepositoryService.parseJSONAPIResourceObject<T>(response.data));
    }

    public create(data: any): Observable<T> {
        let path = this.resolvePath();
        let payload = RepositoryService.buildJSONAPIResourceObject(this.type, null, data);
        return this.apiService.post(path, payload)
            .map((response: any) => RepositoryService.parseJSONAPIResourceObject<T>(response.data));
    }

    public update(id: number, data: any): Observable<T> {
        let path = this.resolvePath(id);
        let payload = RepositoryService.buildJSONAPIResourceObject(this.type, id, data);
        return this.apiService.put(path, payload)
            .map((response: any) => RepositoryService.parseJSONAPIResourceObject<T>(response.data));
    }

    public remove(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.remove(path)
            .map((response: any) => RepositoryService.parseJSONAPIResourceObject<T>(response.data));
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        return BackendService.pathJoin(path);
    }

    public static parseJSONAPIResourceObject<U>(resource: JSONAPIResourceObject) {
        return <U>Object.assign({id: resource.id}, resource.attributes);
    }

    public static buildJSONAPIResourceObject(type: string, id?: number, data?: any) {
        let resource = <JSONAPIResourceObject>{
            type: type,
            attributes: data
        };
        if (id) { // Possible because 0 is not a valid id
            resource.id = id;
        }
        return {data: resource};
    }
}

export interface JSONAPIResourceObject {
    type: string;
    id?: number;
    attributes?: any;
    relationships?: any;
}
