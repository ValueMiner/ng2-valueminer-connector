import { JSONAPIResourceIdentifierObject } from './jsonapi-resource-identifier-object.model';

export interface JSONAPIRelationshipObject {
  links: { [key: string]: string } | { [key: string]: string }[] ;
  data: JSONAPIResourceIdentifierObject | JSONAPIResourceIdentifierObject[];
}

export interface JSONAPIToOneRelationshipObject extends JSONAPIRelationshipObject {
  links: { [key: string]: string } ;
  data: JSONAPIResourceIdentifierObject;
}

export interface JSONAPIToManyRelationshipObject extends JSONAPIRelationshipObject {
  links: { [key: string]: string }[] ;
  data: JSONAPIResourceIdentifierObject[];
}
