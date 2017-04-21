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

  private resolvePath(id?: number) {
    const path = [this.basePath];
    if (id) {
      path.push(id.toString());
    }
    return BackendMessagingService.pathJoin(path);
  }

}

export interface JSONAPIResourceObject {
  id?: string;
}
