// src/components/Search/SearchSuggestions.jsx
import { forwardRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { formatTaka } from "../../utils/currency";

const SearchSuggestions = forwardRef(
  ({ results, query, showSuggestions, onProductClick, onViewAll }, ref) => {
    if (!showSuggestions || results.length === 0 || !query.trim()) return null;

    // Prevent blur from closing when clicking inside suggestions
    const handleMouseDown = (e) => {
      e.preventDefault();
    };

    const handleClick = (e) => {
      e.stopPropagation();
    };

    return (
      <div
        ref={ref}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-96 overflow-y-auto z-50"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Products ({results.length})
          </div>
          {results.slice(0, 8).map((product) => (
            <button
              key={product.id}
              onClick={() => onProductClick(product.slug)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-amber-50 transition-colors duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold">
                  {product.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800 group-hover:text-amber-700 transition-colors">
                    {product.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {product.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-amber-600">
                  {formatTaka(product.price)}
                </span>
                <FaArrowRight className="h-3 w-3 text-slate-300 group-hover:text-amber-500 transition-colors" />
              </div>
            </button>
          ))}
          {results.length > 8 && (
            <div className="px-3 py-2 text-xs text-center text-slate-400 border-t border-slate-100">
              + {results.length - 8} more results
            </div>
          )}
          <button
            onClick={onViewAll}
            className="w-full mt-1 px-3 py-2 text-center text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-medium"
          >
            View all results →
          </button>
        </div>
      </div>
    );
  },
);

SearchSuggestions.displayName = "SearchSuggestions";

export default SearchSuggestions;
