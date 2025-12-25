import { ProductContext } from "contexts/productsContext";
import { useContext } from "react";

export default function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}