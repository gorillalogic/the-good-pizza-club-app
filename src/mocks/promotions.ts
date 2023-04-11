export const PROMOTIONS = [
  {
    id: 0,
    name: '2x1 Fridays',
    description: 'On medium siza pizzas with no additional toppings.',
    image: 'http://localhost:7777/promotion-1.png',
    discount: 0.5,
    product: {
      id: 0,
      name: 'Egg & Basil',
      description:
        "Our famous egg, basil, capers and black pepper. Don'\t knock it until you try it.",
      price: 14,
      weight: 540,
      calories: 1200,
      image: 'http://localhost:7777/pizza-1.png',
      color: 'orange',
    },
    size: {
      id: 1,
      name: 'Medium 10”',
      type: 'size',
      price: 10,
    },
  },
  {
    id: 1,
    name: '33% OFF',
    description: '',
    image: 'http://localhost:7777/promotion-2.png',
    discount: 0.33,
    product: {
      id: 1,
      name: 'VEGGIE FEST',
      description:
        'Mushrooms, purple basil, capers and our famous secret veggie mix.',
      price: 12,
      weight: 520,
      calories: 1000,
      image: 'http://localhost:7777/pizza-2.png',
      color: 'green',
    },
    size: {
      id: 1,
      name: 'Medium 10”',
      type: 'size',
      price: 10,
    },
  },
];
