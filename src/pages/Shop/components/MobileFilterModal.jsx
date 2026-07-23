// src/pages/Shop/components/MobileFilterModal.jsx
import { FaTimes, FaSearch, FaSlidersH } from "react-icons/fa";

const MobileFilterModal = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  categories,
  brands,
  maxPrice,
  activeFilterCount,
  clearAllFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaSlidersH className="h-4 w-4 text-amber-600" />
            <h3 className="font-semibold text-slate-800">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
              }
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Categories
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      categories: prev.categories.includes(cat)
                        ? prev.categories.filter((c) => c !== cat)
                        : [...prev.categories, cat],
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.categories.includes(cat)
                      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Brands
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      brands: prev.brands.includes(brand)
                        ? prev.brands.filter((b) => b !== brand)
                        : [...prev.brands, brand],
                    }));
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.brands.includes(brand)
                      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Price Range
            </h4>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [
                      Math.min(
                        parseInt(e.target.value) || 0,
                        prev.priceRange[1],
                      ),
                      prev.priceRange[1],
                    ],
                  }))
                }
                placeholder="Min"
                className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-amber-400 outline-none"
              />
              <span className="text-slate-400">—</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [
                      prev.priceRange[0],
                      parseInt(e.target.value) || maxPrice,
                    ],
                  }))
                }
                placeholder="Max"
                className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Ratings
            </h4>
            <div className="flex gap-1.5">
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      ratings: prev.ratings === rating ? 0 : rating,
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.ratings === rating
                      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Availability
            </h4>
            <div className="flex gap-1.5">
              {[
                { value: "all", label: "All" },
                { value: "inStock", label: "In Stock" },
                { value: "outOfStock", label: "Out of Stock" },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      availability: prev.availability === value ? "all" : value,
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filters.availability === value
                      ? "bg-amber-100 text-amber-700 ring-1 ring-amber-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={clearAllFilters}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterModal;
