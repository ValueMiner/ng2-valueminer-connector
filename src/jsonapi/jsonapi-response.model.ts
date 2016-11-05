import { JSONAPIResourceObject } from './jsonapi-resource-object.model';

export class JSONAPIResponse<T extends JSONAPIResourceObject> {
    public data: T | T[] = [];
    public included: JSONAPIResourceObject | JSONAPIResourceObject[] = [];

    public constructor(json: {data: any, included?: any}) {
        this.data = json.data;
        this.included = json.included;
    }

    public toPayload(): T | T[] {
        return this.data;
    }

    public toIncluded(): JSONAPIResourceObject | JSONAPIResourceObject[] {
        return this.included;
    }

    public toJSON(): {data: T | T[], included?: JSONAPIResourceObject | JSONAPIResourceObject[]} {
        if (this.included) {
            return {data: this.data, included: this.included};
        } else {
            return {data: this.data};
        }
    }
}