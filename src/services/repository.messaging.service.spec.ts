import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { RepositoryMessagingService, JSONAPIResourceObject } from './repository.messaging.service';

interface MockType {
    id?: number;
    name?: string;
}

describe('Messaging Repository Service tests', () => {
   it('should return all objects', () => {
       const actual = [
           <JSONAPIResourceObject>{
               id: 1,
               name: 'First Mock'
           },
           <JSONAPIResourceObject>{
               id: 2,
               name: 'Second Mock'
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
       let repository = new RepositoryMessagingService<MockType>('mocks', '/mocks', mock);
       repository.all().subscribe((result: MockType[]) => {
           expect(result).toEqual(expected);
       });
   });
});
