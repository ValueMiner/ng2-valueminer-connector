import { API } from './api.service';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { JSONAPIResponse } from '../jsonapi/jsonapi-response.model';

interface MockType {
    type: string;
    id?: number;
    attributes?: any;
    relationships?: any;
}


describe('API Service tests', () => {
    it('should return an instance service', () => {
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'instances',
                id: 1,
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };


        let api = new API(mock, mock);
        let instanceService = api.instances;
        expect(instanceService).toEqual(jasmine.any((JSONAPIResourceService)));
        instanceService.find(1).subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
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
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'businessarea',
                id: 1,
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };


        let api = new API(mock, mock);
        let businessareaService = api.businessareas;
        expect(businessareaService).toEqual(jasmine.any((JSONAPIResourceService)));
        businessareaService.find(1).subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
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
        const resource = new JSONAPIResponse<MockType>({
            data: {
                type: 'models',
                id: 1,
                attributes: {
                    name: 'First Mock'
                }
            }
        });

        let mock: any = {
            get: function (): Observable<any> {
                return new BehaviorSubject(resource);
            }
        };


        let api = new API(mock, mock);
        let modelService = api.models;
        expect(modelService).toEqual(jasmine.any((JSONAPIResourceService)));
        modelService.find(1).subscribe((result: JSONAPIResponse<MockType>) => {
            expect(result).toEqual(resource);
        });

    });
});

