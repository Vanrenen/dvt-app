import { ImageListItem, ImageListItemBar, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { currencyFormatter } from 'utils/currencyUtils';
import { Product } from 'interfaces/productInterfaces';

const ProductListItem = (props: {item: Product}) => {
  const navigate = useNavigate();

  const imageClicked = (id: string) => {
    navigate(`/product/${id}`)
  };

  return (
    <ImageListItem
          sx={{
            margin: '20px',
            boxShadow: '5px 10px #888888',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
          onClick={() => {
            imageClicked(props.item.id);
          }}
        >
          {props.item.image ? (
          <img
            srcSet={`${props.item.image}?w=250&fit=crop&auto=format&dpr=2 2x`}
            src={`${props.item.image}?w=250&fit=crop&auto=format`}
            alt={props.item.title}
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
            title={props.item.title}
            subtitle={<span>{currencyFormatter(props.item.price)}</span>}
          />
        </ImageListItem>
  )
};

export default ProductListItem;
