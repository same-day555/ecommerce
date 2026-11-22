
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLastOrder } from "../data/storage";
import Navbar from "../components/Navbar";

function OrderConfirmation() {
  const navigate = useNavigate();
  const order = getLastOrder();

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="empty-state">
          <h2>No order found</h2>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Go Shopping
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container confirmation-page">
        <div className="confirmation-card">
          <div className="success-icon">✓</div>

          <h1>Order Confirmed!</h1>
          <p className="confirmation-text">
            Thank you for your purchase. Your order has been placed successfully.
          </p>

          <div className="confirmation-details">
            <h2>Order Details</h2>

            <div className="confirmation-row">
              <span>Order ID</span>
              <strong>#{order.orderId}</strong>
            </div>

            <div className="confirmation-row">
              <span>Customer</span>
              <strong>{order.customer.name}</strong>
            </div>

            <div className="confirmation-row">
              <span>Email</span>
              <strong>{order.customer.email}</strong>
            </div>

            <div className="confirmation-row">
              <span>Phone</span>
              <strong>{order.customer.phone}</strong>
            </div>

            <div className="confirmation-row">
              <span>Products</span>
              <strong>
                {order.items.map((item) => item.name).join(", ")}
              </strong>
            </div>

            <div className="confirmation-row">
              <span>Payment</span>
              <strong>{order.customer.payment}</strong>
            </div>

            <div className="confirmation-row">
              <span>Order Date</span>
              <strong>{order.date}</strong>
            </div>

            <div className="confirmation-row">
              <span>Total Amount</span>
              <strong className="price">${order.total.toFixed(2)}</strong>
            </div>

            <div className="confirmation-row">
              <span>Status</span>
              <strong className="status-success">{order.status}</strong>
            </div>
          </div>

          <button
            className="primary-btn full-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping →
          </button>
        </div>
      </main>
    </>
  );
}

export default OrderConfirmation;
