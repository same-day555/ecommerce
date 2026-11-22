
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
  return getCart().reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};

export const getLastOrder = () => {
  return JSON.parse(localStorage.getItem("lastOrder") || "null");
};
