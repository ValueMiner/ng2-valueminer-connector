import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIResourceService, JSONAPIResourceObject } from './jsonapi-resource.service';

interface MockType {
    type: string;
    id?: number;
    name?: string;
}

describe('Repository Service tests', () => {
   it('should return all objects', () => {
       const resource = [
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

       let mock: any = {
           get: function (): Observable<any> {
               return new BehaviorSubject({data: resource});
           }
       };
       let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
       repository.findAll().subscribe((result: MockType[]) => {
           expect(result).toEqual(resource);
       });
   });

    it('should return get a single object', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: resource});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find(1).subscribe((result: MockType) => {
            expect(result).toEqual(resource);
        });
    });

    it('should create a new object', () => {
        const createData = {
            name: 'First Mock'
        };
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            attributes: {
                name: 'First Mock'
            }
        };

        const expected = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };

        let mock: any = {
            post: function (path: string, payload: any): Observable<any> {
                expect(payload).toEqual({data: actual});
                payload.data.id = 1;
                return new BehaviorSubject(payload);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
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
        const expected = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'Updated Mock'
            }
        };

        let mock: any = {
            put: function (path: string, payload: any): Observable<any> {
                let result = Object.assign({}, actual, payload.data);
                return new BehaviorSubject({data: result});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.update(1, update).subscribe((result: MockType) => {
            expect(result).toEqual(expected);
        });
    });

    it('should delete a single object', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };

        let mock: any = {
            remove: function (): Observable<any> {
                return new BehaviorSubject({data: resource});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.remove(1).subscribe((result: MockType) => {
            expect(result).toEqual(resource);
        });
    });
});
