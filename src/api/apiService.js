// src/api/apiService.js
import { mockData } from "./mockData";

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Base API URL - change this when you have a real backend
const API_BASE_URL = "http://localhost:5000/";

class ApiService {
  constructor() {
    this.useMock = true; // Set to false when using real API
  }

  // Generic request method
  async request(endpoint, options = {}) {
    if (this.useMock) {
      // Use mock data
      await delay(800 + Math.random() * 400); // Simulate network delay
      return this.handleMockRequest(endpoint, options);
    }

    // Real API request
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // Mock request handler
  handleMockRequest(endpoint, options) {
    // Extract path without query params
    const path = endpoint.split("?")[0];

    switch (path) {
      case "/data":
        return this.getMockData();
      case "/products":
        return this.getMockProducts(endpoint, options);
      case "/product":
        return this.getMockProduct(endpoint, options);
      case "/categories":
        return this.getMockCategories();
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }

  // GET all data
  getMockData() {
    return {
      success: true,
      data: mockData,
    };
  }

  // GET products with optional filtering
  getMockProducts(endpoint) {
    let allProducts = [];

    // Flatten all products from all sections
    mockData.productSections.forEach((section) => {
      if (section.products && section.products.length > 0) {
        allProducts = [...allProducts, ...section.products];
      }
    });

    // Parse query params from the URL
    const queryString = endpoint.includes("?") ? endpoint.split("?")[1] : "";
    const params = new URLSearchParams(queryString);

    const sectionId = params.get("sectionId");
    const category = params.get("category");
    const search = params.get("search");
    const limit = parseInt(params.get("limit")) || 100;

    let products = [...allProducts];

    // Filter by section
    if (sectionId) {
      const section = mockData.productSections.find((s) => s.id === sectionId);
      if (section) {
        products = section.products;
      }
    }

    // Filter by category
    if (category) {
      products = products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    // Search
    if (search) {
      const searchTerm = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.category?.toLowerCase().includes(searchTerm) ||
          p.slug?.toLowerCase().includes(searchTerm),
      );
    }

    // Limit
    products = products.slice(0, limit);

    return {
      success: true,
      data: products,
      total: products.length,
    };
  }

  // GET single product
  getMockProduct(endpoint) {
    let allProducts = [];

    // Flatten all products from all sections
    mockData.productSections.forEach((section) => {
      if (section.products && section.products.length > 0) {
        allProducts = [...allProducts, ...section.products];
      }
    });

    const queryString = endpoint.includes("?") ? endpoint.split("?")[1] : "";
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const slug = params.get("slug");

    let product = null;

    // Find product by id or slug
    allProducts.forEach((p) => {
      if ((id && p.id === parseInt(id)) || (slug && p.slug === slug)) {
        product = p;
      }
    });

    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    return {
      success: true,
      data: product,
    };
  }

  // GET categories
  getMockCategories() {
    return {
      success: true,
      data: mockData.categories,
    };
  }

  // Public API methods
  async getData() {
    return this.request("/data");
  }

  async getProducts(filters = {}) {
    // Build query string from filters
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    const url = `/products${queryString ? `?${queryString}` : ""}`;
    return this.request(url);
  }

  async getProduct(id) {
    return this.request(`/product?id=${id}`);
  }

  async getProductBySlug(slug) {
    return this.request(`/product?slug=${slug}`);
  }

  async getCategories() {
    return this.request("/categories");
  }
}

// Singleton instance
export const apiService = new ApiService();

// Export individual functions for convenience
export const getData = () => apiService.getData();
export const getProducts = (filters) => apiService.getProducts(filters);
export const getProduct = (id) => apiService.getProduct(id);
export const getProductBySlug = (slug) => apiService.getProductBySlug(slug);
export const getCategories = () => apiService.getCategories();
