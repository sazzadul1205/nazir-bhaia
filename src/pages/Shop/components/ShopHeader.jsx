// src/pages/Shop/components/ShopHeader.jsx
import { FaFilter, FaThLarge, FaThList } from "react-icons/fa";

const ShopHeader = ({
  productCount,
  searchTerm,
  activeFilterCount,
  sortBy,
  onSortChange,
  onFilterToggle,
  viewMode,
  onViewModeChange,
}) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
        <span>Shop</span>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {productCount} products
        </span>
      </h1>
      {searchTerm && (
        <p className="text-sm text-slate-500 mt-1">
          Showing results for:{" "}
          <span className="font-medium text-amber-600">"{searchTerm}"</span>
        </p>
      )}
    </div>

    <div className="flex items-center gap-3 w-full sm:w-auto">
      <button
        onClick={onFilterToggle}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-amber-300 hover:bg-amber-50 transition-colors"
      >
        <FaFilter className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-colors"
      >
        <option value="popular">Most Popular</option>
        <option value="newest">Newest First</option>
        <option value="rating">Top Rated</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      <div className="hidden sm:flex bg-white border border-slate-200 rounded-full overflow-hidden">
        <button
          onClick={() => onViewModeChange("grid")}
          className={`p-2 transition-colors ${viewMode === "grid" ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          <FaThLarge className="h-4 w-4" />
        </button>
        <button
          onClick={() => onViewModeChange("list")}
          className={`p-2 transition-colors ${viewMode === "list" ? "bg-amber-100 text-amber-600" : "text-slate-400 hover:text-slate-600"}`}
        >
          <FaThList className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export default ShopHeader;
