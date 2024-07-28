import axios from 'axios';

export const cartResolvers = {
  Query: {
    userCart: async (_: any, { id }: any) => {
      try {
        const response = await axios.get(`${process.env.FAKE_STORE_API}/carts/user/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
  }
};
