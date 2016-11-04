import { JSONAPIResourceObject } from './jsonapi-resource-object.model';

export class JSONAPIResponse {
    public data: JSONAPIResourceObject | JSONAPIResourceObject[];
    public included: JSONAPIResourceObject | JSONAPIResourceObject[];

    private constructor(json: {data: any, included?: any}) {
        this.data = json.data;
        this.included = json.included;
    }

    public toPayload(): JSONAPIResourceObject | JSONAPIResourceObject[] {
        return this.data;
    }

    public toIncluded(): JSONAPIResourceObject | JSONAPIResourceObject[] {
        return this.included;
    }
}