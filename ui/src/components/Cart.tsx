import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Skeleton,
  Typography,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import CloseIcon from '@mui/icons-material/Close';
import CheckoutModal from './modals/CheckoutModal';
import Underline from './general/Underline';
import { CartItem } from '../interfaces/productInterfaces';
import { currencyFormatter } from '../utils/currencyUtils';

const SideCart = (props: { toggleDrawer: (arg0: boolean) => void; }) => {
  const [ openCheckout, setOpenCheckout ] = useState(false);
  const { cart, setCart } = useCart();

  const checkoutClicked = () => {
    setOpenCheckout(true);
  };

  const removeCartItem = (id: string) => {
    const bar = [];

    for (let i = 0; i < cart.length; i++) {
      if(cart[i].id !== id) {
        bar.push(cart[i]);
      }
    }

    setCart((bar as [CartItem]));
  };

  return (
    <Container sx={{
      width: '700px',
      overflow: 'auto'
    }}>
      <Typography
        variant='h4'
        sx={{display: 'inline-flex'}}
      >
        My cart
      </Typography>
      <Box sx={{
        float: 'right',
        padding: '10px',
        cursor: 'pointer'
        }}
        onClick={() => props.toggleDrawer(false)}
      >
        <CloseIcon />
      </Box>
      <Underline />

      {cart.length === 0 && (
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            paddingTop: '100px',
            paddingBottom: '50px'
          }}
        >
          <Typography variant='h4'>
            Your cart is empty
          </Typography>
          <Typography variant='body1'>
            Looks like you have not selected anything yet.
          </Typography>
          <Typography variant='body1'>
            Go ahead and explore our products!
          </Typography>
        </Box>
      )}

      {cart && cart.map((item: CartItem, index: number) => (
        <Box
          key={`product-${item.title}-${index}`}
          sx={{
            margin: '20px',
            borderBottom: '1px solid',
            paddingBottom: '5px',
            height: '150px',
          }}
        >
          {item.image ? (
            <img
              srcSet={`${item.image}?w=100&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image}?w=100&fit=crop&auto=format`}
              alt={item.title}
              loading='lazy'
              width='100px'
              height='100px'
              style={{
                display: 'inline-block'
              }}
            />
          ) : (
            <Skeleton
              variant='rectangular'
              width='100px'
              height='100px'
            />
          )}
          <Box sx={{
            display: 'inline-block',
            width: '450px',
            verticalAlign: 'top',
            float: 'right'
          }}>
            <Typography
              variant='h6'
              sx={{
                fontSize: '0.75rem',
                textAlign: 'right',
                display: 'block',
                fontWeight: '900',
                lineHeight: '25px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '0.75rem',
                textAlign: 'right',
                display: 'block',
                lineHeight: '25px',
              }}>
                {currencyFormatter(item.price)}
              </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: '0.75rem',
                textAlign: 'right',
                display: 'block',
                lineHeight: '25px',
              }}
            >
              {item.quantity ? item.quantity.toString() : '0'}
            </Typography>
            <Button
              variant='outlined'
              sx={{
                width: '75%',
                float: 'right',
                margin: '10px 0px 10px 10px'
              }}
              onClick={() => removeCartItem(item.id)}
            >
              REMOVE
            </Button>
          </Box>
        </Box>
      ))}
      <Box sx={{
        margin: '0 auto',
        width: '500px'
      }}>
      {cart.length !==0 && (
        <Button
          variant='contained'
          onClick={checkoutClicked}
          fullWidth
          sx={{marginBottom: '15px'}}
        >
          CHECK OUT NOW
        </Button>
      )}
        <Button
          variant='contained'
          onClick={() => props.toggleDrawer(false)}
          fullWidth
          sx={{marginBottom: '15px'}}
        >
          EXIT CART
        </Button>
      </Box>
      <CheckoutModal
        setOpen={setOpenCheckout}
        openCheckout={openCheckout}
      />
    </Container>
  )
};

export default SideCart;