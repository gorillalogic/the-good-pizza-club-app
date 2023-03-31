export interface Payment {
  id: number;
  company: string;
  type: CardTypes;
  number: string;
  name: string;
  expiration: string;
  securityCode: string;
}

export enum CardTypes {
  Credit = 'credit',
  Debit = 'debit',
}
