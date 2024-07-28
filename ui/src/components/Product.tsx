import { Box, Typography } from '@mui/material';
import { Product } from '../interfaces/productInterfaces';
import { currencyFormatter } from '../utils/currencyUtils';

const ProductItem = (props: { product: Product }) => {

  console.log(props);
  return (
    <Box sx={{display: 'flex'}}>
      <img
        srcSet={`${props.product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${props.product?.image}?w=248&fit=crop&auto=format`}
        alt={props.product.title}
      />
      <Box>
        <Typography variant='h6'>Price: {currencyFormatter(props.product.price)}</Typography>
        <Box>Add to cart</Box>
      </Box>
    </Box>
  )
};

export default ProductItem;