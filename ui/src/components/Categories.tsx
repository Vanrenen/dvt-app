import { Box, Button } from '@mui/material';
import { Product } from '../interfaces/productInterfaces';

const Categories = (props: {
  setProducts(arg0: [Product] | []): unknown;
  getProducts(): unknown;
  getProductsCategory(item: string): unknown; categories: string[] | undefined 
}) => {

  const categoryClicked = (item: string) => {
    props.setProducts([]);
    props.getProductsCategory(item)
  };

  const allCategoriesClicked = () => {
    props.setProducts([]);
    props.getProducts();
  };

  return (
    <Box>
      <Button
        size='medium'
        key={'allCategores'}
        onClick={() => allCategoriesClicked()}
      >
        All
      </Button>
      {props?.categories?.map((item: string) => (
        <Button
        size='medium'
        key={item}
        onClick={() => categoryClicked(item)}
      >
        {item}
      </Button>
      ))}
    </Box>
  )
};

export default Categories;