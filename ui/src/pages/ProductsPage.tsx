import { FC, useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useProducts';
import { Product } from '../interfaces/productInterfaces';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import { Box, Container, Typography } from '@mui/material';
import ErrorModal from '../components/Modals/ErrorModal';

const WelcomePage: FC = () => {
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
    <Container>
      {error && !Loading && (
        <ErrorModal error={error} />
      )}
      {loading && !error && (
        <Box style={{width: '100%', top: '50%', position: 'absolute'}}>
          <Typography variant='h4' sx={{textAlign: 'center'}}>The Oompa Loompa's are busy fetching your data!!</Typography>
          <Loading />
        </Box>
      )} 
      {products.length > 0 && !loading && (
        <ProductList products={products} />
      )}
    </Container>
  );
};

export default WelcomePage;
