// src/components/Cart/CartSidebar.jsx
import { useState, useEffect } from "react";
import { FaShoppingCart, FaTimes, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Listen for custom event to open cart
  useEffect(() => {
    const handleOpenCart = () => {
      setIsOpen(true);
    };

    window.addEventListener("open-side-cart", handleOpenCart);

    // Prevent body scroll when cart is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("open-side-cart", handleOpenCart);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChatClick = () => {
    navigate("/chat");
  };

  return (
    <>
      {/* Floating Cart Button - Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Open cart"
      >
        <FaShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full ring-2 ring-white">
          0
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-linear-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-800">Your Cart</h2>
            <span className="text-xs font-medium text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
              0 items
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <FaTimes className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Empty Cart Message */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center p-4">
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
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>

        {/* Chat Button at Bottom of Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleChatClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors duration-300 hover:shadow-lg"
          >
            <FaCommentDots className="h-5 w-5" />
            Chat with Us
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">
              Live
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
