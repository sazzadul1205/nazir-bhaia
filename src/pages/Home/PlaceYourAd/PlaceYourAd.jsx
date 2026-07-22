// src/pages/Home/PlaceYourAd/PlaceYourAd.jsx
import { FaBullhorn, FaArrowRight, FaAd, FaStore } from "react-icons/fa";

const PlaceYourAd = ({
  // Content
  title = "Advertise With Us",
  subtitle = "Reach thousands of customers • Starting from $10",
  ctaText = "Advertise Now",
  ctaLink = "/advertise",
  visitorCount = "5,000+ Daily Visitors",
  showVisitorCount = true,

  // Styling
  bgGradient = "from-blue-600 via-purple-600 to-pink-600",
  className = "",
  size = "default", // "compact" | "default" | "large"
}) => {
  // Size variants
  const sizeClasses = {
    compact: "py-2 md:py-3 px-3 md:px-4",
    default: "py-4 md:py-6 px-4 md:px-6",
    large: "py-6 md:py-10 px-6 md:px-8",
  };

  const textSizeClasses = {
    compact: {
      title: "text-sm md:text-base",
      subtitle: "text-xs",
      cta: "text-xs md:text-sm px-3 md:px-4 py-1 md:py-1.5",
      visitor: "text-xs",
      icon: "text-lg md:text-xl",
    },
    default: {
      title: "text-base md:text-xl",
      subtitle: "text-xs md:text-sm",
      cta: "text-sm md:text-base px-4 md:px-6 py-1.5 md:py-2.5",
      visitor: "text-xs md:text-sm",
      icon: "text-xl md:text-3xl",
    },
    large: {
      title: "text-xl md:text-3xl",
      subtitle: "text-sm md:text-base",
      cta: "text-base md:text-lg px-6 md:px-8 py-2 md:py-3",
      visitor: "text-sm md:text-base",
      icon: "text-3xl md:text-5xl",
    },
  };

  const styles = sizeClasses[size] || sizeClasses.default;
  const textStyles = textSizeClasses[size] || textSizeClasses.default;

  return (
    <section
      className={`max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 pb-4 md:pb-6 ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl shadow-lg bg-linear-to-r ${bgGradient}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-300 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className={`relative ${styles}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            {/* Left: Icon + Text */}
            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
              <div className="bg-white/20 p-2 md:p-3 rounded-full backdrop-blur-sm shrink-0">
                <FaBullhorn className={`text-white ${textStyles.icon}`} />
              </div>
              <div className="min-w-0">
                <h3
                  className={`text-white font-bold ${textStyles.title} tracking-wide truncate`}
                >
                  {title}
                </h3>
                <p
                  className={`text-white/80 ${textStyles.subtitle} mt-0.5 truncate`}
                >
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Right: Visitor Count + CTA */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0 w-full sm:w-auto justify-end">
              {showVisitorCount && (
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 md:px-4 py-1 md:py-1.5 rounded-full">
                  <FaStore className={`text-white/80 ${textStyles.visitor}`} />
                  <span
                    className={`text-white/80 ${textStyles.visitor} whitespace-nowrap`}
                  >
                    {visitorCount}
                  </span>
                </div>
              )}
              <a
                href={ctaLink}
                className={`inline-flex items-center gap-1.5 md:gap-2 bg-white text-purple-600 hover:bg-gray-100 ${textStyles.cta} rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap`}
              >
                <FaAd
                  className={`${size === "compact" ? "text-xs" : "text-sm md:text-base"}`}
                />
                {ctaText}
                <FaArrowRight
                  className={`${size === "compact" ? "text-xs" : "text-xs md:text-sm"}`}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceYourAd;
