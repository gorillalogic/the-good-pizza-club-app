export const COOKIE_SESSION_NAME = 'connect.sid';

export const LOCALSTORAGE_KEYS = {
  user: 'user',
};

export const BACKGROUND_IMAGES = {
  mobile: 'images/background_mobile.png',
  desktop: 'images/background_desktop.png',
};

export const NAVBAR_ITEMS = [
  { label: 'Menu', url: '/menu' },
  { label: 'About Us', url: '/about-us' },
  { label: 'Contact', url: '/contact' },
];

export const SOCIAL_MEDIA_ITEMS = [
  {
    name: 'Facebook',
    icon: 'icons/facebook.svg',
    url: 'https://www.facebook.com',
  },
  {
    name: 'Twitter',
    icon: 'icons/twitter.svg',
    url: 'https://www.twitter.com',
  },
  {
    name: 'LinkeIn',
    icon: 'icons/linkedIn.svg',
    url: 'https://www.linkedin.com',
  },
  {
    name: 'Youtube',
    icon: 'icons/youtube.svg',
    url: 'https://www.youtube.com',
  },
  {
    name: 'Instagram',
    icon: 'icons/instagram.svg',
    url: 'https://www.instagram.com',
  },
];

export const PROMOTION_DISCLAIMER =
  'Promotion valid only for pickup and express purchases, not valid with other coupons. Promotion valid only on Fridays.';

export enum RecordTypes {
  Size = 'size',
  Sauce = 'sauce',
  Cheese = 'cheese',
  Topping = 'topping',
  Drink = 'drink',
  Salad = 'salad',
  Appetizer = 'appetizer',
  Dessert = 'dessert',
}

export const CART_STEPS = [
  {
    icon: 'shopping_cart',
    label: 'Order placed',
  },
  {
    icon: 'local_pizza',
    label: 'Order being prepared',
  },
  {
    icon: 'directions_bike',
    label: 'Your order is on its way',
  },
  {
    icon: 'home',
    label: "They're outside! Go!",
  },
];
