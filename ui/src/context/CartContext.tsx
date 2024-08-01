import {
  FC,
  createContext,
  useState,
  useContext,
} from 'react';
import { CartItem } from 'interfaces/productInterfaces';
import { CartContextInterface, CartContextType } from 'interfaces/contextInterfaces';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<CartContextInterface> = ({ children }) => {
  const [ cart, setCart ] = useState<CartItem[] | []>([]);

  return (
    <CartContext.Provider
      value={{ cart, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};