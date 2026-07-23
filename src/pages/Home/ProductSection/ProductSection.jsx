// src/pages/Home/ProductSection/ProductSection.jsx
import { useState } from "react";
import {
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaArrowRight,
  FaFire,
  FaClock,
  FaTag,
  FaRocket,
} from "react-icons/fa";
import ProductModal from "../../../components/ProductModal/ProductModal";

import { formatTaka } from "../../../utils/currency";

const ProductSection = ({
  title,
  subtitle,
  products = [],
  badge = null,
  viewAllLink = "/shop",
  columns = 4,
  showRating = true,
  showAddToCart = true,
  showWishlist = true,
  showQuickView = true,
  cardStyle = "default",
  bgColor = "bg-white",
  sectionClass = "",
}) => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle card click
  const handleCardClick = (product, e) => {
    // Ignore if click is on Add to Cart button or its children
    if (e.target.closest("button")) return;
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Rating component
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-amber-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-slate-200" />);
    }
    return stars;
  };

  // Get card classes based on style
  const getCardClasses = () => {
    switch (cardStyle) {
      case "minimal":
        return "bg-white border border-slate-100 hover:border-amber-200 rounded-xl cursor-pointer";
      case "featured":
        return "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200/50 rounded-2xl shadow-lg hover:shadow-xl cursor-pointer";
      default:
        return "bg-white border border-slate-100 hover:border-amber-200 rounded-xl shadow-sm hover:shadow-md cursor-pointer";
    }
  };

  // Get badge color
  const getBadgeColor = (badgeType) => {
    switch (badgeType?.toLowerCase()) {
      case "hot":
        return "bg-red-500";
      case "sale":
        return "bg-emerald-500";
      case "new":
        return "bg-blue-500";
      case "trending":
        return "bg-purple-500";
      default:
        return "bg-amber-500";
    }
  };

  // Get badge icon
  const getBadgeIcon = (badgeType) => {
    switch (badgeType?.toLowerCase()) {
      case "hot":
        return <FaFire className="h-3 w-3" />;
      case "sale":
        return <FaTag className="h-3 w-3" />;
      case "new":
        return <FaRocket className="h-3 w-3" />;
      case "trending":
        return <FaClock className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <>
      <section
        className={`max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-8 ${sectionClass}`}
      >
        <div
          className={`${bgColor} rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden`}
        >
          {/* Section Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                {title}
                {badge && (
                  <span
                    className={`${getBadgeColor(badge)} text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1`}
                  >
                    {getBadgeIcon(badge)}
                    {badge}
                  </span>
                )}
              </h2>
              {subtitle && (
                <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <a
              href={viewAllLink}
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-xs md:text-sm font-medium hover:gap-2 transition-all duration-300 whitespace-nowrap"
            >
              View All
              <FaArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Products Grid */}
          <div className="p-3 md:p-5">
            <div
              className={`grid grid-cols-2 md:grid-cols-${columns} gap-3 md:gap-4`}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group relative ${getCardClasses()} transition-all duration-300 overflow-hidden`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={(e) => handleCardClick(product, e)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge on Image */}
                    {product.badge && (
                      <span
                        className={`absolute top-2 left-2 ${getBadgeColor(product.badge)} text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1`}
                      >
                        {getBadgeIcon(product.badge)}
                        {product.badge}
                      </span>
                    )}

                    {/* Quick Action Buttons */}
                    {(showQuickView || showWishlist) && (
                      <div
                        className={`absolute top-2 right-2 flex flex-col gap-1.5 transition-all duration-300 ${
                          hoveredProduct === product.id
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-4"
                        }`}
                      >
                        {showQuickView && (
                          <button
                            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-amber-100 text-slate-600 hover:text-amber-600 transition-colors shadow-sm"
                            title="Quick View"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(product, e);
                            }}
                          >
                            <FaEye className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {showWishlist && (
                          <button
                            className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-rose-100 text-slate-600 hover:text-rose-500 transition-colors shadow-sm"
                            title="Add to Wishlist"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log("Wishlist:", product.id);
                            }}
                          >
                            <FaHeart className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Discount Badge */}
                    {product.discount && (
                      <span className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 md:p-4">
                    {/* Category */}
                    {product.category && (
                      <p className="text-[10px] md:text-xs text-slate-400 mb-1">
                        {product.category}
                      </p>
                    )}

                    {/* Product Name */}
                    <h3 className="text-xs md:text-sm font-semibold text-slate-800 hover:text-amber-600 transition-colors line-clamp-2 mb-1">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    {showRating && product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center gap-0.5 text-[10px] md:text-xs">
                          {renderRating(product.rating)}
                        </div>
                        <span className="text-[10px] md:text-xs text-slate-400">
                          ({product.reviews || 0})
                        </span>
                      </div>
                    )}

                    {/* Price - Updated to Taka */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm md:text-base font-bold text-amber-600">
                        {formatTaka(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] md:text-xs text-slate-400 line-through">
                          {formatTaka(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {showAddToCart && (
                      <button
                        className={`w-full flex items-center justify-center gap-2 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 ${
                          hoveredProduct === product.id
                            ? "bg-amber-600 text-white hover:bg-amber-700"
                            : "bg-amber-50 text-amber-600 hover:bg-amber-100"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Add to cart:", product.id);
                        }}
                      >
                        <FaShoppingCart className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductSection;
