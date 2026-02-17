import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  // ✅ Hooks must be called first (always)
  const { addToCart } = useContext(CartContext);

  const [selectedSpec, setSelectedSpec] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // ✅ Update state when product loads
  React.useEffect(() => {
    if (product) {
      setSelectedSpec(product.specs?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");
    }
  }, [product]);

  // ✅ Safe return after hooks
  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="product-card-wrapper">
      {/* ✅ Flip Card */}
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <h4>{product.name}</h4>
            <p className="price">₹ {product.price}</p>
            <p className="small-text">Hover to see details</p>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <h5>Select Options</h5>

            {/* ✅ Specs Dropdown */}
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
            >
              {product.specs?.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>

            {/* ✅ Colors Dropdown */}
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors?.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>

            {/* ✅ Add To Cart */}
            <button
              className="btn-add"
              onClick={() =>
                addToCart(product, selectedSpec, selectedColor, 1)
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Amazon Style Card */}
      <div className="amazon-card">
        <h4>{product.name}</h4>

        <p className="amazon-price">₹ {product.price}</p>

        <p className="amazon-desc">
          Category: {product.category}
        </p>

        <button
          className="amazon-btn"
          onClick={() =>
            addToCart(product, selectedSpec, selectedColor, 1)
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
