import { useCallback } from 'react';
import useGraphQL from 'hooks/useGraphql';
import { UseFetchUserCartResult } from 'interfaces/hookInterfaces';
import { Cart } from 'interfaces/cartInterfaces';


export const useGetUserCart = (): UseFetchUserCartResult => {
  const { loading, error, data, query } = useGraphQL<Cart>(process.env.REACT_APP_GRAPHQL_API);

  const getCart = useCallback(
    async () => {
      await query(
        `
        query GetCart ($id: String!) {
          userCart(id: $userCartId) {
            date
            id
            products
            userId
          }
        }
      `,
      );

      return data || null;
    },
    [query, data]

  )

  return { loading, error, getCart, data };
};
