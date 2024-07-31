import {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { CartItem } from '../interfaces/productInterfaces';

interface CartContextType {
  cart: CartItem[] | [];
  setCart: (cart: CartItem[] | []) => void;
}

interface CartContextInterface {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

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