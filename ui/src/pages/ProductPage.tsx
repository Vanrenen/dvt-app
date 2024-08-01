import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useCart } from 'context/CartContext';
import { useFetchProduct } from 'hooks/useProducts';
import { fetchProductIdFromUrl } from 'utils/productUtils';
import { currencyFormatter } from 'utils/currencyUtils';
import { CartItem, Product } from 'interfaces/productInterfaces';
import Loading from 'components/general/Loading';
import ErrorModal from 'components/modals/ErrorModal';
import Header from 'components/general/Header';
import QuantitySelector from 'components/general/QuantitySelector';
import Underline from 'components/general/Underline';

const ProductPage = () => {
  const { loading, error, getProduct, data } = useFetchProduct();
  const [ id, setId ] = useState('')
  const [ product, setProduct ] = useState<Product>();
  const { cart, setCart } = useCart();
  const [ quantity, setQuantity ] = useState('1');

  useEffect(() => {
    getProduct(id)
    // Adding getProduct as a dependency here will cause an infinite render loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setId(fetchProductIdFromUrl());
  }, []);

  useEffect(() => {
    if (data?.product?.id) {
      setProduct(data.product);
    }
  }, [data]);

  const addToCart = (item: Product) => {
    if (!cart.find(cartItem => { return cartItem.id === item.id})) {
      const quantityAdded = {
        ...item,
        quantity: parseInt(quantity) || 1
      }

      const newCart: CartItem[] = cart;
      newCart.push(quantityAdded)
      setCart(newCart);

    } else {
      for (let i = 0; i < cart.length; i++ ) {
        if (cart[i].id === item.id) {
          cart[i].quantity ? cart[i].quantity++ : cart[i].quantity = 0;
        }
      };
    setCart(cart)
  }
    
  };

  return (
    <Box sx={{height: '100%', minHeight: '100vh'}}>
      <Header />
      {error && !loading && (
        <ErrorModal error={error} />
      )}
      {!data && loading && (
        <Box sx={{
          width: '100%',
          top: '50%',
          position: 'absolute',
          left: '0px',
        }}>
          <Loading />
        </Box>
      )}
      {product && (
        <Container sx={{
          marginTop: '25px',
        }}>
          <Typography variant='h3'>{product.title}</Typography>
          <Box sx={{
            display: 'flex',
            marginBottom: '25px',
            marginTop: '50px'
          }}>
            <Box sx={{
              borderRadius: '25px',
              marginRight: '50px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff'

            }}>
              <img
                  srcSet={`${product.image}?w=350&fit=crop&auto=format&dpr=2 2x`}
                  src={`${product?.image}`}
                  alt={product.title}
                  loading='lazy'
                  width={'350px'}
                  height={'450px'}
                />
              </Box>
              <Box padding={'25px'}>
              <Typography variant='h5' sx={{marginTop: '25px'}}>
                  We offer:
                </Typography>
                <List>
                  <ListItem>Free delivery</ListItem>
                  <ListItem>Easy returns</ListItem>
                  <ListItem>Unlimited warranty</ListItem>
                </List>
                <Typography variant='h4'>Price: {currencyFormatter(product.price)}</Typography>
                <Box sx={{
                  display: 'flex',
                  marginTop: '25px',
                  marginBottom: '15px'
                }}>
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </Box>
                <Button
                  variant='contained'
                  sx={{
                    display: 'block',
                  }}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
            <Underline />
            <Box sx={{
              width: '75%',
              margin: '0 auto',
              paddingTop: '50px'
            }}>
              <Typography variant='h5'>About</Typography>
              <Typography variant='body1' marginTop={'20px'}>{product.description}</Typography>
            </Box>
          </Container>
      )}
    </Box>
  )
};

export default ProductPage;
