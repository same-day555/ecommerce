
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart } from "../data/storage";
import Navbar from "../components/Navbar";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());

  const updateCart = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  const increase = (id) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          }
        : item
    );

    updateCart(newCart);
  };

  const decrease = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(newCart);
  };

  const removeItem = (id) => {
    updateCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 10 : 0;

  return (
    <>
      <Navbar />

      <main className="container cart-page">
        <div className="page-heading">
          <span className="section-subtitle">YOUR SHOPPING</span>
          <h1>Shopping Cart</h1>
          <p>Review your selected products before checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet.</p>
            <button className="primary-btn" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div
                    className="cart-product-image"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.image}
                  </div>

                  <div className="cart-product-info">
                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <strong>${item.price}</strong>

                    <div className="quantity-control">
                      <button onClick={() => decrease(item.id)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increase(item.id)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <strong>
                      ${(item.price * item.quantity).toFixed(2)}
                    </strong>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong>${shipping.toFixed(2)}</strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <span>Total</span>
                <strong>${(subtotal + shipping).toFixed(2)}</strong>
              </div>

              <button
                className="primary-btn full-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>

              <button
                className="continue-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Cart;
