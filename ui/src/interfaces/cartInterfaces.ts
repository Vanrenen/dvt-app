import { Product } from "./productInterfaces";

export interface Cart {
  id: string;
  userId: string;
  date: string;
  products: [Product];
};
