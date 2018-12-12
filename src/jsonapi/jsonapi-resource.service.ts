import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs/Rx';
import { JSONAPIResourceObject } from './jsonapi-resource-object.model';
import { JSONAPIResponse } from './jsonapi-response.model';

export class JSONAPIResourceService<T extends JSONAPIResourceObject> {
  private includes: string[];

  public static buildJSONAPIResourceObject(type: string, id?: string, data?: any) {
    const resource = <JSONAPIResourceObject>{
      type: type,
      attributes: data
    };
    if (id) { // Possible because 0 is not a valid id
      resource.id = id;
    }
    return {data: resource};
  }

  public static buildMassJSONAPIResourceObject(type: string, data?: any) {
    const resource = <JSONAPIResourceObject>{
      type: type,
      data: data
    };
    return {data: resource};
  }

  public static buildBulkJSONAPIResourceObject(type: string, data?: any[]) {
    return data.map(datum => {
      if (!datum.id) {
        return <JSONAPIResourceObject> {
          type: type,
          id: datum
        };
      }
      return <JSONAPIResourceObject> {
        type: type,
        id: datum.id,
        attributes: datum.data
      };
    });
  }

  constructor(protected type: string, protected basePath: string, protected apiService: BackendService) {}

  public include(includes: string[]): JSONAPIResourceService<T> {
    const clone: JSONAPIResourceService<T> = Object.create(this);
    clone.includes = includes;
    return clone;
  }

  /* Default endpoints */

  public findAll(): Observable<JSONAPIResponse<T[]>> {
    const path = this.resolvePath();
    return this.apiService.get(path)
      .map((data: any) => new JSONAPIResponse<T[]>(data));
  }

  public find(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id);
    return this.apiService.get(path)
      .map((data: any) => new JSONAPIResponse<T>(data));
  }

  public create(data: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath();
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, null, data);
    return this.apiService.post(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public update(id: string, data: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id);
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id, data);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public remove(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id);
    return this.apiService.remove(path)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  /* Bulk methods */

  public bulkCreate(data: any[]): Observable<JSONAPIResponse<T[]>> {
    const path = this.resolvePath();
    const payload = JSONAPIResourceService.buildBulkJSONAPIResourceObject(this.type, data);
    return this.apiService.post(path, payload)
      .map((d: any) => new JSONAPIResponse<T[]>(d));
  }

  public bulkUpdate(data: any[]): Observable<JSONAPIResponse<T[]>> {
    const path = this.resolvePath();
    const payload = JSONAPIResourceService.buildBulkJSONAPIResourceObject(this.type, data);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T[]>(d));
  }

  public bulkRemove(ids: string[]): Observable<JSONAPIResponse<T[]>> {
    const path = this.resolvePath();
    const payload = JSONAPIResourceService.buildBulkJSONAPIResourceObject(this.type, ids);
    return this.apiService.remove(path, payload)
      .map((d: any) => new JSONAPIResponse<T[]>(d));
  }

  /* Specific endpoints */

  public duplicate(data: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath() + '/duplicate';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, null, data);
    return this.apiService.post(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public connect(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/connect';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.put(path, payload)
      .map((data: any) => new JSONAPIResponse<T>(data));
  }

  public disconnect(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/disconnect';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public assign(id: string, data: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/assign';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id, data);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public rollback(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/rollback';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public unassign(id: string, data: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/unassign';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id, data);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public tag(id: string, tagId: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/tags/' + tagId;
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.post(path, payload)
      .map((data: any) => new JSONAPIResponse<T>(data));
  }

  public untag(id: string, tagId: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/tags/' + tagId;
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.remove(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public reassign(data?: any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath() + '/reassign/';
    const payload = JSONAPIResourceService.buildMassJSONAPIResourceObject(this.type, data);
    return this.apiService.put(path, payload)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public mass(data?: string | any): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath() + '/' + (typeof(data) === 'string' ? data : data.data[0].id) + '/mass/';
    if (typeof(data) === 'string') {
      return this.apiService.get(path)
        .map((d: any) => new JSONAPIResponse<T>(d));
    } else {
      const payload = JSONAPIResourceService.buildMassJSONAPIResourceObject(this.type, data);
      return this.apiService.put(path, payload)
        .map((d: any) => new JSONAPIResponse<T>(d));
    }
  }

  public initiatives(id: string): Observable<JSONAPIResponse<T>> {
    const path = this.resolvePath(id) + '/initiatives/';
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, id);
    return this.apiService.get(path)
      .map((d: any) => new JSONAPIResponse<T>(d));
  }

  public download(data: any): Observable<any> {
    const path = this.resolvePath();
    const payload = JSONAPIResourceService.buildJSONAPIResourceObject(this.type, null, data);
    return this.apiService.post(path, payload);
  }

  private resolvePath(id?: string) {
    const path = [this.basePath];
    if (id) {
      path.push(id.toString());
    }
    const pathString = BackendService.pathJoin(path);
    return this.addInclude(pathString, this.includes);
  }

  private addInclude(path: string, includes: string[]) {
    if (!includes) {
      return path;
    }

    const includeString = includes.join(',');
    return `${path}?include=${encodeURIComponent(includeString)}`;
  }

}
