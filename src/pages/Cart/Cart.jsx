// src/pages/Cart/Cart.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaWhatsapp,
  FaCommentDots,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaGift,
  FaStore,
  FaHeart,
  FaShoppingBag,
  FaChevronRight,
} from "react-icons/fa";
import { useCart } from "../../hooks/useCart";
import { formatTaka } from "../../utils/currency";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Calculate savings (example: 15% of total)
  const savings = Math.round(totalPrice * 0.15);
  const subtotal = totalPrice;
  const deliveryFee = totalPrice > 5000 ? 0 : 120;
  const grandTotal = subtotal + deliveryFee;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeFromCart(productId);
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/checkout");
    }, 1500);
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
        `\n\nSubtotal: ${formatTaka(subtotal)}\n` +
        `Delivery: ${deliveryFee === 0 ? "Free" : formatTaka(deliveryFee)}\n` +
        `Total: ${formatTaka(grandTotal)}`,
    );
    window.open(`https://wa.me/8801818186097?text=${message}`, "_blank");
  };

  const handleChatClick = () => {
    navigate("/chat");
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-amber-50 rounded-full flex items-center justify-center">
              <FaShoppingCart className="h-16 w-16 text-amber-300" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-xl">!</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Your cart is empty
          </h2>
          <p className="text-slate-500 mb-8">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>

          <div className="space-y-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <FaShoppingBag className="h-4 w-4" />
              Start Shopping
              <FaChevronRight className="h-3 w-3" />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-medium transition-all duration-300"
            >
              <FaArrowLeft className="h-4 w-4" />
              Continue Browsing
            </Link>
          </div>

          {/* Suggestions */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-600 mb-4">
              You might like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  name: "Organic Honey",
                  price: 1559,
                  image:
                    "https://placehold.co/300x300/FFB300/FFFFFF?text=Honey",
                },
                {
                  name: "Premium Ghee",
                  price: 1079,
                  image: "https://placehold.co/300x300/2E7D32/FFFFFF?text=Ghee",
                },
                {
                  name: "Basmati Rice",
                  price: 1919,
                  image: "https://placehold.co/300x300/FFD700/FFFFFF?text=Rice",
                },
                {
                  name: "Olive Oil",
                  price: 2759,
                  image:
                    "https://placehold.co/300x300/4CAF50/FFFFFF?text=Olive",
                },
              ].map((product) => (
                <Link
                  key={product.name}
                  to={`/product/${product.name.toLowerCase().replace(/ /g, "-")}`}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-amber-300 transition-all duration-300 hover:shadow-md"
                >
                  <div className="aspect-square bg-slate-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h4 className="text-xs font-medium text-slate-700 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-amber-600">
                      {formatTaka(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Your Cart
          </h1>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
        <button
          onClick={handleClearCart}
          className="text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
        >
          <FaTrash className="h-3 w-3" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items - 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-200 transition-all duration-300 p-4 md:p-5 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md"
            >
              {/* Product Image */}
              <div className="sm:w-32 h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0">
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
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 mb-0.5">
                      {item.category}
                    </p>
                    <h3 className="text-sm md:text-base font-semibold text-slate-800 hover:text-amber-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="inline-block text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full mt-1">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Price and Remove on mobile */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <span className="text-base md:text-lg font-bold text-amber-600">
                      {formatTaka(item.price)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1 hover:bg-rose-50 rounded-lg"
                      aria-label="Remove item"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-3 py-1.5 hover:bg-slate-50 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="h-3 w-3 text-slate-600" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-medium text-slate-700 min-w-10 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1.5 hover:bg-slate-50 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="h-3 w-3 text-slate-600" />
                    </button>
                  </div>

                  <span className="text-xs text-slate-400">
                    Total:{" "}
                    <span className="font-semibold text-slate-700">
                      {formatTaka(item.price * item.quantity)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors mt-2"
          >
            <FaArrowLeft className="h-3 w-3" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary - 1/3 on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium text-slate-800">
                  {formatTaka(subtotal)}
                </span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span className="flex items-center gap-1">
                    <FaGift className="h-3 w-3" />
                    Savings
                  </span>
                  <span className="font-medium">-{formatTaka(savings)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Delivery</span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    formatTaka(deliveryFee)
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between">
                <span className="text-base font-bold text-slate-800">
                  Total
                </span>
                <span className="text-xl font-bold text-amber-600">
                  {formatTaka(grandTotal)}
                </span>
              </div>

              {deliveryFee > 0 && (
                <p className="text-xs text-slate-500">
                  Add {formatTaka(5000 - subtotal)} more for free delivery
                </p>
              )}
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-3 gap-2 py-3 border-t border-slate-100">
              <div className="text-center">
                <FaTruck className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500">Free Delivery</p>
              </div>
              <div className="text-center">
                <FaShieldAlt className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500">Secure Payment</p>
              </div>
              <div className="text-center">
                <FaUndo className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-[10px] text-slate-500">Easy Returns</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isProcessing
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaShoppingBag className="h-4 w-4" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors text-sm"
              >
                <FaWhatsapp className="h-4 w-4" />
                Order via WhatsApp
              </button>

              <button
                onClick={handleChatClick}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors text-sm"
              >
                <FaCommentDots className="h-4 w-4" />
                Chat with Support
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <FaStore className="h-3 w-3" />
                  Verified Store
                </span>
                <span className="flex items-center gap-1">
                  <FaHeart className="h-3 w-3 text-rose-400" />
                  10,000+ Happy Customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
