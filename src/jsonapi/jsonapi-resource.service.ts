import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs/Rx';
import { JSONAPIResourceObject } from './jsonapi-resource-object.model';
import { JSONAPIResponse } from './jsonapi-response.model';

export class JSONAPIResourceService<T extends JSONAPIResourceObject> {
    private includes: string[];

    constructor(protected type: string, protected basePath: string, protected apiService: BackendService) {

    }

    public include(includes: string[]): JSONAPIResourceService<T> {
        let clone: JSONAPIResourceService<T> = Object.create(this);
        clone.includes = includes;
        return clone;
    }

    public findAll(): Observable<JSONAPIResponse<T[]>> {
        let path = this.resolvePath();
        return this.apiService.get(path)
            .map((data: any) => new JSONAPIResponse<T[]>(data));
    }

    public find(id: string): Observable<JSONAPIResponse<T>> {
        let path = this.resolvePath(id);
        return this.apiService.get(path)
            .map((data: any) => new JSONAPIResponse<T>(data));
    }

    public create(data: any): Observable<JSONAPIResponse<T>> {
        let path = this.resolvePath();
        let payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, null, data);
        return this.apiService.post(path, payload)
            .map((data: any) => new JSONAPIResponse<T>(data));
    }

    public update(id: string, data: any): Observable<JSONAPIResponse<T>> {
        let path = this.resolvePath(id);
        let payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id, data);
        return this.apiService.put(path, payload)
            .map((data: any) => new JSONAPIResponse<T>(data));
    }

    public remove(id: string): Observable<JSONAPIResponse<T>> {
        let path = this.resolvePath(id);
        return this.apiService.remove(path)
            .map((data: any) => new JSONAPIResponse<T>(data));
    }

    private resolvePath(id?: string) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        let pathString = BackendService.pathJoin(path);
        return this.addInclude(pathString, this.includes);
    }

    private addInclude(path: string, includes: string[]) {
        if(!includes)
            return path;

        const includeString = includes.join(',');
        return `${path}?include=${encodeURIComponent(includeString)}`;
    }

    public static buildJSONAPIResourceObject(type: string, id?: string, data?: any) {
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
