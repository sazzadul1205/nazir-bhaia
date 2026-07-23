// src/hooks/useSearch.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatTaka } from "../utils/currency";

// Sample product database - In real app, this would come from an API
const productDatabase = [
  // Foods & Grocery
  {
    id: 1,
    name: "Organic Honey",
    category: "Honey",
    price: 1559,
    slug: "organic-honey",
  },
  {
    id: 2,
    name: "Pure Ghee",
    category: "Foods & Grocery",
    price: 1079,
    slug: "pure-ghee",
  },
  {
    id: 3,
    name: "Basmati Rice",
    category: "Foods & Grocery",
    price: 1919,
    slug: "basmati-rice",
  },
  {
    id: 4,
    name: "Extra Virgin Olive Oil",
    category: "Cooking Oils",
    price: 2759,
    slug: "olive-oil",
  },
  {
    id: 5,
    name: "Coconut Oil",
    category: "Cooking Oils",
    price: 1199,
    slug: "coconut-oil",
  },
  {
    id: 6,
    name: "Almonds",
    category: "Nuts & Seeds",
    price: 1799,
    slug: "almonds",
  },
  {
    id: 7,
    name: "Walnuts",
    category: "Nuts & Seeds",
    price: 1439,
    slug: "walnuts",
  },
  {
    id: 8,
    name: "Medjool Dates",
    category: "Dates",
    price: 2279,
    slug: "medjool-dates",
  },
  {
    id: 9,
    name: "Fresh Milk",
    category: "Milk & Dairy",
    price: 599,
    slug: "fresh-milk",
  },
  {
    id: 10,
    name: "Dark Chocolate",
    category: "Chocolates",
    price: 839,
    slug: "dark-chocolate",
  },
  {
    id: 11,
    name: "Rose Water Toner",
    category: "Beauty Care",
    price: 2039,
    slug: "rose-water",
  },
  {
    id: 12,
    name: "Hyaluronic Acid Serum",
    category: "Beauty Care",
    price: 2999,
    slug: "hyaluronic-serum",
  },
  {
    id: 13,
    name: "Vitamin C Cream",
    category: "Beauty Care",
    price: 2399,
    slug: "vitamin-c-cream",
  },
  {
    id: 14,
    name: "Argan Oil Shampoo",
    category: "Hair Care",
    price: 1679,
    slug: "argan-shampoo",
  },
  {
    id: 15,
    name: "Coconut Conditioner",
    category: "Hair Care",
    price: 1439,
    slug: "coconut-conditioner",
  },
  {
    id: 16,
    name: "Hair Growth Serum",
    category: "Hair Care",
    price: 3479,
    slug: "hair-growth-serum",
  },
  {
    id: 17,
    name: "Green Tea",
    category: "Tea & Coffee",
    price: 1199,
    slug: "green-tea",
  },
  {
    id: 18,
    name: "Arabic Coffee",
    category: "Tea & Coffee",
    price: 2639,
    slug: "arabic-coffee",
  },
  {
    id: 19,
    name: "Chamomile Tea",
    category: "Tea & Coffee",
    price: 1079,
    slug: "chamomile-tea",
  },
  {
    id: 20,
    name: "Winter Moisturizer",
    category: "Winter Care",
    price: 2159,
    slug: "winter-moisturizer",
  },
  {
    id: 21,
    name: "Lip Balm",
    category: "Winter Care",
    price: 599,
    slug: "lip-balm",
  },
  {
    id: 22,
    name: "Baby Lotion",
    category: "Baby Care",
    price: 1559,
    slug: "baby-lotion",
  },
  {
    id: 23,
    name: "Diaper Cream",
    category: "Baby Care",
    price: 1079,
    slug: "diaper-cream",
  },
  {
    id: 24,
    name: "Oud Attar",
    category: "Perfume & Attar",
    price: 4199,
    slug: "oud-attar",
  },
  {
    id: 25,
    name: "Rose Perfume",
    category: "Perfume & Attar",
    price: 3599,
    slug: "rose-perfume",
  },
];

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const mobileSearchRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const navigate = useNavigate();

  // ----- FUNCTIONS with useCallback to prevent unnecessary re-renders -----

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => {
      if (mobileSearchRef.current) {
        mobileSearchRef.current.focus();
      }
    }, 100);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
    if (mobileSearchRef.current) {
      mobileSearchRef.current.focus();
    }
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
        closeSearch();
        setShowSuggestions(false);
      }
    },
    [searchQuery, navigate, closeSearch],
  );

  const handleProductClick = useCallback(
    (productSlug) => {
      navigate(`/product/${productSlug}`);
      closeSearch();
      setShowSuggestions(false);
    },
    [navigate, closeSearch],
  );

  const handleViewAll = useCallback(() => {
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
      setShowSuggestions(false);
    }
  }, [searchQuery, navigate, closeSearch]);

  // ----- EFFECTS -----

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        const filtered = productDatabase.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(filtered);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (searchOpen) {
          closeSearch();
        }
        if (showSuggestions) {
          setShowSuggestions(false);
        }
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [searchOpen, showSuggestions, closeSearch]);

  return {
    // State
    searchQuery,
    setSearchQuery,
    searchResults,
    showSuggestions,
    setShowSuggestions,
    searchOpen,
    setSearchOpen,

    // Refs
    mobileSearchRef,
    desktopSearchRef,
    suggestionsRef,

    // Functions (all memoized)
    openSearch,
    closeSearch,
    clearSearch,
    handleSearchSubmit,
    handleProductClick,
    handleViewAll,
  };
};

export { formatTaka };
