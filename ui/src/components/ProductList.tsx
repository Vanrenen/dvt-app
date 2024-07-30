import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from '@mui/material';
import { Product } from '../interfaces/productInterfaces';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from '../utils/currencyUtils';

const ProductList = (props: { products: Product[]; }) => {
  const navigate = useNavigate();

  const imageClicked = (id: string) => {
    navigate(`/product/${id}`)
  };

  return (
    <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
      {props.products.map((item: Product) => (
        // TODO: memoize this
        <ImageListItem
          key={`product-${item.title}`}
          sx={{
            margin: '20px',
            boxShadow: '5px 10px #888888',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            imageClicked(item.id);
          }}
        >
          {item.image ? (
            <img
              srcSet={`${item.image}?w=250&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image}?w=250&fit=crop&auto=format`}
              alt={item.title}
              loading='lazy'
              width='325px'
              height='465px'
            />
          ) : (
            <Skeleton
              variant='rectangular'
              width='325px'
              height='465px'
            />
          )}
          <ImageListItemBar
            title={item.title}
            subtitle={<span>{currencyFormatter(item.price)}</span>}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProductList;