import { SetStateAction, useEffect, useState } from 'react';
import { useFetchProduct } from '../hooks/useProducts';
import { fetchProductIdFromUrl } from '../utils/productUtils';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import Loading from '../components/General/Loading';
import { CartItem, Product } from '../interfaces/productInterfaces';
import { currencyFormatter } from '../utils/currencyUtils';
import ErrorModal from '../components/Modals/ErrorModal';
import Header from '../components/General/Header';
import QuantitySelector from '../components/General/QuantitySelector';
import Underline from '../components/General/Underline';

const ProductPage = () => {
  const { loading, error, getProduct, data } = useFetchProduct();
  const [ id, setId ] = useState('')
  const [ product, setProduct ] = useState<Product>();
  const { cart, setCart } = useCart();
  const [ quantity, setQuantity ] = useState('1');

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

  const addToCart = (item: Product) => {
    if (!cart.find(cartItem => cartItem.id === item.id)) {
      const quantityAdded = {
        ...item,
        quantity: parseInt(quantity) || 1
      }

      const newCart: CartItem[] = cart;
      newCart.push(quantityAdded)
      setCart(newCart);

    } else {
    cart.find(cartItem => {
      if (cartItem.id === item.id) {
        cartItem.quantity ? cartItem.quantity++ : cartItem.quantity = 0;
      }
    });
    setCart(cart)
  }
    
  };

  return (
    <Box sx={{height: '100vh'}}>
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
          }}>
            <Box sx={{
              borderRadius: '25px',
              marginRight: '25px',
              overflow: 'hidden'

            }}>
              <img
                  srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${product?.image}?w=248&fit=crop&auto=format`}
                  alt={product.title}
                  loading='lazy'
                />
              </Box>
              <Box>
                <Typography variant='h4'>Price: {currencyFormatter(product.price)}</Typography>
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                <Button
                  variant='contained'
                  sx={{
                    display: 'block',
                  }}
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </Button>
                <List>
                  <ListItem>Free delivery</ListItem>
                  <ListItem>Easy returns</ListItem>
                  <ListItem>Unlimited warranty</ListItem>
                </List>
              </Box>
            </Box>
            <Underline />
            <Typography variant='h5'>About</Typography>
            <Typography variant='body1'>{product.description}</Typography>
          </Container>
      )}
    </Box>
  )
};

export default ProductPage;
