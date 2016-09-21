import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { RepositoryService, JSONAPIResourceObject } from './repository.service';

interface MockType {
    id?: number;
    name?: string;
}

describe('Repository Service tests', () => {
   it('should return all objects', () => {
       const actual = [
           <JSONAPIResourceObject>{
               type: 'mocks',
               id: 1,
               attributes: {
                   name: 'First Mock'
               }
           },
           <JSONAPIResourceObject>{
               type: 'mocks',
               id: 2,
               attributes: {
                   name: 'Second Mock'
               }
           }
       ];
       const expected = [
           <MockType>{
               id: 1,
               name: 'First Mock'
           },
           <MockType>{
               id: 2,
               name: 'Second Mock'
           }
       ];
       let mock: any = {
           get: function (): Observable<any> {
               return new BehaviorSubject({data: actual});
           }
       };
       let repository = new RepositoryService<MockType>('mocks', '/mocks', mock);
       repository.all().subscribe((result: MockType[]) => {
           expect(result).toEqual(expected);
       });
   });

    it('should return get a single object', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <MockType>{
            id: 1,
            name: 'First Mock'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };
        let repository = new RepositoryService<MockType>('mocks', '/mocks', mock);
        repository.get(1).subscribe((result: MockType) => {
            expect(result).toEqual(expected);
        });
    });

    it('should create a new object', () => {
        const createData = <MockType>{
            name: 'First Mock'
        };
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <MockType>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            post: function (path: string, payload: any): Observable<any> {
                expect(payload).toEqual({data: actual});
                payload.data.id = 1;
                return new BehaviorSubject(payload);
            }
        };
        let repository = new RepositoryService<MockType>('mocks', '/mocks', mock);
        repository.create(createData).subscribe((result: MockType) => {
            expect(result).toEqual(expected);
        });
    });

    it('should update an existing object', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const update = {
            name: 'Updated Mock'
        };
        const expected = <MockType>{
            id: 1,
            name: 'Updated Mock'
        };

        let mock: any = {
            put: function (path: string, payload: any): Observable<any> {
                let result = Object.assign({}, actual, payload.data);
                return new BehaviorSubject({data: result});
            }
        };
        let repository = new RepositoryService<MockType>('mocks', '/mocks', mock);
        repository.update(1, update).subscribe((result: MockType) => {
            expect(result).toEqual(expected);
        });
    });

    it('should delete a single object', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <MockType>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            remove: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };
        let repository = new RepositoryService<MockType>('mocks', '/mocks', mock);
        repository.remove(1).subscribe((result: MockType) => {
            expect(result).toEqual(expected);
        });
    });
});
