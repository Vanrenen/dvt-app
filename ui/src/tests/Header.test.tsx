import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import { isProductsPage } from 'utils/productUtils';
import Header from 'components/general/Header';

jest.mock('context/AuthContext');
jest.mock('utils/productUtils');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header component', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();
  const mockIsProductsPage = isProductsPage as jest.Mock;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });
    (require('react-router-dom').useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Header component', () => {
    mockIsProductsPage.mockReturnValue(false);

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  test('calls logout when logout button is clicked', () => {
    mockIsProductsPage.mockReturnValue(false);

    render(
      <Router>
        <Header />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalled();
  });

});
