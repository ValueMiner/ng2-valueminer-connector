import { Observable } from 'rxjs/Observable';
import { JSONAPIResponse } from '../jsonapi/jsonapi-response.model';
import { JSONAPIResourceObject } from '../jsonapi/jsonapi-resource-object.model';

export interface IAPICreate<T extends JSONAPIResourceObject> {
  create(data: any): Observable<JSONAPIResponse<T>>;
  duplicate(id: string, data: any): Observable<JSONAPIResponse<T>>;
  include(include: string[]): IAPICreate<T>;
}

export interface IAPIFindAll<T extends JSONAPIResourceObject> {
  findAll(): Observable<JSONAPIResponse<T[]>>;
  include(include: string[]): IAPIFindAll<T>;
}

export interface IAPIConnect<T extends JSONAPIResourceObject> {
  findAll(): Observable<JSONAPIResponse<T[]>>;
  include(include: string[]): IAPIFindAll<T>;
}

export interface IAPIFindAllCreate<T extends JSONAPIResourceObject> extends IAPICreate<T>, IAPIFindAll<T> {
  include(include: string[]): IAPIFindAllCreate<T>;
}
