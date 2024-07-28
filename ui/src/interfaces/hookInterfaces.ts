import { Product } from "./productInterfaces";
import { Cart } from "./cartInterfaces";

export interface UseFetchProductsResult {
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<[Product] | null>;
  data: {
    [x: string]: any;
    products: [Product] | null
  } | null;
};

export interface UseFetchProductResult {
  loading: boolean;
  error: string | null;
  getProduct: (id: string) => Promise<Product | null>;
  data: {
    product: Product | null
  } | null;
};

export interface UseFetchUserCartResult {
  loading: boolean;
  error: string | null;
  getCart: () => Promise<Cart | null>;
  data: Cart | null;
};

export interface UseLoginResult {
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<string | null>;
  data: any;
};

export interface UseRegisterResult {
  registerLoading: boolean;
  registerError: string | null;
  register: (username: string, password: string) => Promise<string | null>;
  registerData: {
    registerUser: {
      id: string;
    }
  } | null;
};
