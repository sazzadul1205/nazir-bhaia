// src/components/Search/SearchBar.jsx
import { FaSearch, FaTimesCircle } from "react-icons/fa";
import SearchSuggestions from "./SearchSuggestions";

const SearchBar = ({
  isMobile = false,
  searchQuery,
  setSearchQuery,
  searchResults,
  showSuggestions,
  setSearchOpen,
  mobileSearchRef,
  desktopSearchRef,
  suggestionsRef,
  openSearch,
  clearSearch,
  handleSearchSubmit,
  handleProductClick,
  handleViewAll,
  placeholder = "Search products...",
}) => {
  const inputRef = isMobile ? mobileSearchRef : desktopSearchRef;

  // Handle input blur - but only close if not clicking on suggestions
  const handleBlur = () => {
    // Small delay to allow click events on suggestions to fire
    setTimeout(() => {
      // Check if the new focus target is inside suggestions
      const activeElement = document.activeElement;
      const isSuggestionFocused =
        suggestionsRef.current &&
        suggestionsRef.current.contains(activeElement);

      // If focus is not on suggestions, close search
      if (!isSuggestionFocused) {
        setSearchOpen(false);
        // Don't clear query here to allow smooth UX
      }
    }, 150);
  };

  return (
    <div className={`relative ${isMobile ? "flex-1 min-w-0" : "w-full"}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="relative w-full"
        role="search"
      >
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            <FaSearch className="h-4 w-4" />
          </span>
          <input
            ref={inputRef}
            type="text"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (isMobile) {
                openSearch();
              } else if (searchQuery.trim()) {
                setSearchOpen(true);
              }
            }}
            onBlur={handleBlur}
            className={`w-full rounded-full border border-slate-200 bg-slate-50/80 text-slate-800 placeholder:text-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 outline-none transition-all duration-200 ${
              isMobile
                ? "px-9 pr-20 py-1.5 text-sm"
                : "px-9 pr-24 py-2 text-sm shadow-sm hover:shadow"
            }`}
            placeholder={placeholder}
            autoComplete="off"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-12 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <FaTimesCircle className="h-4 w-4" />
            </button>
          )}
          <button
            type="submit"
            className={`absolute inset-y-0 my-1 inline-flex items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 active:scale-95 transition-all duration-200 shadow-sm ${
              isMobile ? "right-1 px-3" : "right-1.5 px-4 text-sm font-medium"
            }`}
            aria-label="Submit search"
          >
            <FaSearch className={isMobile ? "h-3.5 w-3.5" : "h-3.5 w-3.5"} />
            {!isMobile && <span className="ml-1">Search</span>}
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      <SearchSuggestions
        ref={suggestionsRef}
        results={searchResults}
        query={searchQuery}
        showSuggestions={showSuggestions}
        onProductClick={handleProductClick}
        onViewAll={handleViewAll}
      />
    </div>
  );
};

export default SearchBar;
