// src/pages/Shop/hooks/useFilters.js
import { useState, useMemo } from "react";

const initialState = {
  searchTerm: "",
  categories: [],
  priceRange: [0, 10000],
  ratings: 0,
  brands: [],
  availability: "all",
  sortBy: "popular",
};

export const useFilters = (products) => {
  const [filters, setFilters] = useState(initialState);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
    return cats.sort();
  }, [products]);

  const brands = useMemo(() => {
    const br = [...new Set(products.map((p) => p.brand).filter(Boolean))];
    return br.sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 10000);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term),
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    if (filters.ratings > 0) {
      result = result.filter((p) => (p.rating || 0) >= filters.ratings);
    }

    if (filters.availability === "inStock") {
      result = result.filter((p) => p.inStock !== false);
    } else if (filters.availability === "outOfStock") {
      result = result.filter((p) => p.inStock === false);
    }

    const sortMap = {
      "price-low": (a, b) => (a.price || 0) - (b.price || 0),
      "price-high": (a, b) => (b.price || 0) - (a.price || 0),
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
      newest: (a, b) => (b.id || 0) - (a.id || 0),
      popular: (a, b) => (b.reviews || 0) - (a.reviews || 0),
    };
    result.sort(sortMap[filters.sortBy] || sortMap.popular);

    return result;
  }, [products, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.brands.length > 0) count++;
    if (filters.ratings > 0) count++;
    if (filters.availability !== "all") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice) count++;
    if (filters.searchTerm) count++;
    return count;
  }, [filters, maxPrice]);

  const clearAllFilters = () => {
    setFilters({ ...initialState, priceRange: [0, maxPrice] });
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    categories,
    brands,
    maxPrice,
    activeFilterCount,
    clearAllFilters,
  };
};
