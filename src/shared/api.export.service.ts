import { Injectable } from '@angular/core';
import { JSONAPIResourceService } from '../jsonapi/jsonapi-resource.service';
import { BackendExportService } from './backend.export.service';

@Injectable()
export class ExportAPI {

  constructor(private apiService: BackendExportService) {}

  public get pdf() {
    return new JSONAPIResourceService<any>('pdf', '/pdf', this.apiService);
  }

  public get png() {
    return new JSONAPIResourceService<any>('png', '/png', this.apiService);
  }

  public get jpg() {
    return new JSONAPIResourceService<any>('jpg', '/jpg', this.apiService);
  }

  public get excel() {
    return new JSONAPIResourceService<any>('excel', '/excel', this.apiService);
  }

  public get word() {
    return new JSONAPIResourceService<any>('word', '/word', this.apiService);
  }

}
