import {BackendService} from './backend.service';
import {Observable} from 'rxjs/Rx';
import {Injectable} from '@angular/core';

@Injectable()
export class RepositoryService<T> {
    private basePath: string;

    constructor(private apiService: BackendService) {

    }

    public for(basePath: string) {
        let repository = new RepositoryService<T>(this.apiService);
        repository.basePath = basePath;
        return repository;
    }

    public all(): Observable<T[]> {
        let path = this.resolvePath();
        return this.apiService.get(path)
            .map((response: [{}]) => response
                .map((instance) => <T> instance));
    }

    public get(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.get(path)
            .map((response: {}) => <T> response);
    }

    public create(data: any): Observable<T> {
        let path = this.resolvePath();
        return this.apiService.post(path, data)
            .map((response: {}) => <T> response);
    }

    public update(id: number, data: any): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.put(path, data)
            .map((response: {}) => <T> response);
    }

    public remove(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.remove(path)
            .map((response: {}) => <T> response);
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id) {
            path.push(id.toString());
        }
        return BackendService.pathJoin(path);
    }
}
