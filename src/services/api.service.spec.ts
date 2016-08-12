import {API} from './api.service';
import {RepositoryService} from './repository.service';
import {Instance} from '../models/instance';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
describe('API Service tests', () => {
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

