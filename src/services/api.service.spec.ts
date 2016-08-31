import {API} from './api.service';
import {RepositoryService} from './repository.service';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
describe('API Service tests', () => {
    it('should return an instance service', () => {
        let instanceMock = {
            id: 1,
            name: 'Test'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: instanceMock});
            }
        };


        let api = new API(mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((RepositoryService)));
        instanceService.get(1).subscribe(instance => {
            expect(instance).toEqual(instanceMock);
        });

    });

    it('should get return an instance navigator factory', () => {
        let mock: any = {
            get: function (){

            }
        };


        let api = new API(mock);
        let businessareaFactory = api.instance(1);
        expect(businessareaFactory.businessarea).toBeDefined();
        expect(businessareaFactory.businessareas).toBeDefined();

    });

    it('should return an businessarea service', () => {
        let businessareaMock = {
            id: 1,
            name: 'Test'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: businessareaMock});
            }
        };


        let api = new API(mock);
        let businessareaService = api.instance(1).businessareas;
        expect(businessareaService).toEqual(jasmine.any((RepositoryService)));
        businessareaService.get(1).subscribe(businessarea => {
            expect(businessarea).toEqual(businessareaMock);
        });

    });

    it('should get return an businessarea navigator factory', () => {
        let mock: any = {
            get: function () {

            }
        };


        let api = new API(mock);
        let businessareaFactory = api.instance(1).businessarea(1);
        expect(businessareaFactory.models).toBeDefined();
        expect(businessareaFactory.model).toBeDefined();
        expect(businessareaFactory.submodels).toBeDefined();
    });

    it('should return an model service', () => {
        let modelMock = {
            id: 1,
            name: 'Test'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: modelMock});
            }
        };


        let api = new API(mock);
        let modelService = api.instance(1).businessarea(1).models;
        expect(modelService).toEqual(jasmine.any((RepositoryService)));
        modelService.get(1).subscribe(model => {
            expect(model).toEqual(modelMock);
        });

    });
});

