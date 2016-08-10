import {BehaviorSubject} from 'rxjs/Rx';
import {InstanceService} from './instance.service';
import {Instance} from '../models/instance';
describe('API Service tests', () => {
   it('should return all instances', () => {
       let mock: any = {
           get: function () {
              return new BehaviorSubject([{
                   id: 1,
                   name: 'First Mock'
               }, {
                   id: 2,
                   name: 'Second Mock'
               }]);
           }
       };
       let instanceService = new InstanceService(mock);
       instanceService.all().subscribe((instances: Instance[]) => {
           expect(instances[0].id).toBe(1);
           expect(instances[1].id).toBe(2);
       });
   });
});
