
import React from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { getCart, saveCart } from "../data/storage";
import Navbar from "../components/Navbar";

function Product() {
  const navigate = useNavigate();

  const addToCart = (product) => {
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
    alert(`${product.name} added to cart!`);
  };

  return (
    <>
      <Navbar />

      <main className="container">
        <section className="hero-banner">
          <div className="hero-content">
            <span className="hero-label">WELCOME TO E-SHOP</span>
            <h1>Discover Your<br />Favorite Technology</h1>
            <p>
              Find quality products at affordable prices.
              Make your shopping simple and enjoyable.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                document.getElementById("products").scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Shop Now →
            </button>
          </div>

          <div className="hero-emoji">🛍️</div>
        </section>

        <section id="products" className="product-section">
          <div className="section-heading">
            <div>
              <span className="section-subtitle">OUR COLLECTION</span>
              <h2>Featured Products</h2>
              <p>Explore our carefully selected products.</p>
            </div>
            <span className="product-total">04 Products</span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div
                  className="product-image"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <span className="featured-badge">Featured</span>
                  <span className="product-emoji">
                    {product.image}
                  </span>
                </div>

                <div className="product-content">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="rating">
                    {"★".repeat(product.rating)}
                    {"☆".repeat(5 - product.rating)}
                  </div>

                  <div className="product-bottom">
                    <strong className="price">
                      ${product.price}
                    </strong>

                    <button
                      className="add-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Product;
