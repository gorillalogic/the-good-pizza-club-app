export interface SimpleRecord {
  id: number;
}

export interface IdNamedObject extends SimpleRecord {
  name: string;
}

export interface IdTypedObject extends IdNamedObject {
  type: string;
}
