import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideCart from 'components/Cart';
import { CartContext } from 'context/CartContext';
import { CartItem } from 'interfaces/productInterfaces';

const mockToggleDrawer = jest.fn();
const mockSetCart = jest.fn();

const renderSideCart = (cart: CartItem[]) => {
  render(
    <CartContext.Provider value={{ cart, setCart: mockSetCart }}>
      <SideCart toggleDrawer={mockToggleDrawer} />
    </CartContext.Provider>
  );
};

describe('SideCart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders SideCart component', () => {
    renderSideCart([]);
    expect(screen.getByText('My cart')).toBeInTheDocument();
  });

  test('displays empty cart message', () => {
    renderSideCart([]);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('removes an item from the cart', () => {
    const cart: CartItem[] = [
      { id: '1', title: 'Item 1', price: '100', image: '', quantity: 1, description: 'hello' }
    ];
    renderSideCart(cart);

    fireEvent.click(screen.getByText('REMOVE'));

    expect(mockSetCart).toHaveBeenCalledWith([]);
  });

  test('exits the cart', () => {
    renderSideCart([]);

    fireEvent.click(screen.getByText('EXIT CART'));

    expect(mockToggleDrawer).toHaveBeenCalledWith(false);
  });
});
