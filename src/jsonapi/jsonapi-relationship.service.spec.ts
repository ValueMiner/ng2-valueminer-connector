import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIRelationshipService } from './jsonapi-relationship.service';
import { JSONAPIResourceObject } from './jsonapi-resource-object.model';

interface MockType {
  id?: string;
  name?: string;
}

describe('RelationshipRepository Service tests', () => {

  it('should add an object', () => {
    const actual = <JSONAPIResourceObject>{
      type: 'mocks',
      id: '1'
    };
    const mock: any = {
      post: function (path: string, payload: any): Observable<any> {
        expect(payload).toEqual({data: actual});
        return new BehaviorSubject({});
      }
    };
    const repository = new JSONAPIRelationshipService('mocks/1/favorites', 'mocks', mock);
    repository.add('1').subscribe((result: MockType) => {
      expect(result).toEqual({});
    });
  });

  it('should delete an object', () => {
    const actual = <JSONAPIResourceObject>{
      type: 'mocks',
      id: '1'
    };
    const mock: any = {
      remove: function (path: string, payload: any): Observable<any> {
        expect(payload).toEqual({data: actual});
        return new BehaviorSubject({});
      }
    };
    const repository = new JSONAPIRelationshipService('mocks/1/favorites', 'mocks', mock);
    repository.remove('1').subscribe((result: MockType) => {
      expect(result).toEqual({});
    });
  });
});
