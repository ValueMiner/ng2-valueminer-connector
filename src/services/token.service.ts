import {Observable} from 'rxjs/Rx';

export class TokenService {
    private token: Observable<string>;

    public get(): Observable<string> { // Stub only
        if (!this.token) {
            return this.refresh();
        }
        return this.token;
    }

    public refresh(): Observable<string> {
        this.token = Observable.from(['token']);
        return this.token;
    }
}
