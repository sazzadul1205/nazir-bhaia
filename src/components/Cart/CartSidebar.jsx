// src/components/Cart/CartSidebar.jsx
import { useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaTimes,
  FaCommentDots,
  FaTrash,
  FaPlus,
  FaMinus,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { formatTaka } from "../../utils/currency";

const CartSidebar = () => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const {
    cartItems,
    isCartOpen,
    closeCart,
    openCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isCartOpen, closeCart]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  // Listen for custom event to open cart from anywhere
  useEffect(() => {
    const handleOpenCart = () => {
      // Use the context's openCart function directly - NO event dispatching!
      openCart();
    };

    window.addEventListener("open-side-cart", handleOpenCart);

    return () => {
      window.removeEventListener("open-side-cart", handleOpenCart);
    };
  }, [openCart]);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  const handleChatClick = () => {
    closeCart();
    navigate("/chat");
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `🛒 Order Summary:\n\n` +
        cartItems
          .map(
            (item) =>
              `${item.name} × ${item.quantity} = ${formatTaka(item.price * item.quantity)}`,
          )
          .join("\n") +
        `\n\nTotal: ${formatTaka(totalPrice)}`,
    );
    window.open(`https://wa.me/8801818186097?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Floating Cart Button - Bottom Right */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open cart"
      >
        <FaShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full ring-2 ring-white px-1.5">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Cart Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-linear-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-800">Your Cart</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ height: "calc(100vh - 180px)" }}
        >
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <FaShoppingCart className="h-10 w-10 text-amber-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-700">
                Your cart is empty
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Start shopping to add items
              </p>
              <button
                onClick={closeCart}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/300x300/F59E0B/FFFFFF?text=Product";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500">{item.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-amber-600">
                        {formatTaka(item.price)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-slate-50 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="h-3 w-3 text-slate-600" />
                        </button>
                        <span className="px-2 py-1 text-sm font-medium text-slate-700 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-slate-50 rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="h-3 w-3 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="self-start p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-200 bg-slate-50/80 p-4">
            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 mb-3 transition-colors"
            >
              <FaTrash className="h-3 w-3" />
              Clear Cart
            </button>

            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-semibold text-slate-800">
                  {formatTaka(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <span className="text-base font-bold text-slate-800">
                  Total
                </span>
                <span className="text-lg font-bold text-amber-600">
                  {formatTaka(totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-amber-200"
              >
                Proceed to Checkout
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  <FaWhatsapp className="h-4 w-4" />
                  WhatsApp Order
                </button>
                <button
                  onClick={handleChatClick}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors text-sm"
                >
                  <FaCommentDots className="h-4 w-4" />
                  Chat with Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
