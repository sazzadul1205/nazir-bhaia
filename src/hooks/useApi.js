// src/hooks/useApi.js
import { useState, useCallback } from "react";
import {
  getData,
  getProducts,
  getProduct,
  getCategories,
} from "../api/apiService";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Generic fetch function
  const fetchData = useCallback(async (fetchFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(...args);
      if (result.success) {
        setData(result.data);
        return result.data;
      } else {
        throw new Error(result.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all data
  const fetchAllData = useCallback(() => {
    return fetchData(getData);
  }, [fetchData]);

  // Fetch products
  const fetchProducts = useCallback(
    (filters = {}) => {
      return fetchData(getProducts, filters);
    },
    [fetchData],
  );

  // Fetch single product
  const fetchProduct = useCallback(
    (id) => {
      return fetchData(getProduct, id);
    },
    [fetchData],
  );

  // Fetch categories
  const fetchCategories = useCallback(() => {
    return fetchData(getCategories);
  }, [fetchData]);

  return {
    loading,
    error,
    data,
    fetchAllData,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    // Reset states
    reset: () => {
      setLoading(false);
      setError(null);
      setData(null);
    },
  };
};
