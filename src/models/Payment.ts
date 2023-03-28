export interface Payment {
  id: number;
  type: CardTypes;
  bank: string;
  number: string;
  name: string;
  expiration: string;
  securityCode: string;
  isDefault: boolean;
}

export enum CardTypes {
  Credit = 'credit',
  Debit = 'debit',
}
