import { useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useProducts';
import { Product } from '../interfaces/productInterfaces';
import ProductList from '../components/ProductList';
import Loading from '../components/General/Loading';
import { Box, Typography } from '@mui/material';
import ErrorModal from '../components/Modals/ErrorModal';
import Header from '../components/General/Header';

const WelcomePage = () => {
  const { loading, error, getProducts, data } = useFetchProducts();
  const [ products, setProducts ] = useState<[Product] | []>([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (data?.products && data?.products?.length > 0) {
      setProducts(data.products);
    }
  }, [data]);

  return (
    <Box>
      <Header />
      {!error && !loading && (
        <ErrorModal error={error} />
      )}
      {loading && !error && (
        <Box style={{width: '100%', top: '50%', position: 'absolute', left: '0px'}}>
          <Typography variant='h4' sx={{textAlign: 'center'}}>The Oompa Loompa's are busy fetching your data!!</Typography>
          <Loading />
        </Box>
      )} 
      {products.length > 0 && !loading && (
        <ProductList products={products} />
      )}
    </Box>
  );
};

export default WelcomePage;
