import { ImageList } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from 'interfaces/productInterfaces';
import ProductItem from 'components/ProductItem';

const ProductList = (props: { products: Product[]; }) => {
  const navigate = useNavigate();

  const imageClicked = (id: string) => {
    navigate(`/product/${id}`)
  };

  return (
    <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
      {props.products.map((item: Product, index: number) => (
        <ProductItem
          key={index}
          imageClicked={imageClicked}
          product={item}
        />
      ))}
    </ImageList>
  );
};

export default ProductList;