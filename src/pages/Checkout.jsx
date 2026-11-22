
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, saveCart } from "../data/storage";
import Navbar from "../components/Navbar";

function Checkout() {
  const navigate = useNavigate();
  const cart = getCart();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/");
      return;
    }

    const order = {
      orderId: "ORD" + Date.now().toString().slice(-6),
      customer: { ...customer },
      items: cart,
      subtotal,
      shipping,
      total,
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    const oldOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...oldOrders, order])
    );

    saveCart([]);
    navigate("/confirmation");
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Shop Now
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container checkout-page">
        <div className="page-heading">
          <span className="section-subtitle">ALMOST THERE</span>
          <h1>Checkout</h1>
          <p>Complete your information to place your order.</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form">
            <h2>Customer Information</h2>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={customer.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={customer.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                name="address"
                placeholder="Enter your delivery address"
                value={customer.address}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="payment"
                value={customer.payment}
                onChange={handleChange}
              >
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <button
              type="button"
              className="continue-btn"
              onClick={() => navigate("/cart")}
            >
              ← Back to Cart
            </button>
          </div>

          <div className="order-summary">
            <h2>Your Order</h2>

            {cart.map((item) => (
              <div className="checkout-product" key={item.id}>
                <span>{item.image} {item.name} × {item.quantity}</span>
                <strong>${item.price * item.quantity}</strong>
              </div>
            ))}

            <div className="summary-divider" />

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
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button type="submit" className="primary-btn full-btn">
              Confirm Order
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Checkout;
