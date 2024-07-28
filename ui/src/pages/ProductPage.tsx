import { useEffect, useState } from 'react';
import { useFetchProduct } from '../hooks/useProducts';
import { fetchProductIdFromUrl } from '../utils/productUtils';
import { Box, Container, Typography } from '@mui/material';
import Loading from '../components/Loading';
import { Product } from '../interfaces/productInterfaces';
import { currencyFormatter } from '../utils/currencyUtils';
import ErrorModal from '../components/Modals/ErrorModal';

const ProductPage = () => {
  const { loading, error, getProduct, data } = useFetchProduct();
  const [ id, setId ] = useState('')
  const [ product, setProduct ] = useState<Product>();

  useEffect(() => {
    getProduct(id)
  }, [id]);

  useEffect(() => {
    setId(fetchProductIdFromUrl());
  }, []);

  useEffect(() => {
    if (data?.product) {
      setProduct(data.product);
    }
  }, [data]);

  return (
    <Container>
      {error && !loading && (
        <ErrorModal error={error} />
      )}
      {!data && loading && (
        <Box style={{width: '100%', top: '50%', position: 'absolute'}}>
          <Typography variant='h4' sx={{textAlign: 'center'}}>The Oompa Loompa's are busy fetching your data!!</Typography>
         <Loading />
        </Box>
      )}
      {product && (
        <Container>
          <Typography variant='h3'>{product?.title}</Typography>
          <Box sx={{display: 'flex'}}>
            <img
                srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${product?.image}?w=248&fit=crop&auto=format`}
                alt={product.title}
                loading="lazy"
              />
              <Box>
                <Typography variant='h6'>Price: {currencyFormatter(product.price)}</Typography>
                <Box>Add to cart</Box>
              </Box>
            </Box>
            <Typography variant='h5'>About</Typography>
            <Typography variant='body1'>{product.description}</Typography>
          </Container>
      )}
    </Container>
  )
};

export default ProductPage;
