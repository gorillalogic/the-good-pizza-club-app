import { CardTypes } from '../models/Payment';

export const MOCK_PAYMENTS = [
  {
    id: 0,
    company: 'Visa',
    type: CardTypes.Credit,
    number: '4444444444444422',
    name: 'JUAN LOPEZ',
    expiration: '01/24',
    securityCode: '111',
  },
  {
    id: 1,
    company: 'Visa',
    type: CardTypes.Debit,
    number: '4444444444444422',
    name: 'JUAN LOPEZ',
    expiration: '01/24',
    securityCode: '111',
  },
];
