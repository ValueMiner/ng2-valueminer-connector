import { BackendService } from '../shared/backend.service';
import { Observable } from 'rxjs/Rx';
import { JSONAPIResourceIdentifierObject } from './jsonapi-resource-identifier-object.model';

export class JSONAPIRelationshipService {

  constructor(private path: string, private result_type: string, private apiService: BackendService) {

  }

  public all(): Observable<string[]> {
    return this.apiService.get(this.path);
  }

  public add(id: string) {
    const payload = JSONAPIRelationshipService.buildJSONAPIRelationshipObject(this.result_type, id);
    return this.apiService.post(this.path, payload);
  }

  public remove(id: string) {
    const payload = JSONAPIRelationshipService.buildJSONAPIRelationshipObject(this.result_type, id);
    return this.apiService.remove(this.path, payload);
  }

  private static buildJSONAPIRelationshipObject(type: string, id: string) {
    let resource = <JSONAPIResourceIdentifierObject>{
      type: type,
      id: id
    };
    return {data: resource};
  }
}
