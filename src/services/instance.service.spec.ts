import {InstanceService} from './instance.service';
describe('Instance Service tests', () => {
    it('should get all objects', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['all']);
        let repository = new InstanceService(mock);
        repository.all();
        expect(mock.all).toHaveBeenCalledWith('instances');
    });

    it('should get single object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['get']);
        let repository = new InstanceService(mock);
        repository.get(1);
        expect(mock.get).toHaveBeenCalledWith('instances/1');
    });

    it('should create new object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['create']);
        let repository = new InstanceService(mock);
        repository.create({name: 'Mock'});
        expect(mock.create).toHaveBeenCalledWith('instances', {name: 'Mock'});
    });

    it('should update an existing object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['update']);
        let repository = new InstanceService(mock);
        repository.update(1, {name: 'Mock'});
        expect(mock.update).toHaveBeenCalledWith('instances/1', {name: 'Mock'});
    });

    it('should delete an existing object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['remove']);
        let repository = new InstanceService(mock);
        repository.remove(1);
        expect(mock.remove).toHaveBeenCalledWith('instances/1');
    });
});
