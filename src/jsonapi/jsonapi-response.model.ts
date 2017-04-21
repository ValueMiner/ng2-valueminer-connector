import { JSONAPIResourceObject } from './jsonapi-resource-object.model';

export class JSONAPIResponse<T extends JSONAPIResourceObject | JSONAPIResourceObject[]> {
  public data: T;
  public included: JSONAPIResourceObject[];

  public constructor(json: {data: any, included?: any}) {
    this.data = json.data;
    this.included = json.included;
  }

  public toPayload(): T {
    return this.data;
  }

  public toIncluded(): JSONAPIResourceObject | JSONAPIResourceObject[] {
    return this.included;
  }

  public toIncludedByType<U extends JSONAPIResourceObject>(type: string): U[] {
    if (!this.included) {
      return [];
    }
    return <U[]>this.included.filter((include: JSONAPIResourceObject) => include.type === type);
  }

  public toJSON(): {data: T, included?: JSONAPIResourceObject | JSONAPIResourceObject[]} {
    if (this.included) {
      return {data: this.data, included: this.included};
    } else {
      return {data: this.data};
    }
  }
}
