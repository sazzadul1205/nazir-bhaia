// src/hooks/useSearch.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Sample product database - In real app, this would come from an API
const productDatabase = [
  // Foods & Grocery
  {
    id: 1,
    name: "Organic Honey",
    category: "Honey",
    price: "$12.99",
    slug: "organic-honey",
  },
  {
    id: 2,
    name: "Pure Ghee",
    category: "Foods & Grocery",
    price: "$8.99",
    slug: "pure-ghee",
  },
  {
    id: 3,
    name: "Basmati Rice",
    category: "Foods & Grocery",
    price: "$15.99",
    slug: "basmati-rice",
  },
  {
    id: 4,
    name: "Extra Virgin Olive Oil",
    category: "Cooking Oils",
    price: "$22.99",
    slug: "olive-oil",
  },
  {
    id: 5,
    name: "Coconut Oil",
    category: "Cooking Oils",
    price: "$9.99",
    slug: "coconut-oil",
  },
  {
    id: 6,
    name: "Almonds",
    category: "Nuts & Seeds",
    price: "$14.99",
    slug: "almonds",
  },
  {
    id: 7,
    name: "Walnuts",
    category: "Nuts & Seeds",
    price: "$11.99",
    slug: "walnuts",
  },
  {
    id: 8,
    name: "Medjool Dates",
    category: "Dates",
    price: "$18.99",
    slug: "medjool-dates",
  },
  {
    id: 9,
    name: "Fresh Milk",
    category: "Milk & Dairy",
    price: "$4.99",
    slug: "fresh-milk",
  },
  {
    id: 10,
    name: "Dark Chocolate",
    category: "Chocolates",
    price: "$6.99",
    slug: "dark-chocolate",
  },
  {
    id: 11,
    name: "Rose Water Toner",
    category: "Beauty Care",
    price: "$16.99",
    slug: "rose-water",
  },
  {
    id: 12,
    name: "Hyaluronic Acid Serum",
    category: "Beauty Care",
    price: "$24.99",
    slug: "hyaluronic-serum",
  },
  {
    id: 13,
    name: "Vitamin C Cream",
    category: "Beauty Care",
    price: "$19.99",
    slug: "vitamin-c-cream",
  },
  {
    id: 14,
    name: "Argan Oil Shampoo",
    category: "Hair Care",
    price: "$13.99",
    slug: "argan-shampoo",
  },
  {
    id: 15,
    name: "Coconut Conditioner",
    category: "Hair Care",
    price: "$11.99",
    slug: "coconut-conditioner",
  },
  {
    id: 16,
    name: "Hair Growth Serum",
    category: "Hair Care",
    price: "$28.99",
    slug: "hair-growth-serum",
  },
  {
    id: 17,
    name: "Green Tea",
    category: "Tea & Coffee",
    price: "$9.99",
    slug: "green-tea",
  },
  {
    id: 18,
    name: "Arabic Coffee",
    category: "Tea & Coffee",
    price: "$21.99",
    slug: "arabic-coffee",
  },
  {
    id: 19,
    name: "Chamomile Tea",
    category: "Tea & Coffee",
    price: "$8.99",
    slug: "chamomile-tea",
  },
  {
    id: 20,
    name: "Winter Moisturizer",
    category: "Winter Care",
    price: "$17.99",
    slug: "winter-moisturizer",
  },
  {
    id: 21,
    name: "Lip Balm",
    category: "Winter Care",
    price: "$4.99",
    slug: "lip-balm",
  },
  {
    id: 22,
    name: "Baby Lotion",
    category: "Baby Care",
    price: "$12.99",
    slug: "baby-lotion",
  },
  {
    id: 23,
    name: "Diaper Cream",
    category: "Baby Care",
    price: "$8.99",
    slug: "diaper-cream",
  },
  {
    id: 24,
    name: "Oud Attar",
    category: "Perfume & Attar",
    price: "$34.99",
    slug: "oud-attar",
  },
  {
    id: 25,
    name: "Rose Perfume",
    category: "Perfume & Attar",
    price: "$29.99",
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
