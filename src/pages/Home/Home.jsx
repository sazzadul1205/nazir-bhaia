// src/pages/Home/Home.jsx
import React, { useEffect, useState } from "react";
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
import { getData } from "../../api/apiService";

// ============================================
// Icon mapping for categories
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
// Category Icon Renderer
// ============================================
const CategoryIcon = ({ icon, className = "h-6 w-6" }) => {
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
          e.target.style.display = "none";
          e.target.parentElement.innerHTML =
            '<span className="text-amber-600 text-lg">📦</span>';
        }}
      />
    );
  }

  if (typeof icon === "string" && iconMap[icon]) {
    const IconComponent = iconMap[icon];
    return <IconComponent className={className} />;
  }

  return <span className="text-amber-600 text-lg">📦</span>;
};

// ============================================
// Skeleton Loader
// ============================================
const SkeletonLoader = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-8 animate-pulse">
      <div className="bg-slate-200 rounded-2xl h-48 md:h-64 w-full mb-6"></div>
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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        if (result.success) {
          setData(result.data);
        } else {
          setError("Failed to load data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Map categories with proper icon rendering
  const mappedCategories =
    data?.categories?.items?.map((cat) => ({
      ...cat,
      icon: <CategoryIcon icon={cat.icon} className="h-6 w-6" />,
    })) || [];

  const slides = data?.slideshow?.slides || [];
  const enabledProductSections =
    data?.productSections?.filter((section) => section.enabled !== false) || [];
  const adSections = data?.adSections || [];

  // Render ad sections
  const renderAdSections = (position) => {
    return (
      adSections
        ?.filter((ad) => ad.enabled !== false && ad.position === position)
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
        )) || []
    );
  };

  if (loading) return <SkeletonLoader />;
  if (error)
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!data) return null;

  return (
    <>
      {data.slideshow?.enabled && (
        <TopSection slides={slides} categories={mappedCategories} />
      )}

      {data.categories?.enabled && (
        <BrowseCategories categories={mappedCategories} />
      )}

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

        const adPosition =
          index === 0
            ? "after-featured"
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
