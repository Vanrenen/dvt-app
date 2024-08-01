import { memo } from 'react';
import {
  Box,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';
import { Product } from 'interfaces/productInterfaces';
import { currencyFormatter } from 'utils/currencyUtils';

const ProductItem = (props: {
  imageClicked(id: string): unknown; product: Product 
}) => (
  <ImageListItem
    key={`product-${props.product.title}`}
    sx={{
      margin: '20px',
      cursor: 'pointer',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '10px 10px #888'
    }}
    onClick={() => {
      props.imageClicked(props.product.id);
    }}
  >
    {props.product.image ? (
      <Box sx={{
        width: '350px',
        height: '450px',
        background: '#fff',
      }}>
        <img
          srcSet={`${props.product.image}?w=350&fit=crop&auto=format&dpr=2 2x`}
          src={`${props.product.image}?w=350&fit=crop&auto=format&dpr=2 2x`}
          alt={props.product.title}
          loading='lazy'
          style={{
            width: '350px',
            height: '450px',
          }}
          
        />
      </Box>
    ) : (
      <Box sx={{
        width: '350px',
        height: '450px',
        background: '#fff',
      }}>
      <Skeleton
        variant='rectangular'
        width='350px'
        height='450px'
      />
      </Box>
    )}
    <ImageListItemBar
      title={props.product.title}
      subtitle={<span>{currencyFormatter(props.product.price)}</span>}
    />
  </ImageListItem>
);

export default memo(ProductItem);