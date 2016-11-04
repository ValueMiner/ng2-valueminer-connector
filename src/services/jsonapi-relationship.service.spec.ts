import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIResourceObject } from './jsonapi-resource.service';
import { JSONAPIRelationshipService } from './jsonapi-relationship.service';

interface MockType {
    id?: number;
    name?: string;
}

describe('RelationshipRepository Service tests', () => {
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
       const expected = [1, 2];
       let mock: any = {
           get: function (): Observable<any> {
               return new BehaviorSubject({data: actual});
           }
       };
       const repository = new JSONAPIRelationshipService('mocks/1/favorites', 'mocks', mock);
       repository.all().subscribe((result: number[]) => {
           expect(result).toEqual(expected);
       });
   });

    it('should add an object', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1
        };
        let mock: any = {
            post: function (path: string, payload: any): Observable<any> {
                expect(payload).toEqual({data: actual});
                return new BehaviorSubject({});
            }
        };
        const repository = new JSONAPIRelationshipService('mocks/1/favorites', 'mocks', mock);
        repository.add(1).subscribe((result: MockType) => {
            expect(result).toEqual({});
        });
    });

    it('should delete an object', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'mocks',
            id: 1
        };
        let mock: any = {
            remove: function (path: string, payload: any): Observable<any> {
                expect(payload).toEqual({data: actual});
                return new BehaviorSubject({});
            }
        };
        const repository = new JSONAPIRelationshipService('mocks/1/favorites', 'mocks', mock);
        repository.remove(1).subscribe((result: MockType) => {
            expect(result).toEqual({});
        });
    });
});
