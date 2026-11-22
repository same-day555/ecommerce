
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/products";
import { getCart, saveCart } from "../data/storage";
import Navbar from "../components/Navbar";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="empty-state">
          <h2>Product Not Found</h2>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </>
    );
  }

  const addToCart = () => {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Maximum stock reached!");
        return;
      }
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert("Added to cart successfully!");
  };

  return (
    <>
      <Navbar />

      <main className="container detail-page">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Products
        </button>

        <div className="detail-card">
          <div className="detail-image">
            <span>{product.image}</span>
          </div>

          <div className="detail-info">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>

            <div className="rating">
              {"★".repeat(product.rating)}
              {"☆".repeat(5 - product.rating)}
            </div>

            <h2 className="detail-price">${product.price}</h2>

            <p>{product.description}</p>

            <p className="stock-info">
              <span>●</span> In Stock ({product.stock} available)
            </p>

            <button className="primary-btn" onClick={addToCart}>
              Add to Cart
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/cart")}
            >
              View Shopping Cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductDetail;
