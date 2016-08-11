import {RepositoryService} from './repository.service';
import {Observable} from 'rxjs/Rx';
import {Businessarea} from '../models/businessarea';
export class BusinessareaService {
    constructor(private repository: RepositoryService<Businessarea>) {

    }

    public all(instanceId: number): Observable<Businessarea[]> {
        return this.repository.all(`instances/${instanceId}/businessareas`);
    }

    public get(instanceId: number, id: number): Observable<Businessarea> {
        return this.repository.get(`instances/${instanceId}/businessareas/${id}`);
    }

    public create(instanceId: number, data: any): Observable<Businessarea> {
        return this.repository.create(`instances/${instanceId}/businessareas`, data);
    }

    public update(instanceId: number, id: number, data: any): Observable<Businessarea> {
        return this.repository.update(`instances/${instanceId}/businessareas/${id}`, data);
    }

    public remove(instanceId: number, id: number): Observable<Businessarea> {
        return this.repository.remove(`instances/${instanceId}/businessareas/${id}`);
    }
}
