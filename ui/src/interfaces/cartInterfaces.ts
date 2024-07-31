import { Product } from 'interfaces/productInterfaces';

export interface Cart {
  id: string;
  userId: string;
  date: string;
  products: [Product];
};
