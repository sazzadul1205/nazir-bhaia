// src/Shared/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaHome,
  FaBox,
  FaTruck,
  FaTag,
  FaLeaf,
  FaSeedling,
  FaHeart,
  FaCoffee,
  FaSnowflake,
  FaCut,
  FaBaby,
  FaOilCan,
  FaGem,
  FaMugHot,
  FaCandyCane,
  FaCog,
  FaStore,
  FaUtensils,
  FaSpa,
  FaCommentDots,
} from "react-icons/fa";

// Custom Hooks & Components
import { useSearch } from "../../hooks/useSearch";
import SearchBar from "../../components/Search/SearchBar";
import { useCart } from "../../hooks/useCart";
import { openCart } from "../../utils/cartHelpers";

const Navbar = () => {
  // States
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  // Use search hook
  const search = useSearch();

  // Create a local ref for the search container
  const searchContainerLocalRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the search container
      if (
        searchContainerLocalRef.current &&
        !searchContainerLocalRef.current.contains(event.target)
      ) {
        // Close search if it's open
        if (search.searchOpen) {
          search.closeSearch();
        }
        // Close suggestions if they're open
        if (search.showSuggestions) {
          search.setShowSuggestions(false);
        }
      }
    };

    // Use mousedown for better handling
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [search.searchOpen, search.showSuggestions, search.closeSearch, search]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (search.searchOpen) {
          search.closeSearch();
        }
        if (search.showSuggestions) {
          search.setShowSuggestions(false);
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [search.searchOpen, search.showSuggestions, search.closeSearch, search]);

  // Categories data
  const categories = [
    { name: "Foods & Grocery", slug: "foods", icon: FaUtensils },
    { name: "Nuts & Seeds", slug: "nuts-seeds", icon: FaSeedling },
    { name: "Beauty Care", slug: "beauty", icon: FaHeart },
    { name: "Tea & Coffee", slug: "tea-coffee", icon: FaCoffee },
    { name: "Winter Care", slug: "winter-skin-care", icon: FaSnowflake },
    { name: "Hair Care", slug: "hair-care", icon: FaCut },
    { name: "Balm & Ointment", slug: "balmointment", icon: FaLeaf },
    { name: "Perfume & Attar", slug: "parfiumbdi-spreatr", icon: FaGem },
    { name: "Baby Care", slug: "baby-care", icon: FaBaby },
    { name: "Cooking Oils", slug: "tel-oil", icon: FaOilCan },
    { name: "Honey", slug: "mdhu-honey", icon: FaLeaf },
    { name: "Dates", slug: "khejur-dates", icon: FaTag },
    { name: "Milk & Dairy", slug: "dudh-milk", icon: FaMugHot },
    { name: "Chocolates", slug: "chocolates", icon: FaCandyCane },
    { name: "Gear & Gadgets", slug: "giyar-end-gzajet", icon: FaCog },
  ];

  // Navigation links
  const navLinks = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/shop", label: "Shop", icon: FaBox },
    { to: "/track-order", label: "Track Order", icon: FaTruck },
    { to: "/cart", label: "Cart", icon: FaShoppingCart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div
            className={`flex items-center shrink-0 transition-all duration-300 ${
              search.searchOpen
                ? "opacity-0 pointer-events-none w-0 overflow-hidden"
                : "opacity-100 w-auto"
            }`}
          >
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              aria-label="Sazz Bazar Home"
            >
              <div className="h-9 w-28 sm:h-10 sm:w-36 overflow-hidden bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                <div className="flex items-center gap-1.5 px-2">
                  <FaStore className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                  <span className="text-base sm:text-lg font-extrabold text-amber-700">
                    Sazz<span className="text-orange-500">Bazar</span>
                  </span>
                </div>
              </div>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-lg font-extrabold tracking-tight text-amber-600 group-hover:text-amber-700 transition-colors">
                  Sazz Bazar
                </span>
                <span className="text-[10px] text-slate-400 tracking-wide">
                  Premium Products • For Everyone
                </span>
              </div>
            </Link>
          </div>

          {/* Search Container Wrapper - Single ref for both mobile and desktop */}
          <div
            ref={searchContainerLocalRef}
            className="flex-1 flex items-center"
          >
            {/* Mobile Search - Only visible on mobile */}
            <div className="md:hidden flex-1 min-w-0">
              <SearchBar
                isMobile={true}
                searchQuery={search.searchQuery}
                setSearchQuery={search.setSearchQuery}
                searchResults={search.searchResults}
                showSuggestions={search.showSuggestions}
                setSearchOpen={search.setSearchOpen}
                mobileSearchRef={search.mobileSearchRef}
                desktopSearchRef={search.desktopSearchRef}
                suggestionsRef={search.suggestionsRef}
                openSearch={search.openSearch}
                clearSearch={search.clearSearch}
                handleSearchSubmit={search.handleSearchSubmit}
                handleProductClick={search.handleProductClick}
                handleViewAll={search.handleViewAll}
                placeholder="Search products..."
              />
            </div>

            {/* Desktop Search - Only visible on desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <SearchBar
                isMobile={false}
                searchQuery={search.searchQuery}
                setSearchQuery={search.setSearchQuery}
                searchResults={search.searchResults}
                showSuggestions={search.showSuggestions}
                setSearchOpen={search.setSearchOpen}
                mobileSearchRef={search.mobileSearchRef}
                desktopSearchRef={search.desktopSearchRef}
                suggestionsRef={search.suggestionsRef}
                openSearch={search.openSearch}
                clearSearch={search.clearSearch}
                handleSearchSubmit={search.handleSearchSubmit}
                handleProductClick={search.handleProductClick}
                handleViewAll={search.handleViewAll}
                placeholder="Search honey, ghee, rice, oil..."
              />
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
              search.searchOpen
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-amber-50 text-amber-700"
                        : "text-slate-600 hover:text-amber-700 hover:bg-amber-50/50"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              title="Open cart"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="h-5 w-5 text-slate-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-[10px] font-bold ring-2 ring-white transition-transform duration-300 hover:scale-110">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 transition-all duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-slate-100 bg-white/95 shadow-lg">
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4">
            <div className="space-y-3">
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        active
                          ? "bg-amber-50 text-amber-700 font-medium"
                          : "bg-slate-50 hover:bg-amber-50/50 text-slate-700"
                      }`}
                    >
                      <link.icon className="h-5 w-5 text-amber-600" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Categories */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="flex items-center gap-2 px-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <FaSpa className="h-3 w-3" />
                  Shop by Category
                </h3>
                <ul className="grid grid-cols-2 gap-1.5 mt-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        to={`/c/${category.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm bg-slate-50 hover:bg-amber-50 text-slate-700 transition-all duration-200 hover:shadow-sm"
                      >
                        <category.icon className="h-4 w-4 text-amber-600" />
                        <span className="truncate">{category.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium transition-all duration-200"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium transition-all duration-200"
                >
                  Contact
                </Link>
                {/* Add this */}
                <Link
                  to="/chat"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium transition-all duration-200"
                >
                  <FaCommentDots className="inline h-3 w-3 mr-1" />
                  Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
