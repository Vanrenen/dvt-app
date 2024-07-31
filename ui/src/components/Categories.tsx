import { Box, Button } from '@mui/material';
import { Product } from '../interfaces/productInterfaces';
import Loading from './general/Loading';

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

  console.log(props.categories)

  return (
    <Box>
      { !props.categories ? (
        <Loading noOopaLoompas />
      ) : (
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
      )}
    </Box>
  )
};

export default Categories;