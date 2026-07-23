// src/components/ProductModal/ProductModal.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaStar,
  FaStarHalfAlt,
  FaHeart,
  FaShoppingCart,
  FaShareAlt,
  FaMinus,
  FaPlus,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaCalendarAlt,
  FaThumbsUp,
  FaExpand,
  FaWhatsapp,
  FaPhone,
  FaBolt,
} from "react-icons/fa";
import { getData } from "../../api/apiService";
import { formatTaka } from "../../utils/currency";
import { useCart } from "../../hooks/useCart";

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [contactInfo, setContactInfo] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const imageContainerRef = useRef(null);
  const modalRef = useRef(null);
  const prevIsOpenRef = useRef(isOpen);

  const { addToCart } = useCart();

  // Fetch contact and delivery info
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const result = await getData();
        if (result.success) {
          setContactInfo(result.data.contactInfo);
          setDeliveryInfo(result.data.deliveryInfo);
        }
      } catch (error) {
        console.error("Failed to fetch config:", error);
      }
    };
    fetchConfig();
  }, []);

  // Additional images
  const additionalImages = product?.images || [
    product?.image,
    "https://picsum.photos/seed/1/600/600",
    "https://picsum.photos/seed/2/600/600",
    "https://picsum.photos/seed/3/600/600",
  ];

  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-12-15",
      comment: "Excellent product! Exactly as described. Highly recommend.",
      helpful: 24,
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-12-10",
      comment: "Great quality, fast shipping. Would buy again.",
      helpful: 18,
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2024-12-05",
      comment: "Perfect for my needs. Very satisfied with the purchase.",
      helpful: 12,
    },
  ];

  const statistics = {
    sold: 1247,
    rating: 4.8,
    reviews: 342,
    views: 5231,
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!prevIsOpenRef.current) {
        setSelectedImage(0);
        setQuantity(1);
        setIsZoomed(false);
        setActiveTab("description");
      }
      prevIsOpenRef.current = true;
    } else {
      document.body.style.overflow = "unset";
      prevIsOpenRef.current = false;
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-amber-400 text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-amber-400 text-sm" />,
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-slate-200 text-sm" />,
      );
    }
    return stars;
  };

  const handleImageZoom = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleBuyNowWhatsApp = () => {
    if (!contactInfo) return;
    const total = product.price * quantity;
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing:\n\n` +
        `Product: ${product.name}\n` +
        `Price: ${formatTaka(product.price)}\n` +
        `Quantity: ${quantity}\n` +
        `Total: ${formatTaka(total)}\n\n` +
        `Please let me know the availability and payment options.`,
    );
    const url = `https://wa.me/${contactInfo.whatsapp}?text=${message}`;
    window.open(url, "_blank");
  };

  const handleBuyNowCall = () => {
    if (!contactInfo) return;
    window.location.href = `tel:${contactInfo.phone}`;
  };

  if (!isOpen || !product) return null;

  const currentImage = additionalImages[selectedImage] || product.image;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl animate-slideUp relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/90 hover:bg-slate-100 rounded-full transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <FaTimes className="h-5 w-5 text-slate-600" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left - Image Gallery */}
          <div className="lg:w-1/2 bg-slate-50 p-4 lg:p-6 flex flex-col">
            <div
              ref={imageContainerRef}
              className="relative flex-1 min-h-75 lg:min-h-100 bg-white rounded-xl overflow-hidden cursor-zoom-in group"
              onMouseMove={handleImageZoom}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={toggleZoom}
            >
              <img
                src={currentImage}
                alt={product.name}
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
              />

              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1.5">
                <FaExpand className="h-3 w-3" />
                Click to zoom
              </div>

              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              {product.discount && (
                <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            {additionalImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-amber-500 ring-2 ring-amber-200"
                        : "border-slate-200 hover:border-amber-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-amber-500/10" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Details */}
          <div className="lg:w-1/2 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="mb-4">
                {product.category && (
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                )}
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    {renderRating(product.rating || 4.5)}
                  </div>
                  <span className="text-sm text-slate-500">
                    ({statistics.reviews} reviews)
                  </span>
                  <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <FaCheckCircle className="h-3 w-3" />
                    In Stock
                  </span>
                </div>
              </div>

              {/* Price - Updated to Taka */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <span className="text-2xl md:text-3xl font-bold text-amber-600">
                  {formatTaka(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatTaka(product.originalPrice)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    Save {formatTaka(product.originalPrice - product.price)}
                  </span>
                )}
              </div>

              <div className="border-b border-slate-100 mb-4">
                <div className="flex gap-1 overflow-x-auto">
                  {[
                    { id: "description", label: "Description" },
                    { id: "delivery", label: "Delivery" },
                    { id: "reviews", label: "Reviews" },
                    { id: "statistics", label: "Statistics" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                        activeTab === tab.id
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-37.5">
                {activeTab === "description" && (
                  <div className="space-y-3">
                    <div
                      className="text-sm text-slate-600 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          product.description ||
                          `<p>Product description not available.</p>`,
                      }}
                    />
                  </div>
                )}

                {activeTab === "delivery" && deliveryInfo && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <FaTruck className="h-5 w-5 text-amber-500 mb-1" />
                        <p className="text-xs text-slate-500">Shipping</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {deliveryInfo.freeShipping
                            ? "Free"
                            : "Calculated at checkout"}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <FaClock className="h-5 w-5 text-amber-500 mb-1" />
                        <p className="text-xs text-slate-500">
                          Estimated Delivery
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {deliveryInfo.estimatedDays} days
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <FaUndo className="h-5 w-5 text-amber-500 mb-1" />
                        <p className="text-xs text-slate-500">Return Policy</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {deliveryInfo.returnPolicy}
                        </p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <FaShieldAlt className="h-5 w-5 text-amber-500 mb-1" />
                        <p className="text-xs text-slate-500">Warranty</p>
                        <p className="text-sm font-semibold text-slate-700">
                          {deliveryInfo.warranty}
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 p-3 rounded-lg flex items-center gap-2">
                      <FaCheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-emerald-700">
                        In stock - ready to ship
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4 max-h-75 overflow-y-auto pr-2">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-slate-100 pb-3"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                              <FaUser className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                {review.user}
                              </p>
                              <div className="flex items-center gap-1">
                                {renderRating(review.rating)}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <FaCalendarAlt className="h-3 w-3" />
                            {review.date}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 ml-10">
                          {review.comment}
                        </p>
                        <button className="ml-10 mt-1 text-xs text-slate-400 hover:text-amber-600 flex items-center gap-1">
                          <FaThumbsUp className="h-3 w-3" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "statistics" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-linear-to-br from-amber-50 to-orange-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-amber-600">
                        {statistics.sold.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">Total Sold</p>
                    </div>
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {statistics.rating}
                      </p>
                      <p className="text-xs text-slate-500">Average Rating</p>
                    </div>
                    <div className="bg-linear-to-br from-emerald-50 to-teal-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-emerald-600">
                        {statistics.reviews.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">Total Reviews</p>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {statistics.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">Total Views</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 p-4 md:p-6 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                  <button
                    className="px-3 py-2 hover:bg-slate-50 transition-colors rounded-l-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <FaMinus className="h-3 w-3 text-slate-600" />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-slate-700 min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    className="px-3 py-2 hover:bg-slate-50 transition-colors rounded-r-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <FaPlus className="h-3 w-3 text-slate-600" />
                  </button>
                </div>

                <button
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2.5 px-6 rounded-lg font-medium transition-colors shadow-lg shadow-amber-200"
                  onClick={() => {
                    addToCart(product, quantity);
                    onClose();
                  }}
                >
                  <FaShoppingCart className="h-4 w-4" />
                  Add to Cart - {formatTaka(product.price * quantity)}
                </button>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleBuyNowWhatsApp}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-lg shadow-green-200"
                  >
                    <FaWhatsapp className="h-4 w-4" />
                    <span className="text-sm">Buy Now</span>
                    <FaBolt className="h-3 w-3" />
                  </button>
                  <button
                    onClick={handleBuyNowCall}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-lg shadow-blue-200"
                  >
                    <FaPhone className="h-4 w-4" />
                    <span className="text-sm">Call to Order</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-2">
                  Order directly via WhatsApp or Call us for quick purchase
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-3">
                <button
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-rose-500 transition-colors"
                  onClick={() => console.log("Wishlist:", product.id)}
                >
                  <FaHeart className="h-4 w-4" />
                  Wishlist
                </button>
                <button
                  className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 transition-colors"
                  onClick={() => console.log("Share:", product.id)}
                >
                  <FaShareAlt className="h-4 w-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
