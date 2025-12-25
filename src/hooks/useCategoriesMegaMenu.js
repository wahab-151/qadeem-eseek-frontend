import {CategoryContext} from "../contexts/MegaMenuContext"
import { useContext } from "react";

export default function useCategoriesMegaMenu() {
 const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}