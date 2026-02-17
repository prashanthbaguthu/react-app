import React from "react";
import { CartProvider } from "../modules/shop/context/CartContext";
import ProductList from "../modules/shop/components/ProductList";

const SalesDashboard = () => {
  return (
    <CartProvider>
      <div className="container mt-3">
        <h2>FlipCard / Shop Module</h2>
        <ProductList />
      </div>
    </CartProvider>
  );
};
export default SalesDashboard;
