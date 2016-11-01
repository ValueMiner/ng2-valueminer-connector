import { BackendService } from './backend.service';
import { Observable } from 'rxjs/Rx';

export class JSONAPIRelationshipService {

    constructor(private path: string, private result_type: string, private apiService: BackendService) {

    }

    public all(): Observable<number[]> {
        return this.apiService.get(this.path)
            .map((response: any) => response.data.map((entry: any) => entry.id));
    }

    public add(id: number) {
        const payload = JSONAPIRelationshipService.buildJSONAPIRelationshipObject(this.result_type, id);
        return this.apiService.post(this.path, payload);
    }

    public remove(id: number) {
        const payload = JSONAPIRelationshipService.buildJSONAPIRelationshipObject(this.result_type, id);
        return this.apiService.remove(this.path, payload);
    }

    private static buildJSONAPIRelationshipObject(type: string, id: number) {
        let resource = <JSONAPIRelationshipObject>{
            type: type,
            id: id
        };
        return {data: resource};
    }
}

export interface JSONAPIRelationshipObject {
    type: string;
    id: number;
}
