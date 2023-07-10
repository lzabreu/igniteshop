'use client'
import { CartContextProvider } from "@/contexts/CartContext";
import { ReactNode } from "react"

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <CartContextProvider>
      {children}
    </CartContextProvider>
  );
}