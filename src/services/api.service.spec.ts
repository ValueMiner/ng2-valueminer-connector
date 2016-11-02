import { API } from './api.service';
import { JSONAPIResourceService, JSONAPIResourceObject } from './jsonapi-resource.service';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { IInstance } from '../models/instance.model';
import { IBusinessarea } from '../models/businessarea.model';
import { IModel } from '../models/model.model';

describe('API Service tests', () => {
    it('should return an instance service', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'instances',
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


        let api = new API(mock, mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((JSONAPIResourceService)));
        instanceService.find(1).subscribe(instance => {
            expect(instance).toEqual(resource);
        });

    });

    it('should get return an instance navigator factory', () => {
        let mock: any = {
            get: function (){

            }
        };


        let api = new API(mock, mock);
        let instanceFactory = api.instance(1);
        expect(instanceFactory.businessareas).toBeDefined();

    });

    it('should return an businessarea service', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'businessareas',
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


        let api = new API(mock, mock);
        let businessareaService = api.businessareas;
        expect(businessareaService).toEqual(jasmine.any((JSONAPIResourceService)));
        businessareaService.find(1).subscribe(businessarea => {
            expect(businessarea).toEqual(resource);
        });

    });

    it('should get return an businessarea navigator factory', () => {
        let mock: any = {
            get: function () {

            }
        };


        let api = new API(mock, mock);
        let businessareaFactory = api.businessarea(1);
        expect(businessareaFactory.models).toBeDefined();
        expect(businessareaFactory.submodels).toBeDefined();
    });

    it('should return an model service', () => {
        const resource = <JSONAPIResourceObject>{
            type: 'models',
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


        let api = new API(mock, mock);
        let modelService = api.models;
        expect(modelService).toEqual(jasmine.any((JSONAPIResourceService)));
        modelService.find(1).subscribe((model: IModel) => {
            expect(model).toEqual(resource);
        });

    });
});

