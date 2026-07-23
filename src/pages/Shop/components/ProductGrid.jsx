// src/pages/Shop/components/ProductGrid.jsx
import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaEye,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { formatTaka } from "../../../utils/currency";

const ProductCard = ({ product, viewMode, onProductClick, addToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderRating = (rating) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-amber-400 text-xs" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-amber-400 text-xs" />,
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} className="text-slate-200 text-xs" />);
    }
    return stars;
  };

  const getBadgeColor = (badge) => {
    if (!badge) return "";
    const colors = {
      hot: "bg-red-500",
      sale: "bg-emerald-500",
      new: "bg-blue-500",
      trending: "bg-purple-500",
      "best seller": "bg-amber-500",
      popular: "bg-orange-500",
    };
    return colors[badge.toLowerCase()] || "bg-amber-500";
  };

  return (
    <div
      className={`group bg-white rounded-xl border border-slate-200 hover:border-amber-300 overflow-hidden transition-all duration-300 ${viewMode === "list" ? "flex" : ""} hover:shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative ${viewMode === "list" ? "w-48 h-48 shrink-0" : "aspect-square"} overflow-hidden bg-slate-50`}
      >
        <img
          src={
            product.image ||
            "https://placehold.co/300x300/F59E0B/FFFFFF?text=Product"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onProductClick(product)}
        />
        {product.badge && (
          <span
            className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-[10px] font-bold px-2 py-1 rounded-md`}
          >
            {product.badge}
          </span>
        )}
        {product.discount && (
          <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            -{product.discount}%
          </span>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"} hover:bg-rose-50`}
        >
          {isWishlisted ? (
            <FaHeart className="h-4 w-4 text-rose-500" />
          ) : (
            <FaRegHeart className="h-4 w-4 text-slate-600" />
          )}
        </button>
        <button
          onClick={() => onProductClick(product)}
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <span className="bg-white text-slate-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-amber-50 transition-colors">
            <FaEye className="h-4 w-4" /> Quick View
          </span>
        </button>
      </div>

      <div
        className={`flex-1 p-3 md:p-4 flex flex-col ${viewMode === "list" ? "justify-center" : ""}`}
      >
        {product.category && (
          <p className="text-[10px] md:text-xs text-slate-400 mb-1">
            {product.category}
          </p>
        )}
        <h3
          className="text-sm md:text-base font-semibold text-slate-800 hover:text-amber-600 transition-colors line-clamp-2 cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5 text-[10px] md:text-xs">
              {renderRating(product.rating)}
            </div>
            <span className="text-[10px] md:text-xs text-slate-400">
              ({product.reviews || 0})
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm md:text-base font-bold text-amber-600">
            {formatTaka(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] md:text-xs text-slate-400 line-through">
              {formatTaka(product.originalPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product, 1)}
          className={`mt-3 w-full flex items-center justify-center gap-2 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
            isHovered
              ? "bg-amber-600 text-white hover:bg-amber-700"
              : "bg-amber-50 text-amber-600 hover:bg-amber-100"
          }`}
        >
          <FaShoppingCart className="h-3 w-3 md:h-3.5 md:w-3.5" /> Add to Cart
        </button>
        {viewMode === "list" && product.description && (
          <p className="text-xs text-slate-500 mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
};

const ProductGrid = ({
  products,
  viewMode,
  onProductClick,
  addToCart,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
        <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSearch className="h-10 w-10 text-amber-300" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          No products found
        </h3>
        <p className="text-slate-500 mb-6">
          Try adjusting your filters or search term
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-4`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onProductClick={onProductClick}
            addToCart={addToCart}
          />
        ))}
      </div>
     
    </>
  );
};

export default ProductGrid;
