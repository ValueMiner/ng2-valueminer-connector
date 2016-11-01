import { API } from './api.service';
import { JSONAPIResourceService, JSONAPIResourceObject } from './jsonapi-resource.service';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { IInstance } from '../models/instance.model';
import { IBusinessarea } from '../models/businessarea.model';
import { IModel } from '../models/model.model';

describe('API Service tests', () => {
    it('should return an instance service', () => {
        const actual = <JSONAPIResourceObject>{
            type: 'instances',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <IInstance>{
            id: 1,
            name: 'First Mock'
        };
        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock, mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((JSONAPIResourceService)));
        instanceService.find(1).subscribe(instance => {
            expect(instance).toEqual(expected);
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
        const actual = <JSONAPIResourceObject>{
            type: 'businessareas',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <IBusinessarea>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock, mock);
        let businessareaService = api.businessareas;
        expect(businessareaService).toEqual(jasmine.any((JSONAPIResourceService)));
        businessareaService.find(1).subscribe(businessarea => {
            expect(businessarea).toEqual(expected);
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
        const actual = <JSONAPIResourceObject>{
            type: 'models',
            id: 1,
            attributes: {
                name: 'First Mock'
            }
        };
        const expected = <IModel>{
            id: 1,
            name: 'First Mock'
        };

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject({data: actual});
            }
        };


        let api = new API(mock, mock);
        let modelService = api.models;
        expect(modelService).toEqual(jasmine.any((JSONAPIResourceService)));
        modelService.find(1).subscribe((model: IModel) => {
            expect(model).toEqual(expected);
        });

    });
});

