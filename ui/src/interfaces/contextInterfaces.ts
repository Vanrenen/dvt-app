import { ReactNode } from "react";
import { CartItem } from "./productInterfaces";

export interface AuthContextType {
  login: (username: string, password: string) => Promise<string | null>;
  register: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

export interface AuthContetInterface {
  children: ReactNode;
};

export interface CartContextType {
  cart: CartItem[] | [];
  setCart: (cart: CartItem[] | []) => void;
}

export interface CartContextInterface {
  children: ReactNode;
};
