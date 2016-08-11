import {APIService} from './api.service';
import {Observable} from 'rxjs/Rx';
export class RepositoryService<T> {
    constructor(private apiService: APIService) {

    }

    public all(path: string): Observable<T[]> {
        return this.apiService.get(path).map((response: [{}]) => {
            return response.map((instance) => {
                return <T> instance;
            });
        });
    }

    public get(path: string): Observable<T> {
        return this.apiService.get(path).map((response: {}) => {
            return <T> response;
        });
    }

    public create(path: string, data: any): Observable<T> {
        return this.apiService.post(path, data).map((response: {}) => {
            return <T> response;
        });
    }

    public update(path: string, data: any): Observable<T> {
        return this.apiService.put(path, data).map((response: {}) => {
            return <T> response;
        });
    }

    public remove(path: string): Observable<T> {
        return this.apiService.remove(path).map((response: {}) => {
            return <T> response;
        });
    }
}
