// src/pages/Shop/components/FilterSidebar.jsx
import { useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaSlidersH,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { formatTaka } from "../../../utils/currency";

const FilterSection = ({ title, expanded, onToggle, children }) => (
  <div className="border-b border-slate-100 pb-3">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
    >
      <span className="text-sm font-semibold text-slate-700">{title}</span>
      {expanded ? (
        <FaChevronUp className="h-3 w-3" />
      ) : (
        <FaChevronDown className="h-3 w-3" />
      )}
    </button>
    {expanded && <div className="mt-2">{children}</div>}
  </div>
);

const FilterSidebar = ({
  filters,
  setFilters,
  categories,
  brands,
  maxPrice,
  activeFilterCount,
  clearAllFilters,
}) => {
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    ratings: true,
    brands: true,
    availability: true,
  });

  const toggleSection = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FaSlidersH className="h-4 w-4 text-amber-600" />
            <h3 className="font-semibold text-slate-800">Filters</h3>
            {activeFilterCount > 0 && (
              <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => updateFilter("searchTerm", e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          {filters.searchTerm && (
            <button
              onClick={() => updateFilter("searchTerm", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <FaTimes className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="space-y-3">
          {/* Categories */}
          <FilterSection
            title="Categories"
            expanded={expanded.categories}
            onToggle={() => toggleSection("categories")}
          >
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        categories: prev.categories.includes(cat)
                          ? prev.categories.filter((c) => c !== cat)
                          : [...prev.categories, cat],
                      }));
                    }}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="truncate">{cat}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection
            title="Price Range"
            expanded={expanded.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">
                  {formatTaka(filters.priceRange[0])}
                </span>
                <span className="text-slate-300">—</span>
                <span className="text-slate-500">
                  {formatTaka(filters.priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full accent-amber-600"
              />
              <div className="flex gap-2">
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
                  className="w-1/2 px-2 py-1 border border-slate-200 rounded text-sm focus:border-amber-400 outline-none"
                />
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
                  className="w-1/2 px-2 py-1 border border-slate-200 rounded text-sm focus:border-amber-400 outline-none"
                />
              </div>
            </div>
          </FilterSection>

          {/* Ratings */}
          <FilterSection
            title="Ratings"
            expanded={expanded.ratings}
            onToggle={() => toggleSection("ratings")}
          >
            <div className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.ratings === rating}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        ratings: prev.ratings === rating ? 0 : rating,
                      }))
                    }
                    className="rounded-full border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>{rating}★</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Brands */}
          <FilterSection
            title="Brands"
            expanded={expanded.brands}
            onToggle={() => toggleSection("brands")}
          >
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        brands: prev.brands.includes(brand)
                          ? prev.brands.filter((b) => b !== brand)
                          : [...prev.brands, brand],
                      }));
                    }}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection
            title="Availability"
            expanded={expanded.availability}
            onToggle={() => toggleSection("availability")}
          >
            <div className="space-y-1.5">
              {[
                { value: "all", label: "All Products" },
                {
                  value: "inStock",
                  label: "● In Stock",
                  className: "text-emerald-600",
                },
                {
                  value: "outOfStock",
                  label: "● Out of Stock",
                  className: "text-red-400",
                },
              ].map(({ value, label, className }) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="availability"
                    checked={filters.availability === value}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        availability:
                          prev.availability === value ? "all" : value,
                      }))
                    }
                    className="rounded-full border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className={className}>{label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
