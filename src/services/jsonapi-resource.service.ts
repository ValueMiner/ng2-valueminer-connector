import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';

export class JSONAPIResourceService<T extends JSONAPIResourceObject> {

    constructor(protected type: string, protected basePath: string, protected apiService: BackendService) {

    }

    public findAll(): Observable<T[]> {
        let path = this.resolvePath();
        return <Observable<T[]>>this.apiService.get(path)
            .map((response: {data: any[]}) => response.data.map((entry: any) => JSONAPIResourceService.parseJSONAPIResourceObject<T>(entry)));
    }

    public find(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return <Observable<T>>this.apiService.get(path)
            .map((response: any) => JSONAPIResourceService.parseJSONAPIResourceObject<T>(response.data));
    }

    public create(data: any): Observable<T> {
        let path = this.resolvePath();
        let payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, null, data);
        return <Observable<T>>this.apiService.post(path, payload)
            .map((response: any) => JSONAPIResourceService.parseJSONAPIResourceObject<T>(response.data));
    }

    public update(id: number, data: any): Observable<T> {
        let path = this.resolvePath(id);
        let payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id, data);
        return <Observable<T>>this.apiService.put(path, payload)
            .map((response: any) => JSONAPIResourceService.parseJSONAPIResourceObject<T>(response.data));
    }

    public remove(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return <Observable<T>>this.apiService.remove(path)
            .map((response: any) => JSONAPIResourceService.parseJSONAPIResourceObject<T>(response.data));
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        return BackendService.pathJoin(path);
    }

    public static parseJSONAPIResourceObject<U extends JSONAPIResourceObject>(resource: JSONAPIResourceObject): U {
        return <U>resource;
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
