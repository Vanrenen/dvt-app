export interface Product {
  id: string;
  description: string;
  image: string;
  title: string;
  price: string;
};

export interface CartItem extends Product {
  quantity: number;
}