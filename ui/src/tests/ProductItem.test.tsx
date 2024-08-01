import { render, screen, fireEvent } from '@testing-library/react';
import { Product } from 'interfaces/productInterfaces';
import ProductItem from 'components/ProductItem';
import { currencyFormatter } from 'utils/currencyUtils';
import '@testing-library/jest-dom';

// Mock currencyFormatter function
jest.mock('utils/currencyUtils', () => ({
  currencyFormatter: jest.fn((price: number) => `$${price.toFixed(2)}`)
}));

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  price: '29.99',
  image: 'http://example.com/image.jpg',
  description: 'hello'
};

const mockImageClicked = jest.fn();

describe('ProductItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles click event', () => {
    render(<ProductItem product={mockProduct} imageClicked={mockImageClicked} />);

    // Simulate click event
    const imageListItem = screen.getByRole('img').closest('div');
    if (imageListItem) {
      fireEvent.click(imageListItem);
    }

    // Check if the imageClicked function is called with the correct argument
    expect(mockImageClicked).toHaveBeenCalledWith('1');
  });

});
