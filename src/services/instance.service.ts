import {APIService} from './api.service';
import {Observable} from 'rxjs/Rx';
import {Instance} from '../models/instance';
export class InstanceService {
    constructor(private apiService: APIService) {

    }

    public all(): Observable<Instance[]> {
        return this.apiService.get('instances').map((response: [{}]) => {
            return response.map((instance) => {
                return <Instance>instance;
            });
        });
    }
}