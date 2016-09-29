import { API } from './api.service';
import { RepositoryService, JSONAPIResourceObject } from './repository.service';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Instance } from '../models/instance';
import { Businessarea } from '../models/businessarea';
import { Model } from '../models/model';
describe('API Service tests', () => {
    it('should return an instance service', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'instances',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <Instance>{
            id: 1,
            name: 'First Mock'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((RepositoryService)));
        instanceService.get(1).subscribe(instance => {
            expect(instance).toEqual(expected);
        });

    });

    it('should get return an instance navigator factory', () => {
        let mock: any = {
            get: function (){

            }
        };


        let api = new API(mock);
        let instanceFactory = api.instance(1);
        expect(instanceFactory.businessareas).toBeDefined();

    });

    it('should return an businessarea service', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'businessareas',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <Businessarea>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock);
        let businessareaService = api.businessareas;
        expect(businessareaService).toEqual(jasmine.any((RepositoryService)));
        businessareaService.get(1).subscribe(businessarea => {
            expect(businessarea).toEqual(expected);
        });

    });

    it('should get return an businessarea navigator factory', () => {
        let mock: any = {
            get: function () {

            }
        };


        let api = new API(mock);
        let businessareaFactory = api.businessarea(1);
        expect(businessareaFactory.models).toBeDefined();
        expect(businessareaFactory.submodels).toBeDefined();
    });

    it('should return an model service', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'models',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <Model>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock);
        let modelService = api.models;
        expect(modelService).toEqual(jasmine.any((RepositoryService)));
        modelService.get(1).subscribe((model: Model) => {
            expect(model).toEqual(expected);
        });

    });
});

