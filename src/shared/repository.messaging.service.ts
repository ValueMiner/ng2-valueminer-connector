import { BackendMessagingService } from './backend-messaging.service';
import { Observable } from 'rxjs/Rx';

export class RepositoryMessagingService<T> {

  public static parseJSONAPIResourceObject<U>(resource: JSONAPIResourceObject) {
    return <U>(<any>Object).assign({}, resource);
  }

  constructor(protected type: string, protected basePath: string, protected apiService: BackendMessagingService) {}

  public all(): Observable<T[]> {
    const path = this.resolvePath();
    return this.apiService.get(path)
      .map((response: any) => response.data.map((entry: any) => RepositoryMessagingService.parseJSONAPIResourceObject<T>(entry)));
  }

  public update(id: string, data: any): Observable<T[]> {
    const path = this.resolvePath(id);
    return this.apiService.put(path, data)
      .map((response: any) => response.data.map((entry: any) => RepositoryMessagingService.parseJSONAPIResourceObject<T>(entry)));
  }

  public byUid(uid: string): Observable<T[]> {
    const path = this.resolvePath(uid, 'uid');
    return this.apiService.get(path)
      .map((response: any) => response.data.map((entry: any) => RepositoryMessagingService.parseJSONAPIResourceObject<T>(entry)));
  }

  public byModelId(modelId: string): Observable<T[]> {
    const path = this.resolvePath(modelId, 'model');
    return this.apiService.get(path)
      .map((response: any) => response.data.map((entry: any) => RepositoryMessagingService.parseJSONAPIResourceObject<T>(entry)));
  }

  private resolvePath(id?: number | string, addition?: string) {
    const path = [this.basePath];
    if (addition) {
      path.push(addition);
    }
    if (id) {
      path.push(typeof id === 'number' ? id.toString() : id);
    }
    return BackendMessagingService.pathJoin(path);
  }

}

export interface JSONAPIResourceObject {
  id?: string;
}
