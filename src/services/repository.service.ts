import {APIService} from './api.service';
import {Observable} from 'rxjs/Rx';
export class RepositoryService<T> {
    private basePath: string;

    constructor(private apiService: APIService) {

    }

    public for(basePath: string) {
        let repository = new RepositoryService<T>(this.apiService);
        repository.basePath = basePath;
        return repository;
    }

    public all(): Observable<T[]> {
        let path = this.resolvePath();
        return this.apiService.get(path).map((response: [{}]) => {
            return response.map((instance) => {
                return <T> instance;
            });
        });
    }

    public get(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.get(path).map((response: {}) => {
            return <T> response;
        });
    }

    public create(data: any): Observable<T> {
        let path = this.resolvePath();
        return this.apiService.post(path, data).map((response: {}) => {
            return <T> response;
        });
    }

    public update(id: number, data: any): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.put(path, data).map((response: {}) => {
            return <T> response;
        });
    }

    public remove(id: number): Observable<T> {
        let path = this.resolvePath(id);
        return this.apiService.remove(path).map((response: {}) => {
            return <T> response;
        });
    }

    private resolvePath(id?: number) {
        let path = [this.basePath];
        if (id !== undefined) {
            path.push(id.toString());
        }
        return APIService.pathJoin(path);
    }
}
