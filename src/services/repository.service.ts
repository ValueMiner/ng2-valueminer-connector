import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';

export class RepositoryService<T> {

    constructor(private type: string, private basePath: string, private apiService: BackendService) {

    }

    public all(): Observable<T[]> {
        let path = this.resolvePath();
        return this.apiService.get(path)
            .map((response: any) => response.data.map((entry: any) => this.parseJSONAPIResourceObject<T>(entry)));
    }

    public get(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.get(path)
            .map((response: any) => this.parseJSONAPIResourceObject<T>(response.data));
    }

    public create(data: any): Observable<T> {
        let path = this.resolvePath();
        let payload = this.buildJSONAPIResourceObject(null, data);
        return this.apiService.post(path, payload)
            .map((response: any) => this.parseJSONAPIResourceObject<T>(response.data));
    }

    public update(id: number, data: any): Observable<T> {
        let path = this.resolvePath(id);
        let payload = this.buildJSONAPIResourceObject(id, data);
        return this.apiService.put(path, payload)
            .map((response: any) => this.parseJSONAPIResourceObject<T>(response.data));
    }

    public remove(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.remove(path)
            .map((response: any) => this.parseJSONAPIResourceObject<T>(response.data));
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        return BackendService.pathJoin(path);
    }

    private parseJSONAPIResourceObject<U>(resource: JSONAPIResourceObject) {
        return <U>Object.assign({id: resource.id}, resource.attributes);
    }

    private buildJSONAPIResourceObject(id?: number, data?: any) {
        let resource = <JSONAPIResourceObject>{
            type: this.type,
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
