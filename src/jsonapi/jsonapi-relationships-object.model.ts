import { JSONAPIResourceIdentifierObject } from './jsonapi-resource-identifier-object.model';

export interface JSONAPIRelationshipObject {
    links: { [key: string]: string } | { [key: string]: string }[] ;
    data: JSONAPIResourceIdentifierObject | JSONAPIResourceIdentifierObject[];
}
