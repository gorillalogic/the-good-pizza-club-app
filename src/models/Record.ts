import { IdTypedObject } from './Base';

export interface Record extends IdTypedObject {
  price: number;
}

export interface QuantifiedRecord extends Record {
  quantity: number;
}
