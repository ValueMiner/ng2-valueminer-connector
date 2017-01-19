import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIResourceService } from './jsonapi-resource.service';
import { JSONAPIResourceIdentifierObject } from './jsonapi-resource-identifier-object.model';
import { JSONAPIResponse } from './jsonapi-response.model';

interface MockType {
    type: string;
    id?: string;
    attributes?: any;
    relationships?: any;
}

describe('Repository Service tests', () => {
   it('should return all objects', () => {
       const resource = new JSONAPIResponse<MockType[]>({
           data: [{
               type: 'mocks',
               id: '1',
               attributes: {
                   name: 'First Mock'
               }
           }, {
               type: 'mocks',
               id: '2',
               attributes: {
                   name: 'Second Mock'
               }
           }]
       });

       let mock: any = {
           get: function (): Observable<any> {
               return new BehaviorSubject(resource);
           }
       };
       let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
       repository.findAll().subscribe((result: JSONAPIResponse<MockType[]>) => {
           expect(result).toEqual(resource);
       });
   });

    it('should return get a single object', () => {
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find('1').subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
        });
    });

    it('should create a new object', () => {
        const createData = {
            name: 'First Mock'
        };

        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            post: function (path: string, payload: any): Observable<any> {
                return new BehaviorSubject(new JSONAPIResponse<MockType>({
                    data: {
                        type: 'mocks',
                        id: '1',
                        attributes: {
                            name: 'First Mock'
                        }
                    }
                }));
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.create(createData).subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
        });
    });

    it('should update an existing object', () => {
        const actual = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        const update = {
            name: 'Updated Mock'
        };
        const expected = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'Updated Mock'
                }
            }
        });

        let mock: any = {
            put: function (path: string, payload: any): Observable<any> {
                let result = Object.assign({}, actual);
                (<MockType>result.data).attributes.name = payload.data.attributes.name;
                return new BehaviorSubject(result);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.update('1', update).subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(expected);
        });
    });

    it('should delete a single object', () => {
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: 1,
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            remove: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.remove('1').subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
        });
    });

    it('should parse "*-to-one" relationships', () => {
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                relationships: {
                    author: {
                        data: {
                            id: '1',
                            type: 'related'
                        },
                        links: []
                    }
                }
            }

        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find('1').subscribe((result: JSONAPIResponse<MockType>) => {
            expect((<MockType>result.data).relationships.author.data.id).toBeDefined();
            expect((<MockType>result.data).relationships.author.data.id).toBe(1);
        });
    });

    it('should parse "*-to-many" relationships', () => {
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'mocks',
                id: '1',
                relationships: {
                    comments: {
                        data: [{
                            id: '1',
                            type: 'related'
                        }, {
                            id: '2',
                            type: 'related'
                        }
                        ],
                        links: []
                    }
                }
            }
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.find('1').subscribe((result: JSONAPIResponse<MockType>) => {
            expect((<MockType>result.data).relationships.comments).toBeDefined();
            expect((<MockType>result.data).relationships.comments.data.length).toBe(2);
            expect((<MockType>result.data).relationships.comments.data
                .map((entry: JSONAPIResourceIdentifierObject) => entry.id)).toEqual([1, 2]);
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

    it('should return included objects', () => {
        const resource = new JSONAPIResponse<MockType[]>({
            data: [{
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }, {
                type: 'mocks',
                id: '2',
                attributes: {
                    name: 'Second Mock'
                }
            }],
            included: [{
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }, {
                type: 'strings',
                id: '1',
                attributes: {
                    name: 'First String'
                }
            }
            ]
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };
        let repository = new JSONAPIResourceService<MockType>('mocks', '/mocks', mock);
        repository.include(['mocks', 'strings']).findAll().subscribe((result: JSONAPIResponse<MockType[]>) => {
            expect(result.toIncludedByType<MockType>('mocks')).toEqual([{
                type: 'mocks',
                id: '1',
                attributes: {
                    name: 'First Mock'
                }
            }]);
        });
    });
});
