// src/pages/Home/Home.jsx
import React, { useState, useEffect } from "react";
import {
  FaBolt,
  FaLeaf,
  FaGem,
  FaCog,
  FaHeart,
  FaOilCan,
  FaCoffee,
  FaSeedling,
  FaSpa,
  FaBaby,
  FaTint,
  FaSnowflake,
} from "react-icons/fa";

import TopSection from "./TopSection/TopSection";
import BrowseCategories from "./BrowseCategories/BrowseCategories";
import PlaceYourAd from "./PlaceYourAd/PlaceYourAd";
import ProductSection from "./ProductSection/ProductSection";

import Slide1 from "../../assets/Slides/Slide-1.jpg";
import Slide2 from "../../assets/Slides/Slide-2.jpg";

// ============================================
// PAGE MAP CONFIGURATION - Edit this to control everything on the page
// ============================================
const pageMap = {
  // Page metadata
  meta: {
    title: "SazzBazar - Premium Products for Everyone",
    description:
      "Fresh groceries, honey, ghee, daily essentials delivered fast at your doorstep",
    keywords: "honey, ghee, dates, oils, chocolates, beauty care, baby care",
  },

  // Slideshow configuration
  slideshow: {
    enabled: true,
    slides: [
      { id: 1, image: Slide1, alt: "Slider 1" },
      { id: 2, image: Slide2, alt: "Slider 2" },
    ],
  },

  // Categories configuration - Now supports external SVG icons
  categories: {
    enabled: true,
    title: "Shop by Category",
    items: [
      {
        name: "Balm/Ointment",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bandcamp.svg",
        slug: "balm-ointment",
      },
      {
        name: "Foods",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/food.svg",
        slug: "foods",
      },
      {
        name: "Dates",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/datadog.svg",
        slug: "dates",
      },
      {
        name: "Gear & Gadgets",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gear.svg",
        slug: "gear-gadgets",
      },
      {
        name: "Chocolates",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/heart.svg",
        slug: "chocolates",
      },
      {
        name: "Hair Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spa.svg",
        slug: "hair-care",
      },
      {
        name: "Oil",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/oil.svg",
        slug: "oil",
      },
      {
        name: "Milk",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dropbox.svg",
        slug: "milk",
      },
      {
        name: "Tea & Coffee",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coffee.svg",
        slug: "tea-coffee",
      },
      {
        name: "Perfume/Attar",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/seedling.svg",
        slug: "perfume-attar",
      },
      {
        name: "Nuts",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/leaf.svg",
        slug: "nuts",
      },
      {
        name: "Beauty Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spa.svg",
        slug: "beauty-care",
      },
      {
        name: "Baby Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/baby.svg",
        slug: "baby-care",
      },
      {
        name: "Honey",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/honey.svg",
        slug: "honey",
      },
      {
        name: "Winter Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snowflake.svg",
        slug: "winter-care",
      },
    ],
  },

  // Products sections
  productSections: [
    {
      id: "featured",
      enabled: true,
      title: "Featured Products",
      subtitle: "Handpicked favorites just for you",
      badge: "HOT",
      columns: 4,
      cardStyle: "default",
      bgColor: "bg-white",
      products: [
        {
          id: 1,
          name: "Organic Honey - Pure & Natural",
          category: "Honey",
          price: 12.99,
          originalPrice: 15.99,
          discount: 15,
          rating: 4.8,
          reviews: 124,
          slug: "organic-honey",
          image: "https://placehold.co/300x300/FFB300/FFFFFF?text=Honey",
          badge: "HOT",
        },
        {
          id: 2,
          name: "Premium Ghee - Clarified Butter",
          category: "Dairy",
          price: 8.99,
          originalPrice: null,
          rating: 4.9,
          reviews: 89,
          slug: "premium-ghee",
          image: "https://placehold.co/300x300/2E7D32/FFFFFF?text=Ghee",
          badge: "BEST",
        },
        {
          id: 3,
          name: "Basmati Rice - Aged 1 Year",
          category: "Foods",
          price: 15.99,
          originalPrice: 19.99,
          discount: 20,
          rating: 4.7,
          reviews: 56,
          slug: "basmati-rice",
          image: "https://placehold.co/300x300/FFD700/FFFFFF?text=Rice",
          badge: "SALE",
        },
        {
          id: 4,
          name: "Extra Virgin Olive Oil",
          category: "Cooking Oils",
          price: 22.99,
          originalPrice: null,
          rating: 4.6,
          reviews: 78,
          slug: "olive-oil",
          image: "https://placehold.co/300x300/4CAF50/FFFFFF?text=Olive",
          badge: "NEW",
        },
      ],
    },
    {
      id: "top-selling",
      enabled: true,
      title: "Top Selling",
      subtitle: "Most loved by our customers",
      badge: "TRENDING",
      columns: 4,
      cardStyle: "featured",
      bgColor: "bg-amber-50/30",
      products: [
        {
          id: 5,
          name: "Medjool Dates - Premium Quality",
          category: "Dates",
          price: 18.99,
          originalPrice: 24.99,
          discount: 25,
          rating: 4.9,
          reviews: 234,
          slug: "medjool-dates",
          image: "https://placehold.co/300x300/8D6E63/FFFFFF?text=Dates",
          badge: "HOT",
        },
        {
          id: 6,
          name: "Almonds - California Grown",
          category: "Nuts",
          price: 14.99,
          originalPrice: null,
          rating: 4.8,
          reviews: 167,
          slug: "almonds",
          image: "https://placehold.co/300x300/D7CCC8/000000?text=Almonds",
          badge: "BEST",
        },
        {
          id: 7,
          name: "Dark Chocolate 70% Cocoa",
          category: "Chocolates",
          price: 6.99,
          originalPrice: 8.99,
          discount: 22,
          rating: 4.7,
          reviews: 92,
          slug: "dark-chocolate",
          image: "https://placehold.co/300x300/4E342E/FFFFFF?text=Chocolate",
          badge: "SALE",
        },
        {
          id: 8,
          name: "Coconut Oil - Cold Pressed",
          category: "Cooking Oils",
          price: 9.99,
          originalPrice: null,
          rating: 4.5,
          reviews: 145,
          slug: "coconut-oil",
          image: "https://placehold.co/300x300/F5F5F5/000000?text=Coconut",
          badge: "TRENDING",
        },
      ],
    },
    {
      id: "on-sale",
      enabled: true,
      title: "On Sale",
      subtitle: "Great deals at amazing prices",
      badge: "SALE",
      columns: 4,
      cardStyle: "default",
      bgColor: "bg-white",
      products: [
        {
          id: 9,
          name: "Winter Care Gift Set",
          category: "Winter Care",
          price: 29.99,
          originalPrice: 49.99,
          discount: 40,
          rating: 4.6,
          reviews: 67,
          slug: "winter-gift-set",
          image: "https://placehold.co/300x300/1976D2/FFFFFF?text=Winter",
          badge: "SALE",
        },
        {
          id: 10,
          name: "Vitamin C Serum - 30ml",
          category: "Beauty Care",
          price: 19.99,
          originalPrice: 29.99,
          discount: 33,
          rating: 4.4,
          reviews: 89,
          slug: "vitamin-c-serum",
          image: "https://placehold.co/300x300/F57C00/FFFFFF?text=Vitamin+C",
          badge: "SALE",
        },
        {
          id: 11,
          name: "Hair Growth Oil - 100ml",
          category: "Hair Care",
          price: 24.99,
          originalPrice: 34.99,
          discount: 28,
          rating: 4.3,
          reviews: 56,
          slug: "hair-growth-oil",
          image: "https://placehold.co/300x300/7B1FA2/FFFFFF?text=Hair+Oil",
          badge: "SALE",
        },
        {
          id: 12,
          name: "Baby Care Starter Kit",
          category: "Baby Care",
          price: 34.99,
          originalPrice: 49.99,
          discount: 30,
          rating: 4.8,
          reviews: 112,
          slug: "baby-care-kit",
          image: "https://placehold.co/300x300/EC407A/FFFFFF?text=Baby+Kit",
          badge: "SALE",
        },
      ],
    },
    {
      id: "new-arrivals",
      enabled: true,
      title: "New Arrivals",
      subtitle: "Fresh products just added",
      badge: "NEW",
      columns: 4,
      cardStyle: "minimal",
      bgColor: "bg-white",
      products: [
        {
          id: 13,
          name: "Arabic Coffee - Premium Blend",
          category: "Tea & Coffee",
          price: 21.99,
          originalPrice: null,
          rating: 4.5,
          reviews: 34,
          slug: "arabic-coffee",
          image: "https://placehold.co/300x300/3E2723/FFFFFF?text=Coffee",
          badge: "NEW",
        },
        {
          id: 14,
          name: "Rose Water Toner - 200ml",
          category: "Beauty Care",
          price: 16.99,
          originalPrice: null,
          rating: 4.2,
          reviews: 45,
          slug: "rose-water-toner",
          image: "https://placehold.co/300x300/F48FB1/FFFFFF?text=Rose",
          badge: "NEW",
        },
        {
          id: 15,
          name: "Oud Attar - 12ml",
          category: "Perfume & Attar",
          price: 34.99,
          originalPrice: null,
          rating: 4.9,
          reviews: 78,
          slug: "oud-attar",
          image: "https://placehold.co/300x300/FFC107/FFFFFF?text=Oud",
          badge: "NEW",
        },
        {
          id: 16,
          name: "Handmade Soap - Lavender",
          category: "Beauty Care",
          price: 8.99,
          originalPrice: null,
          rating: 4.6,
          reviews: 23,
          slug: "lavender-soap",
          image: "https://placehold.co/300x300/E1BEE7/000000?text=Soap",
          badge: "NEW",
        },
      ],
    },
  ],

  // Ad sections
  adSections: [
    {
      id: "ad-1",
      enabled: true,
      position: "after-featured",
      size: "compact",
      bgGradient: "from-indigo-600 to-purple-600",
      title: "Advertise With Us",
      subtitle: "Reach 5,000+ daily visitors",
      ctaText: "Place Your Ad",
      visitorCount: "5,000+ Daily Visitors",
    },
    {
      id: "ad-2",
      enabled: true,
      position: "after-on-sale",
      size: "default",
      bgGradient: "from-cyan-600 to-blue-600",
      title: "Promote Your Brand Here",
      subtitle: "Reach thousands of potential customers",
      ctaText: "Advertise Now",
      visitorCount: "10,000+ Monthly Visitors",
    },
    {
      id: "ad-3",
      enabled: true,
      position: "after-new-arrivals",
      size: "large",
      bgGradient: "from-amber-600 to-orange-600",
      title: "📢 Advertise With SazzBazar",
      subtitle:
        "Get featured on our homepage and reach thousands of customers daily",
      ctaText: "Get Started",
      visitorCount: "10,000+ Happy Customers",
    },
  ],
};

// ============================================
// Icon mapping for categories (fallback for React Icons)
// ============================================
const iconMap = {
  bolt: FaBolt,
  leaf: FaLeaf,
  gem: FaGem,
  cog: FaCog,
  heart: FaHeart,
  spa: FaSpa,
  oil: FaOilCan,
  drop: FaTint,
  coffee: FaCoffee,
  seedling: FaSeedling,
  baby: FaBaby,
  snowflake: FaSnowflake,
};

// ============================================
// Category Icon Renderer - Handles both SVG URLs and React Icons
// ============================================
const CategoryIcon = ({ icon, className = "h-6 w-6" }) => {
  // Check if it's a URL (starts with http or https)
  if (
    typeof icon === "string" &&
    (icon.startsWith("http") || icon.startsWith("data:image"))
  ) {
    return (
      <img
        src={icon}
        alt="category icon"
        className={className}
        loading="lazy"
        onError={(e) => {
          // Fallback to a default icon if image fails to load
          e.target.style.display = "none";
          e.target.parentElement.innerHTML =
            '<span className="text-amber-600 text-lg">📦</span>';
        }}
      />
    );
  }

  // If it's a React Icon name from iconMap
  if (typeof icon === "string" && iconMap[icon]) {
    const IconComponent = iconMap[icon];
    return <IconComponent className={className} />;
  }

  // Fallback for any other case
  return <span className="text-amber-600 text-lg">📦</span>;
};

// ============================================
// Skeleton Loader Components
// ============================================
const SkeletonLoader = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-8 animate-pulse">
      {/* Skeleton Slider */}
      <div className="bg-slate-200 rounded-2xl h-48 md:h-64 w-full mb-6"></div>

      {/* Skeleton Categories */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden mb-6">
        <div className="px-4 md:px-6 py-4 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded w-48"></div>
        </div>
        <div className="p-3 md:p-5">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                <div className="h-3 bg-slate-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skeleton Product Sections */}
      {[...Array(3)].map((_, sectionIdx) => (
        <div key={sectionIdx} className="mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100/50 overflow-hidden">
            <div className="px-4 md:px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <div>
                <div className="h-6 bg-slate-200 rounded w-48"></div>
                <div className="h-4 bg-slate-200 rounded w-32 mt-1"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
            <div className="p-3 md:p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[...Array(4)].map((_, productIdx) => (
                  <div
                    key={productIdx}
                    className="bg-slate-50 rounded-xl overflow-hidden"
                  >
                    <div className="aspect-square bg-slate-200"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-slate-200 rounded w-16"></div>
                      <div className="h-4 bg-slate-200 rounded w-24"></div>
                      <div className="h-3 bg-slate-200 rounded w-20"></div>
                      <div className="h-8 bg-slate-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ============================================
// Home Component
// ============================================
const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Map categories with proper icon rendering
  const mappedCategories = pageMap.categories.items.map((cat) => {
    return {
      ...cat,
      icon: <CategoryIcon icon={cat.icon} className="h-6 w-6" />,
    };
  });

  // Get slides from pageMap
  const slides = pageMap.slideshow.slides || [];

  // Get enabled product sections
  const enabledProductSections = pageMap.productSections.filter(
    (section) => section.enabled !== false,
  );

  // Render function for ad sections with position matching
  const renderAdSections = (position) => {
    return pageMap.adSections
      .filter((ad) => ad.enabled !== false && ad.position === position)
      .map((ad) => (
        <PlaceYourAd
          key={ad.id}
          size={ad.size}
          bgGradient={ad.bgGradient}
          title={ad.title}
          subtitle={ad.subtitle}
          ctaText={ad.ctaText}
          visitorCount={ad.visitorCount}
        />
      ));
  };

  // Show skeleton loader while loading
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      {/* Top Section with Slider */}
      {pageMap.slideshow.enabled && (
        <TopSection slides={slides} categories={mappedCategories} />
      )}

      {/* Browse Categories */}
      {pageMap.categories.enabled && (
        <BrowseCategories categories={mappedCategories} />
      )}

      {/* Render all sections in order with ads */}
      {enabledProductSections.map((section, index) => {
        const sectionElement = (
          <ProductSection
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            products={section.products}
            badge={section.badge}
            columns={section.columns}
            cardStyle={section.cardStyle}
            bgColor={section.bgColor || "bg-white"}
          />
        );

        // Determine which ad to show after this section
        const adPosition =
          index === 0
            ? "after-featured"
            : index === 1
              ? null
              : index === 2
                ? "after-on-sale"
                : index === 3
                  ? "after-new-arrivals"
                  : null;

        const adAfter = adPosition ? renderAdSections(adPosition) : null;

        return (
          <React.Fragment key={section.id}>
            {sectionElement}
            {adAfter}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Home;
