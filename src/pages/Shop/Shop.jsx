// src/pages/Shop/Shop.jsx
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { getProducts } from "../../api/apiService";
import ProductModal from "../../components/ProductModal/ProductModal";
import ShopHeader from "./components/ShopHeader";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import MobileFilterModal from "./components/MobileFilterModal";
import { useFilters } from "./hooks/useFilters";

const Shop = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const {
    filters,
    setFilters,
    filteredProducts,
    categories,
    brands,
    maxPrice,
    activeFilterCount,
    clearAllFilters,
  } = useFilters(products);

  // Get search query from URL
  const searchParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts({ limit: 100 });
        if (result.success) {
          setProducts(result.data);
          const maxPrice = Math.max(...result.data.map((p) => p.price), 10000);
          setFilters((prev) => ({
            ...prev,
            priceRange: [0, maxPrice],
            searchTerm: searchParam || "",
          }));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParam, setFilters]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <ShopSkeleton />;

  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-10">
      <ShopHeader
        productCount={filteredProducts.length}
        searchTerm={filters.searchTerm}
        activeFilterCount={activeFilterCount}
        sortBy={filters.sortBy}
        onSortChange={(value) =>
          setFilters((prev) => ({ ...prev, sortBy: value }))
        }
        onFilterToggle={() => setIsMobileFilterOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex gap-6">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          brands={brands}
          maxPrice={maxPrice}
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
        />

        <ProductGrid
          products={filteredProducts}
          viewMode={viewMode}
          totalProducts={products.length}
          onProductClick={handleProductClick}
          addToCart={addToCart}
        />
      </div>

      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        brands={brands}
        maxPrice={maxPrice}
        activeFilterCount={activeFilterCount}
        clearAllFilters={clearAllFilters}
      />

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

const ShopSkeleton = () => (
  <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 md:py-10">
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-48 mb-4" />
      <div className="flex gap-4 mb-6">
        <div className="h-10 bg-slate-200 rounded w-32" />
        <div className="h-10 bg-slate-200 rounded w-32" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            <div className="aspect-square bg-slate-200" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-16" />
              <div className="h-4 bg-slate-200 rounded w-24" />
              <div className="h-3 bg-slate-200 rounded w-20" />
              <div className="h-8 bg-slate-200 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Shop;
