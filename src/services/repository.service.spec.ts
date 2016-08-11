import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {RepositoryService} from './repository.service';

interface MockType {
    id: number;
    name: string;
}

describe('Repository Service tests', () => {
   it('should return all objects', () => {
       let mock: any = {
           get: function (): Observable<any> {
              return new BehaviorSubject([{
                   id: 1,
                   name: 'First Mock'
               }, {
                   id: 2,
                   name: 'Second Mock'
               }]);
           }
       };
       let repository = new RepositoryService<MockType>(mock);
       repository.all('').subscribe((result: MockType[]) => {
           expect(result[0].id).toBe(1);
           expect(result[1].id).toBe(2);
       });
   });

    it('should return get a single object', () => {
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({
                    id: 1,
                    name: 'First Mock'
                });
            }
        };
        let repository = new RepositoryService<MockType>(mock);
        repository.get('').subscribe((result: MockType) => {
            expect(result.id).toBe(1);
        });
    });

    it('should create a new object', () => {
        let mock: any = {
            post: function (path: string, data: any): Observable<any> {
                data.id = 1;
                return new BehaviorSubject(data);
            }
        };
        let repository = new RepositoryService<MockType>(mock);
        repository.create('', {
            name: 'Mock'
        }).subscribe((result: MockType) => {
            expect(result.id).toBe(1);
            expect(result.name).toBe('Mock');
        });
    });

    it('should update an existing object', () => {
        let mock: any = {
            put: function (path: string, data: any): Observable<any> {
                let object = {
                    id: 1,
                    name: 'First Mock'
                };
                Object.assign(object, data);
                return new BehaviorSubject(object);
            }
        };
        let repository = new RepositoryService<MockType>(mock);
        repository.update('', {
            name: 'Mock'
        }).subscribe((result: MockType) => {
            expect(result.id).toBe(1);
            expect(result.name).toBe('Mock');
        });
    });

    it('should delete a single object', () => {
        let mock: any = {
            remove: function (): Observable<any> {
                return new BehaviorSubject(<MockType>{
                    id: 1,
                    name: 'First Mock'
                });
            }
        };
        let repository = new RepositoryService<MockType>(mock);
        repository.remove('').subscribe((result: MockType) => {
            expect(result.id).toBe(1);
        });
    });
});
