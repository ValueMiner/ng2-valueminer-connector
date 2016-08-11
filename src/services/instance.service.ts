import {Observable} from 'rxjs/Rx';
import {Instance} from '../models/instance';
import {RepositoryService} from './repository.service';
export class InstanceService {
    constructor(private repository: RepositoryService<Instance>) {

    }

    public all(): Observable<Instance[]> {
        return this.repository.all('instances');
    }

    public get(id: number): Observable<Instance> {
        return this.repository.get('instances/' + id);
    }

    public create(data: any): Observable<Instance> {
        return this.repository.create('instances', data);
    }

    public update(id: number, data: any): Observable<Instance> {
        return this.repository.update('instances/' + id, data);
    }

    public remove(id: number): Observable<Instance> {
        return this.repository.remove('instances/' + id);
    }
}
