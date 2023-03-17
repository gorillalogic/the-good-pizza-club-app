export interface Payment {
  id: number;
  type: CardTypes;
  bank: string;
  number: number;
  name: string;
  expiration: Date;
  securityCode: number;
}

export enum CardTypes {
  Credit = 'credit',
  Debit = 'debit',
}
