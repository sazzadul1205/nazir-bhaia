import { useState, useEffect, useCallback } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStore,
  FaArrowRight,
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
import Slide1 from "../../../assets/Slides/Slide-1.jpg";
import Slide2 from "../../../assets/Slides/Slide-2.jpg";

const TopSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: Slide1, alt: "Slider 1" },
    { id: 2, image: Slide2, alt: "Slider 2" },
  ];

  const categories = [
    { name: "Balm/Ointment", icon: <FaBolt className="text-amber-600" /> },
    { name: "Foods", icon: <FaLeaf className="text-emerald-600" /> },
    { name: "Dates", icon: <FaGem className="text-amber-700" /> },
    { name: "Gear & Gadgets", icon: <FaCog className="text-slate-600" /> },
    { name: "Chocolates", icon: <FaHeart className="text-rose-600" /> },
    { name: "Hair Care", icon: <FaSpa className="text-purple-600" /> },
    { name: "Oil", icon: <FaOilCan className="text-yellow-700" /> },
    { name: "Milk", icon: <FaTint className="text-blue-400" /> },
    { name: "Tea & Coffee", icon: <FaCoffee className="text-amber-800" /> },
    { name: "Perfume/Attar", icon: <FaSeedling className="text-pink-600" /> },
    { name: "Nuts", icon: <FaLeaf className="text-amber-700" /> },
    { name: "Beauty Care", icon: <FaSpa className="text-rose-500" /> },
    { name: "Baby Care", icon: <FaBaby className="text-sky-500" /> },
    { name: "Honey", icon: <FaGem className="text-amber-600" /> },
    { name: "Winter Care", icon: <FaSnowflake className="text-blue-500" /> },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative bg-linear-to-b from-amber-50 via-orange-50/60 to-emerald-50/40 pb-8 pt-3 md:pt-5">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {/* Sidebar - 30% on desktop */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-50 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <FaStore className="text-sm" />
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Shop by Category
                  </h3>
                </div>
              </div>

              <ul className="divide-y divide-slate-100 text-sm max-h-90 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-amber-50/70 transition-colors group"
                    >
                      <div className="relative h-8 w-8 rounded-lg overflow-hidden ring-1 ring-slate-100 bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center text-lg">
                        {category.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="truncate font-medium text-slate-800">
                          {category.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Slider Section - 70% on desktop */}
          <div className="md:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm border border-amber-50/50">
              {/* Slides */}
              <div className="relative aspect-16/7 overflow-hidden">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentSlide
                          ? "w-8 h-2 bg-white shadow-lg"
                          : "w-2 h-2 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  aria-label="Previous slide"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-xl"
                  aria-label="Next slide"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Categories - Shown only on mobile */}
        <div className="md:hidden mt-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-50 shadow-sm overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <FaStore className="text-sm" />
              </span>
              <h3 className="text-sm font-semibold text-slate-900">
                Shop by Category
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-1 p-2">
              {categories.slice(0, 6).map((category, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-amber-50/70 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center text-lg ring-1 ring-slate-100">
                    {category.icon}
                  </div>
                  <span className="text-[10px] font-medium text-slate-700 text-center leading-tight">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
