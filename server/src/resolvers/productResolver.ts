import axios from 'axios';

export const productResolvers = {
  Query: {
    products: async () => {
      try {
        const response = await axios.get(`${process.env.FAKE_STORE_API}/products`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    product: async (_: any, { id }: any) => {
      try {
        const response = await axios.get(`${process.env.FAKE_STORE_API}/products/${id}`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    productsCategories: async () => {
      try {
        const response = await axios.get(`${process.env.FAKE_STORE_API}/products/categories`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    productsCategory: async (_: any, { category }: any) => {
      try {
        const response = await axios.get(`${process.env.FAKE_STORE_API}/products/categories/${category}`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
  }
};
