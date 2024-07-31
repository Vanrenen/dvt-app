import { Product } from 'interfaces/productInterfaces';
import { Cart } from 'interfaces/cartInterfaces';

export interface GraphQLResponse<T> {
  data?: T;
  errors?: any;
};

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

export interface UseFetchProductCategoriesResult {
  loading: boolean;
  error: string | null;
  getProductsCategories: () => Promise<[string] | null>;
  fetchedCategories: {
    [x: string]: any;
    productsCategories: [string] | null
  } | null;
};

export interface UseFetchuseFetchProductCategoryResult {
  fetchedProductCategoryLoading: boolean;
  fetchedProductCategoryError: string | null;
  getProductsCategory: (category: string) => Promise<[Product] | null>;
  fetchedProductCategory: {
    [x: string]: any;
    productsCategory: [Product] | null
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
