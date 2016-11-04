import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIResourceService } from './jsonapi-resource.service';
import { JSONAPIResourceIdentifierObject } from './jsonapi-resource-identifier-object.model';
import { JSONAPIResourceObject } from './jsonapi-resource-object.model';

interface MockType {
    type: string;
    id?: number;
    attributes?: any;
    relationships?: any;
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
            },
            relationships: {}
        };
        const update = {
            name: 'Updated Mock'
        };
        const expected = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            attributes: {
                name: 'Updated Mock'
            },
            relationships: {}
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

    it('should parse "*-to-one" relationships', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            relationships: {
                author: {
                    data: {
                        id: 1,
                        type: 'related'
                    },
                    links: []
                }
            }
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: resource});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find(1).subscribe((result: MockType) => {
            expect(result.relationships.author.data.id).toBeDefined();
            expect(result.relationships.author.data.id).toBe(1);
        });
    });

    it('should parse "*-to-many" relationships', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1,
            relationships: {
                comments: {
                    data: [{
                            id: 1,
                            type: 'related'
                        }, {
                            id: 2,
                            type: 'related'
                        }
                    ],
                    links: []
                }
            }
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: resource});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find(1).subscribe((result: MockType) => {
            expect(result.relationships.comments).toBeDefined();
            expect(result.relationships.comments.data.length).toBe(2);
            expect(result.relationships.comments.data.map((entry: JSONAPIResourceIdentifierObject) => entry.id)).toEqual([1, 2]);
        });
    });

    it('should adds include parameter ', () => {
        let mock: any = {
            get: function (path: string): Observable<any> {
                expect(path).toBe('/mocks?include=nodedata%2Crelationships');
                return new BehaviorSubject({data: []});
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.include(['nodedata', 'relationships']).findAll().subscribe((result: any) => {
            expect(result).not.toBeNull();
        });
    });
});
