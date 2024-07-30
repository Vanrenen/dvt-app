import { useCallback } from 'react';
import useGraphQL from './useGraphql';
import { Product } from '../interfaces/productInterfaces';
import { UseFetchProductsResult, UseFetchProductResult, UseFetchProductCategoriesResult, UseFetchuseFetchProductCategoryResult } from '../interfaces/hookInterfaces';

export const useFetchProducts = (): UseFetchProductsResult => {
  const { loading, error, data, query } = useGraphQL<{ products: [Product]}>(process.env.REACT_APP_GRAPHQL_API);
  
  const getProducts = useCallback(
    async () => {
      await query(
        `
        query GetProducts {
          products {
            id
            title
            price
            description
            image
          }
        }
      `,
      );

      return data?.products || null;
    },
    [query, data]
  );

  return { loading, error, getProducts, data };
};

export const useFetchProduct = (): UseFetchProductResult => {
  const { loading, error, data, query } = useGraphQL<{ product: Product }>(process.env.REACT_APP_GRAPHQL_API);
  
  const getProduct = useCallback(
    async (id: string) => {

      await query(
        `
        query GetProduct ($id: String!) {
          product (id: $id) {
            id
            title
            price
            description
            image
          }
        }
      `,
      { id }
      );

      return data?.product || null;
    },
    [query, data]
  );

  return { loading, error, getProduct, data };
};

export const useFetchCategories = (): UseFetchProductCategoriesResult => {
  const { loading, error, data, query } = useGraphQL<{ productsCategories: [string]}>(process.env.REACT_APP_GRAPHQL_API);
  
  const getProductsCategories = useCallback(
    async () => {
      await query(
        `
        query GetProductsCategories {
          productsCategories
        }
      `,
      );

      return data?.productsCategories || null;
    },
    [query, data]
  );

  return { loading, error, getProductsCategories, fetchedCategories: data };
};

export const useFetchProductCategory = (): UseFetchuseFetchProductCategoryResult => {
  const { loading, error, data, query } = useGraphQL<{ productsCategory: [Product]}>(process.env.REACT_APP_GRAPHQL_API);
  
  const getProductsCategory = useCallback(
    async (category: string) => {
      await query(
        `
        query GetProductsCategories($category: String!) {
          productsCategory(category: $category) {
            description
            id
            image
            price
            title
          }
        }
      `,
      { category }
      );

      return data?.productsCategory || null;
    },
    [query, data]
  );

  return { fetchedProductCategoryLoading: loading, fetchedProductCategoryError: error, getProductsCategory, fetchedProductCategory: data };
};
