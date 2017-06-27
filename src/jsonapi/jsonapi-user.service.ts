import {BackendService} from '../shared/backend.service';
import {JSONAPIResourceObject} from './jsonapi-resource-object.model';
import {Observable} from 'rxjs/Observable';
import {JSONAPIResponse} from './jsonapi-response.model';

export class JSONAPIUserService<T extends JSONAPIResourceObject> {

  constructor(protected type: string,
              protected basePath: string,
              protected apiService: BackendService) {
  }

  public get(): Observable<JSONAPIResponse<T>> {
    const path = BackendService.pathJoin([this.basePath]);
    return this.apiService.get(path)
      .map((data: any) => new JSONAPIResponse<T>(data));
  }

}
