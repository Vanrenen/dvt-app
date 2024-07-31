import { useEffect, useState } from 'react';
import {
  useFetchCategories,
  useFetchProductCategory,
  useFetchProducts,
} from '../hooks/useProducts';
import { Product } from '../interfaces/productInterfaces';
import ProductList from '../components/ProductList';
import Loading from '../components/general/Loading';
import { Box, Container } from '@mui/material';
import ErrorModal from '../components/modals/ErrorModal';
import Header from '../components/general/Header';
import Categories from '../components/Categories';

const WelcomePage = () => {
  const { loading, error, getProducts, data } = useFetchProducts();
  const [ products, setProducts ] = useState<[Product] | []>([]);
  const { getProductsCategories, fetchedCategories } = useFetchCategories();
  const [ categories, setCategories ] = useState<[string]>();
  const { fetchedProductCategoryLoading, getProductsCategory, fetchedProductCategory } = useFetchProductCategory()


  useEffect(() => {
    getProducts();
    getProductsCategories();
  }, []);

  useEffect(() => {
    if (data?.products && data?.products?.length > 0) {
      setProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (fetchedProductCategory?.productsCategory && fetchedProductCategory?.productsCategory?.length > 0) {
      setProducts(fetchedProductCategory.productsCategory);
    }
  }, [fetchedProductCategory]);

  useEffect(() => {
    if (fetchedCategories?.productsCategories && fetchedCategories?.productsCategories?.length > 0) {
      setCategories(fetchedCategories.productsCategories);
    }
  }, [fetchedCategories]);

  return (
    <Box>
      <Header />
      <Categories
        categories={categories}
        getProductsCategory={getProductsCategory}
        getProducts={getProducts}
        setProducts={setProducts}
      />
      {error && !loading && (
        <ErrorModal error={error} />
      )}
      {((loading && !error) ||(fetchedProductCategoryLoading))  && (
        <Box style={{
          width: '100%',
          top: '50%',
          position: 'absolute',
          left: '0px',
        }}>
          <Loading />
        </Box>
      )} 
      {products.length > 0 && !loading && (
        <Container>
          <ProductList products={products} />
        </Container>
      )}
    </Box>
  );
};

export default WelcomePage;
