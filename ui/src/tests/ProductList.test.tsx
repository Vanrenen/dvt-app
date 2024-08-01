import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ProductList from 'components/ProductList';
import { Product } from 'interfaces/productInterfaces';
import '@testing-library/jest-dom';

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Product 1',
    price: '29.99',
    image: 'http://example.com/image1.jpg',
    description: 'hello'
  },
  {
    id: '2',
    title: 'Product 2',
    price: '39.99',
    image: 'http://example.com/image2.jpg',
    description: 'hello'
  },
];

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a list of products', () => {
    render(<ProductList products={mockProducts} />);

    // Check if each product title is in the document
    mockProducts.forEach(product => {
      const title = screen.getByText(product.title);
      expect(title).toBeInTheDocument();
    });
  });

});
