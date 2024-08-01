import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Categories from 'components/Categories';
import Loading from 'components/general/Loading';

describe('Categories Component', () => {
  const mockSetProducts = jest.fn();
  const mockGetProducts = jest.fn();
  const mockGetProductsCategory = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders category buttons when categories are provided', () => {
    render(
      <Categories
        setProducts={mockSetProducts}
        getProducts={mockGetProducts}
        getProductsCategory={mockGetProductsCategory}
        categories={['Category 1', 'Category 2']}
      />
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('clicking "All" button calls getProducts and setProducts with empty array', () => {
    render(
      <Categories
        setProducts={mockSetProducts}
        getProducts={mockGetProducts}
        getProductsCategory={mockGetProductsCategory}
        categories={['Category 1']}
      />
    );

    fireEvent.click(screen.getByText('All'));
    
    expect(mockSetProducts).toHaveBeenCalledWith([]);
    expect(mockGetProducts).toHaveBeenCalled();
  });

  test('clicking category button calls getProductsCategory with correct argument and setProducts with empty array', () => {
    render(
      <Categories
        setProducts={mockSetProducts}
        getProducts={mockGetProducts}
        getProductsCategory={mockGetProductsCategory}
        categories={['Category 1']}
      />
    );

    fireEvent.click(screen.getByText('Category 1'));
    
    expect(mockSetProducts).toHaveBeenCalledWith([]);
    expect(mockGetProductsCategory).toHaveBeenCalledWith('Category 1');
  });
});
