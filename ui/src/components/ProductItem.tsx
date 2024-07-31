import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Product } from '../interfaces/productInterfaces';
import { currencyFormatter } from '../utils/currencyUtils';
import QuantitySelector from './General/QuantitySelector';

// TODO: incorporate as a memoized item
const ProductItem = (props: { product: Product }) => (
  <Box sx={{display: 'flex'}}>
    <img
      srcSet={`${props.product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
      src={`${props.product?.image}?w=248&fit=crop&auto=format`}
      alt={props.product.title}
    />
    <Box>
      <Typography variant='h6'>Price: {currencyFormatter(props.product.price)}</Typography>
      <QuantitySelector quantity='1' />
      <Button variant='contained'>Add to cart</Button>
    </Box>
  </Box>
);

export default ProductItem;