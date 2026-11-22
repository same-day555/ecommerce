
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCartCount } from "../data/storage";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(getCartCount());

  useEffect(() => {
    const updateCount = () => setCount(getCartCount());

    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo" onClick={() => navigate("/")}>
          E-Shop<span>.</span>
        </div>

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/#products")}>Products</span>

          <button
            className="nav-cart"
            onClick={() => navigate("/cart")}
          >
            🛒 Cart <b>({count})</b>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
