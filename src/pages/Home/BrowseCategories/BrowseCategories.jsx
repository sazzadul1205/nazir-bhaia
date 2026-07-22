// src/pages/Home/BrowseCategories/BrowseCategories.jsx
import { FaTags, FaArrowRight } from "react-icons/fa";

const BrowseCategories = ({ categories }) => {
  // Split categories into two rows for better display
  const firstRowCategories = categories.slice(0, 8);
  const secondRowCategories = categories.slice(8);

  return (
    <section className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100/50 overflow-hidden">
        {/* Ribbon Header */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white/20 p-1.5 md:p-2 rounded-lg">
              <FaTags className="text-white text-lg md:text-xl" />
            </div>
            <h2 className="text-white font-bold text-sm md:text-lg tracking-wide">
              Browse Categories
            </h2>
            <span className="hidden sm:inline-block text-white/80 text-xs md:text-sm font-medium bg-white/20 px-2 md:px-3 py-0.5 rounded-full">
              {categories.length}+ Categories
            </span>
          </div>
          <a
            href="/shop"
            className="flex items-center gap-1 text-white hover:text-white/90 text-xs md:text-sm font-medium bg-white/20 hover:bg-white/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            View All
            <FaArrowRight className="text-[10px] md:text-xs" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="p-3 md:p-5">
          {/* First Row */}
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
            {firstRowCategories.map((category, index) => (
              <a
                key={index}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center text-lg md:text-2xl group-hover:scale-110 transition-transform duration-300 ring-1 ring-slate-100 group-hover:ring-amber-300">
                  {category.icon}
                </div>
                <span className="text-[10px] md:text-xs font-medium text-slate-700 text-center group-hover:text-amber-700 transition-colors leading-tight">
                  {category.name}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          {secondRowCategories.length > 0 && (
            <div className="my-3 md:my-4 border-t border-slate-100"></div>
          )}

          {/* Second Row */}
          {secondRowCategories.length > 0 && (
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
              {secondRowCategories.map((category, index) => (
                <a
                  key={index}
                  href={`/category/${category.slug}`}
                  className="group flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all duration-300 hover:shadow-md hover:scale-105"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center text-lg md:text-2xl group-hover:scale-110 transition-transform duration-300 ring-1 ring-slate-100 group-hover:ring-amber-300">
                    {category.icon}
                  </div>
                  <span className="text-[10px] md:text-xs font-medium text-slate-700 text-center group-hover:text-amber-700 transition-colors leading-tight">
                    {category.name}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
