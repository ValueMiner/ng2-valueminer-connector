import {API} from './api';
import {RepositoryService} from './services/repository.service';
import {Instance} from './models/instance';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
describe('Instance Service tests', () => {
    it('should get instance service', () => {
        let instanceMock = <Instance>{
            id: 1,
            name: 'Test'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(instanceMock);
            }
        };


        let api = new API(mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((RepositoryService)));
        instanceService.get(1).subscribe(instance => {
            expect(instance).toEqual(instanceMock);
        });

    });
});

