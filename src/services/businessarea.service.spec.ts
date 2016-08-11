import {BusinessareaService} from './businessarea.service';
describe('Businessarea Service tests', () => {
    it('should get all objects', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['all']);
        let repository = new BusinessareaService(mock);
        repository.all(1);
        expect(mock.all).toHaveBeenCalledWith('instances/1/businessareas');
    });

    it('should get single object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['get']);
        let repository = new BusinessareaService(mock);
        repository.get(1, 2);
        expect(mock.get).toHaveBeenCalledWith('instances/1/businessareas/2');
    });

    it('should create new object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['create']);
        let repository = new BusinessareaService(mock);
        repository.create(1, {name: 'Mock'});
        expect(mock.create).toHaveBeenCalledWith('instances/1/businessareas', {name: 'Mock'});
    });

    it('should update an existing object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['update']);
        let repository = new BusinessareaService(mock);
        repository.update(1, 2, {name: 'Mock'});
        expect(mock.update).toHaveBeenCalledWith('instances/1/businessareas/2', {name: 'Mock'});
    });

    it('should delete an existing object', () => {
        let mock: any = jasmine.createSpyObj('RepositoryService', ['remove']);
        let repository = new BusinessareaService(mock);
        repository.remove(1, 2);
        expect(mock.remove).toHaveBeenCalledWith('instances/1/businessareas/2');
    });
});
