// src/Shared/TopBar/TopBar.jsx
import { useState, useEffect } from "react";
import { BsCashStack } from "react-icons/bs";
import {
  FaClock,
  FaPhone,
  FaTruck,
  FaWhatsapp,
  FaLeaf,
  FaShieldAlt,
  FaRocket,
  FaShippingFast,
  FaCheckCircle,
  FaStar,
  FaMedal,
} from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";

// Configuration - Edit this object to enable/disable features
const topBarConfig = {
  // Contact Info
  contact: {
    enabled: true,
    hotline: "09647-186097",
    whatsapp: "01818-186097",
    whatsappNumber: "01818-186097",
    showWhatsapp: true,
    email: "support@sazzbazar.com",
    showEmail: false,
  },

  // Store Info
  store: {
    name: "Sazz Bazar",
    showStoreName: false,
    established: "2020",
    showEstablished: false,
  },

  // Features (can be toggled on/off individually)
  features: {
    // Payment & Delivery
    cashOnDelivery: {
      enabled: true,
      label: "Cash on delivery",
      icon: <BsCashStack className="text-[10px]" />,
    },
    freeShipping: {
      enabled: true,
      label: "Free shipping",
      icon: <FaTruck className="text-[10px]" />,
    },
    expressDelivery: {
      enabled: false,
      label: "Express Delivery",
      icon: <FaRocket className="text-[10px]" />,
    },
    codAvailable: {
      enabled: false,
      label: "COD Available",
      icon: <FaShippingFast className="text-[10px]" />,
    },

    // Store Trust
    securePayment: {
      enabled: false,
      label: "Secure Payment",
      icon: <FaShieldAlt className="text-[10px]" />,
    },
    verifiedStore: {
      enabled: false,
      label: "Verified Store",
      icon: <FaCheckCircle className="text-[10px]" />,
    },
    trusted: {
      enabled: false,
      label: "100% Trusted",
      icon: <FaStar className="text-[10px]" />,
    },
    satisfactionGuarantee: {
      enabled: false,
      label: "Satisfaction Guarantee",
      icon: <FaMedal className="text-[10px]" />,
    },

    // Product Features
    freshProducts: {
      enabled: false,
      label: "Fresh Products",
      icon: <FaLeaf className="text-[10px]" />,
    },
    premiumQuality: {
      enabled: false,
      label: "Premium Quality",
      icon: <FaMedal className="text-[10px]" />,
    },
    handmade: {
      enabled: false,
      label: "Handmade",
      icon: <HiOutlineLightBulb className="text-[10px]" />,
    },
    organic: {
      enabled: false,
      label: "Organic",
      icon: <FaLeaf className="text-[10px]" />,
    },

    // Store Hours
    twentyFourHours: {
      enabled: true,
      label: "24 hours open",
      icon: <FaClock className="text-[10px]" />,
    },
    weekendOpen: {
      enabled: false,
      label: "Open on weekends",
      icon: <FaClock className="text-[10px]" />,
    },
  },

  // Badge System - Dynamic announcements/badges
  badges: {
    enabled: true,
    autoRotate: true,
    rotateInterval: 5000,
    items: [
      {
        id: 1,
        text: "🔥 Limited Time Offer! Up to 50% Off",
        link: "/sale",
        bgColor: "bg-amber-500/30",
        pulseAnimation: true,
      },
      {
        id: 2,
        text: "🆕 New Arrivals! Check out our latest products",
        link: "/new-arrivals",
        bgColor: "bg-emerald-500/30",
        pulseAnimation: false,
      },
      {
        id: 3,
        text: "⭐ Join our loyalty program & earn rewards",
        link: "/loyalty",
        bgColor: "bg-purple-500/30",
        pulseAnimation: false,
      },
      {
        id: 4,
        text: "🎉 Free gift on orders over $50",
        link: "/gifts",
        bgColor: "bg-pink-500/30",
        pulseAnimation: false,
      },
    ],
  },

  // Show/hide entire sections
  sections: {
    showMobileContact: true,
    showDesktopContact: true,
    showDesktopFeatures: true,
    showStoreInfo: false,
    showBadges: true,
    showDividers: true,
  },

  // Divider style
  divider: {
    enabled: true,
    color: "bg-emerald-500/40",
    width: "w-px",
    height: "h-4",
  },
};

// Render divider function (not a component)
const renderDivider = (dividerConfig) => {
  if (!dividerConfig.enabled) return null;
  return (
    <span
      className={`${dividerConfig.height} ${dividerConfig.width} ${dividerConfig.color}`}
    ></span>
  );
};

// Render a single feature item function
const renderFeature = (
  features,
  dividerConfig,
  featureKey,
  showDivider = true,
) => {
  const feature = features[featureKey];
  if (!feature || !feature.enabled) return null;

  return (
    <>
      <span className="flex items-center gap-1">
        {feature.icon}
        {feature.label}
      </span>
      {showDivider && renderDivider(dividerConfig)}
    </>
  );
};

const TopBar = () => {
  const { contact, features, badges, sections, divider, store } = topBarConfig;

  // Auto-rotate badges
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);

  useEffect(() => {
    if (badges.enabled && badges.autoRotate && badges.items.length > 1) {
      const interval = setInterval(() => {
        setCurrentBadgeIndex((prev) => (prev + 1) % badges.items.length);
      }, badges.rotateInterval);

      return () => clearInterval(interval);
    }
  }, [
    badges.enabled,
    badges.autoRotate,
    badges.items.length,
    badges.rotateInterval,
  ]);

  const currentBadge = badges.items[currentBadgeIndex] || badges.items[0];

  return (
    <div className="bg-linear-to-r from-emerald-700 to-emerald-600 text-white text-[11px] sm:text-xs shadow-md overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-1.5">
        {/* Mobile Version */}
        {sections.showMobileContact && (
          <a
            href={`tel:${contact.hotline}`}
            className="flex md:hidden items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span className="relative flex h-5 w-5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300/70 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-emerald-600 text-[11px] shadow-sm">
                <FaPhone className="text-[10px]" />
              </span>
            </span>

            <span className="font-semibold leading-none">
              Hotline
              <span className="underline underline-offset-2 decoration-lime-200 mx-1">
                {contact.hotline}
              </span>
              {contact.showWhatsapp && (
                <>
                  <span className="text-emerald-100/90 mx-1">|</span>
                  <span className="underline underline-offset-2 decoration-lime-200">
                    Whatsapp {contact.whatsapp}
                  </span>
                </>
              )}
            </span>
          </a>
        )}

        {/* Desktop Version */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Side - Contact & Store Info */}
          <div className="flex items-center gap-3">
            {sections.showDesktopContact && (
              <div className="flex items-center gap-3">
                {/* Main Hotline Link - No nested links */}
                <div className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
                  <a
                    href={`tel:${contact.hotline}`}
                    className="flex items-center gap-3"
                  >
                    <span className="relative flex h-6 w-6">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-lime-300/70 opacity-75 animate-ping"></span>
                      <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                        <MdCall className="text-sm" />
                      </span>
                    </span>

                    <span className="font-semibold text-sm">Hotline</span>

                    <span className="font-semibold tracking-wide bg-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <FaPhone className="text-[10px]" />
                      {contact.hotline}
                    </span>
                  </a>

                  {/* WhatsApp - Separate link, not nested */}
                  {contact.showWhatsapp && (
                    <a
                      href={`https://wa.me/${contact.whatsappNumber.replace(/-/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold tracking-wide bg-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 hover:bg-emerald-500/60 transition-colors"
                    >
                      <FaWhatsapp className="text-[12px]" />
                      Whatsapp {contact.whatsapp}
                    </a>
                  )}

                  {contact.showEmail && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold tracking-wide bg-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 hover:bg-emerald-500/60 transition-colors"
                    >
                      {contact.email}
                    </a>
                  )}

                  {renderFeature(features, divider, "twentyFourHours")}
                </div>
              </div>
            )}

            {/* Store Info */}
            {sections.showStoreInfo && (
              <div className="flex items-center gap-2 text-emerald-100/80">
                {store.showStoreName && (
                  <span className="font-semibold">{store.name}</span>
                )}
                {store.showEstablished && <span>Est. {store.established}</span>}
              </div>
            )}
          </div>

          {/* Right Side - Features, Badges & Promotions */}
          <div className="flex items-center gap-3 text-[11px] text-emerald-100/90">
            {/* Badges - Dynamic Announcements */}
            {sections.showBadges && badges.enabled && currentBadge && (
              <>
                {currentBadge.link ? (
                  <a
                    href={currentBadge.link}
                    className={`flex items-center gap-1.5 font-medium text-white ${currentBadge.bgColor} hover:opacity-80 px-3 py-0.5 rounded-full transition-all ${currentBadge.pulseAnimation ? "animate-pulse" : ""}`}
                  >
                    {currentBadge.text}
                  </a>
                ) : (
                  <span
                    className={`flex items-center gap-1.5 font-medium text-white ${currentBadge.bgColor} px-3 py-0.5 rounded-full ${currentBadge.pulseAnimation ? "animate-pulse" : ""}`}
                  >
                    {currentBadge.text}
                  </span>
                )}
                {renderDivider(divider)}
              </>
            )}

            {/* Main Features */}
            {sections.showDesktopFeatures && (
              <div className="flex items-center gap-3">
                {/* Store Trust Features */}
                {renderFeature(features, divider, "trusted")}
                {renderFeature(features, divider, "verifiedStore")}
                {renderFeature(features, divider, "securePayment")}
                {renderFeature(features, divider, "satisfactionGuarantee")}

                {/* Payment & Delivery */}
                {renderFeature(features, divider, "cashOnDelivery")}
                {renderFeature(features, divider, "freeShipping")}
                {renderFeature(features, divider, "expressDelivery")}
                {renderFeature(features, divider, "codAvailable")}

                {/* Product Features */}
                {renderFeature(features, divider, "freshProducts")}
                {renderFeature(features, divider, "premiumQuality")}
                {renderFeature(features, divider, "organic")}
                {renderFeature(features, divider, "handmade")}

                {/* Store Hours */}
                {renderFeature(features, divider, "weekendOpen")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
