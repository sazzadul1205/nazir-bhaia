// src/utils/cartHelpers.js
export const openCart = () => {
  window.dispatchEvent(new CustomEvent("open-side-cart"));
};

// You can also add other cart-related helpers here
export const closeCart = () => {
  window.dispatchEvent(new CustomEvent("close-side-cart"));
};
