// src/pages/NotFound/NotFound.jsx
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaArrowLeft,
  FaExclamationTriangle,
  FaStore,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[120px] md:text-[180px] font-extrabold leading-none select-none">
            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-pulse">
              404
            </span>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>

          {/* Small decorative icons */}
          <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 opacity-20">
            <FaStore className="h-12 w-12 text-amber-600" />
          </div>
          <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 opacity-20">
            <FaShoppingCart className="h-12 w-12 text-amber-600" />
          </div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-linear-to-br from-amber-100 to-orange-100 p-4 rounded-full">
              <FaExclamationTriangle className="h-12 w-12 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-lg mx-auto">
          <Link
            to="/"
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-full bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
              <FaHome className="h-5 w-5 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-amber-600">
              Home
            </span>
          </Link>

          <Link
            to="/shop"
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
              <FaStore className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-600">
              Shop
            </span>
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-full bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center transition-colors">
              <FaShoppingCart className="h-5 w-5 text-rose-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-rose-600">
              Cart
            </span>
          </Link>

          <Link
            to="/contact"
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 group"
          >
            <div className="h-10 w-10 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
              <FaHeart className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600">
              Contact
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-5 py-3 pl-12 rounded-full border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 outline-none transition-all duration-200 bg-white/80 backdrop-blur-sm text-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <button className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm rounded-full transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 group"
        >
          <FaArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
          <span className="ml-1">🏠</span>
        </Link>

        {/* Help Text */}
        <p className="text-xs text-slate-400 mt-6">
          Need help?{" "}
          <a href="/contact" className="text-amber-600 hover:underline">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
