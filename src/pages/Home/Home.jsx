// src/pages/Home/Home.jsx
// src/pages/Home/Home.jsx
import {
  FaBolt,
  FaLeaf,
  FaGem,
  FaCog,
  FaHeart,
  FaOilCan,
  FaCoffee,
  FaSeedling,
  FaSpa,
  FaBaby,
  FaTint,
  FaSnowflake,
} from "react-icons/fa";

import TopSection from "./TopSection/TopSection";
import BrowseCategories from "./BrowseCategories/BrowseCategories";
import PlaceYourAd from "./PlaceYourAd/PlaceYourAd";
import ProductSection from "./ProductSection/ProductSection";
import BrowseCategories from "./BrowseCategories/BrowseCategories";
import PlaceYourAd from "./PlaceYourAd/PlaceYourAd";
import ProductSection from "./ProductSection/ProductSection";

import Slide1 from "../../assets/Slides/Slide-1.jpg";
import Slide2 from "../../assets/Slides/Slide-2.jpg";

// Sample product data with placehold.co images
const sampleProducts = {
  featured: [
    {
      id: 1,
      name: "Organic Honey - Pure & Natural",
      category: "Honey",
      price: 12.99,
      originalPrice: 15.99,
      discount: 15,
      rating: 4.8,
      reviews: 124,
      slug: "organic-honey",
      image: "https://placehold.co/300x300/FFB300/FFFFFF?text=Honey",
      badge: "HOT",
    },
    {
      id: 2,
      name: "Premium Ghee - Clarified Butter",
      category: "Dairy",
      price: 8.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      slug: "premium-ghee",
      image: "https://placehold.co/300x300/2E7D32/FFFFFF?text=Ghee",
      badge: "BEST",
    },
    {
      id: 3,
      name: "Basmati Rice - Aged 1 Year",
      category: "Foods",
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      rating: 4.7,
      reviews: 56,
      slug: "basmati-rice",
      image: "https://placehold.co/300x300/FFD700/FFFFFF?text=Rice",
      badge: "SALE",
    },
    {
      id: 4,
      name: "Extra Virgin Olive Oil",
      category: "Cooking Oils",
      price: 22.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 78,
      slug: "olive-oil",
      image: "https://placehold.co/300x300/4CAF50/FFFFFF?text=Olive",
      badge: "NEW",
    },
  ],
  topSelling: [
    {
      id: 5,
      name: "Medjool Dates - Premium Quality",
      category: "Dates",
      price: 18.99,
      originalPrice: 24.99,
      discount: 25,
      rating: 4.9,
      reviews: 234,
      slug: "medjool-dates",
      image: "https://placehold.co/300x300/8D6E63/FFFFFF?text=Dates",
      badge: "HOT",
    },
    {
      id: 6,
      name: "Almonds - California Grown",
      category: "Nuts",
      price: 14.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 167,
      slug: "almonds",
      image: "https://placehold.co/300x300/D7CCC8/000000?text=Almonds",
      badge: "BEST",
    },
    {
      id: 7,
      name: "Dark Chocolate 70% Cocoa",
      category: "Chocolates",
      price: 6.99,
      originalPrice: 8.99,
      discount: 22,
      rating: 4.7,
      reviews: 92,
      slug: "dark-chocolate",
      image: "https://placehold.co/300x300/4E342E/FFFFFF?text=Chocolate",
      badge: "SALE",
    },
    {
      id: 8,
      name: "Coconut Oil - Cold Pressed",
      category: "Cooking Oils",
      price: 9.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 145,
      slug: "coconut-oil",
      image: "https://placehold.co/300x300/F5F5F5/000000?text=Coconut",
      badge: "TRENDING",
    },
  ],
  onSale: [
    {
      id: 9,
      name: "Winter Care Gift Set",
      category: "Winter Care",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      rating: 4.6,
      reviews: 67,
      slug: "winter-gift-set",
      image: "https://placehold.co/300x300/1976D2/FFFFFF?text=Winter",
      badge: "SALE",
    },
    {
      id: 10,
      name: "Vitamin C Serum - 30ml",
      category: "Beauty Care",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.4,
      reviews: 89,
      slug: "vitamin-c-serum",
      image: "https://placehold.co/300x300/F57C00/FFFFFF?text=Vitamin+C",
      badge: "SALE",
    },
    {
      id: 11,
      name: "Hair Growth Oil - 100ml",
      category: "Hair Care",
      price: 24.99,
      originalPrice: 34.99,
      discount: 28,
      rating: 4.3,
      reviews: 56,
      slug: "hair-growth-oil",
      image: "https://placehold.co/300x300/7B1FA2/FFFFFF?text=Hair+Oil",
      badge: "SALE",
    },
    {
      id: 12,
      name: "Baby Care Starter Kit",
      category: "Baby Care",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.8,
      reviews: 112,
      slug: "baby-care-kit",
      image: "https://placehold.co/300x300/EC407A/FFFFFF?text=Baby+Kit",
      badge: "SALE",
    },
  ],
  newArrivals: [
    {
      id: 13,
      name: "Arabic Coffee - Premium Blend",
      category: "Tea & Coffee",
      price: 21.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 34,
      slug: "arabic-coffee",
      image: "https://placehold.co/300x300/3E2723/FFFFFF?text=Coffee",
      badge: "NEW",
    },
    {
      id: 14,
      name: "Rose Water Toner - 200ml",
      category: "Beauty Care",
      price: 16.99,
      originalPrice: null,
      rating: 4.2,
      reviews: 45,
      slug: "rose-water-toner",
      image: "https://placehold.co/300x300/F48FB1/FFFFFF?text=Rose",
      badge: "NEW",
    },
    {
      id: 15,
      name: "Oud Attar - 12ml",
      category: "Perfume & Attar",
      price: 34.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 78,
      slug: "oud-attar",
      image: "https://placehold.co/300x300/FFC107/FFFFFF?text=Oud",
      badge: "NEW",
    },
    {
      id: 16,
      name: "Handmade Soap - Lavender",
      category: "Beauty Care",
      price: 8.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 23,
      slug: "lavender-soap",
      image: "https://placehold.co/300x300/E1BEE7/000000?text=Soap",
      badge: "NEW",
    },
  ],
};

// Sample product data with placehold.co images
const sampleProducts = {
  featured: [
    {
      id: 1,
      name: "Organic Honey - Pure & Natural",
      category: "Honey",
      price: 12.99,
      originalPrice: 15.99,
      discount: 15,
      rating: 4.8,
      reviews: 124,
      slug: "organic-honey",
      image: "https://placehold.co/300x300/FFB300/FFFFFF?text=Honey",
      badge: "HOT",
    },
    {
      id: 2,
      name: "Premium Ghee - Clarified Butter",
      category: "Dairy",
      price: 8.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 89,
      slug: "premium-ghee",
      image: "https://placehold.co/300x300/2E7D32/FFFFFF?text=Ghee",
      badge: "BEST",
    },
    {
      id: 3,
      name: "Basmati Rice - Aged 1 Year",
      category: "Foods",
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      rating: 4.7,
      reviews: 56,
      slug: "basmati-rice",
      image: "https://placehold.co/300x300/FFD700/FFFFFF?text=Rice",
      badge: "SALE",
    },
    {
      id: 4,
      name: "Extra Virgin Olive Oil",
      category: "Cooking Oils",
      price: 22.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 78,
      slug: "olive-oil",
      image: "https://placehold.co/300x300/4CAF50/FFFFFF?text=Olive",
      badge: "NEW",
    },
  ],
  topSelling: [
    {
      id: 5,
      name: "Medjool Dates - Premium Quality",
      category: "Dates",
      price: 18.99,
      originalPrice: 24.99,
      discount: 25,
      rating: 4.9,
      reviews: 234,
      slug: "medjool-dates",
      image: "https://placehold.co/300x300/8D6E63/FFFFFF?text=Dates",
      badge: "HOT",
    },
    {
      id: 6,
      name: "Almonds - California Grown",
      category: "Nuts",
      price: 14.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 167,
      slug: "almonds",
      image: "https://placehold.co/300x300/D7CCC8/000000?text=Almonds",
      badge: "BEST",
    },
    {
      id: 7,
      name: "Dark Chocolate 70% Cocoa",
      category: "Chocolates",
      price: 6.99,
      originalPrice: 8.99,
      discount: 22,
      rating: 4.7,
      reviews: 92,
      slug: "dark-chocolate",
      image: "https://placehold.co/300x300/4E342E/FFFFFF?text=Chocolate",
      badge: "SALE",
    },
    {
      id: 8,
      name: "Coconut Oil - Cold Pressed",
      category: "Cooking Oils",
      price: 9.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 145,
      slug: "coconut-oil",
      image: "https://placehold.co/300x300/F5F5F5/000000?text=Coconut",
      badge: "TRENDING",
    },
  ],
  onSale: [
    {
      id: 9,
      name: "Winter Care Gift Set",
      category: "Winter Care",
      price: 29.99,
      originalPrice: 49.99,
      discount: 40,
      rating: 4.6,
      reviews: 67,
      slug: "winter-gift-set",
      image: "https://placehold.co/300x300/1976D2/FFFFFF?text=Winter",
      badge: "SALE",
    },
    {
      id: 10,
      name: "Vitamin C Serum - 30ml",
      category: "Beauty Care",
      price: 19.99,
      originalPrice: 29.99,
      discount: 33,
      rating: 4.4,
      reviews: 89,
      slug: "vitamin-c-serum",
      image: "https://placehold.co/300x300/F57C00/FFFFFF?text=Vitamin+C",
      badge: "SALE",
    },
    {
      id: 11,
      name: "Hair Growth Oil - 100ml",
      category: "Hair Care",
      price: 24.99,
      originalPrice: 34.99,
      discount: 28,
      rating: 4.3,
      reviews: 56,
      slug: "hair-growth-oil",
      image: "https://placehold.co/300x300/7B1FA2/FFFFFF?text=Hair+Oil",
      badge: "SALE",
    },
    {
      id: 12,
      name: "Baby Care Starter Kit",
      category: "Baby Care",
      price: 34.99,
      originalPrice: 49.99,
      discount: 30,
      rating: 4.8,
      reviews: 112,
      slug: "baby-care-kit",
      image: "https://placehold.co/300x300/EC407A/FFFFFF?text=Baby+Kit",
      badge: "SALE",
    },
  ],
  newArrivals: [
    {
      id: 13,
      name: "Arabic Coffee - Premium Blend",
      category: "Tea & Coffee",
      price: 21.99,
      originalPrice: null,
      rating: 4.5,
      reviews: 34,
      slug: "arabic-coffee",
      image: "https://placehold.co/300x300/3E2723/FFFFFF?text=Coffee",
      badge: "NEW",
    },
    {
      id: 14,
      name: "Rose Water Toner - 200ml",
      category: "Beauty Care",
      price: 16.99,
      originalPrice: null,
      rating: 4.2,
      reviews: 45,
      slug: "rose-water-toner",
      image: "https://placehold.co/300x300/F48FB1/FFFFFF?text=Rose",
      badge: "NEW",
    },
    {
      id: 15,
      name: "Oud Attar - 12ml",
      category: "Perfume & Attar",
      price: 34.99,
      originalPrice: null,
      rating: 4.9,
      reviews: 78,
      slug: "oud-attar",
      image: "https://placehold.co/300x300/FFC107/FFFFFF?text=Oud",
      badge: "NEW",
    },
    {
      id: 16,
      name: "Handmade Soap - Lavender",
      category: "Beauty Care",
      price: 8.99,
      originalPrice: null,
      rating: 4.6,
      reviews: 23,
      slug: "lavender-soap",
      image: "https://placehold.co/300x300/E1BEE7/000000?text=Soap",
      badge: "NEW",
    },
  ],
};

const Home = () => {
  const slides = [
    { id: 1, image: Slide1, alt: "Slider 1" },
    { id: 2, image: Slide2, alt: "Slider 2" },
  ];

  const categories = [
    {
      name: "Balm/Ointment",
      icon: <FaBolt className="text-amber-600" />,
      slug: "balm-ointment",
    },
    {
      name: "Foods",
      icon: <FaLeaf className="text-emerald-600" />,
      slug: "foods",
    },
    {
      name: "Dates",
      icon: <FaGem className="text-amber-700" />,
      slug: "dates",
    },
    {
      name: "Gear & Gadgets",
      icon: <FaCog className="text-slate-600" />,
      slug: "gear-gadgets",
    },
    {
      name: "Chocolates",
      icon: <FaHeart className="text-rose-600" />,
      slug: "chocolates",
    },
    {
      name: "Hair Care",
      icon: <FaSpa className="text-purple-600" />,
      slug: "hair-care",
    },
    {
      name: "Oil",
      icon: <FaOilCan className="text-yellow-700" />,
      slug: "oil",
    },
    { name: "Milk", icon: <FaTint className="text-blue-400" />, slug: "milk" },
    {
      name: "Tea & Coffee",
      icon: <FaCoffee className="text-amber-800" />,
      slug: "tea-coffee",
    },
    {
      name: "Perfume/Attar",
      icon: <FaSeedling className="text-pink-600" />,
      slug: "perfume-attar",
    },
    { name: "Nuts", icon: <FaLeaf className="text-amber-700" />, slug: "nuts" },
    {
      name: "Beauty Care",
      icon: <FaSpa className="text-rose-500" />,
      slug: "beauty-care",
    },
    {
      name: "Baby Care",
      icon: <FaBaby className="text-sky-500" />,
      slug: "baby-care",
    },
    {
      name: "Honey",
      icon: <FaGem className="text-amber-600" />,
      slug: "honey",
    },
    {
      name: "Winter Care",
      icon: <FaSnowflake className="text-blue-500" />,
      slug: "winter-care",
    },
    {
      name: "Balm/Ointment",
      icon: <FaBolt className="text-amber-600" />,
      slug: "balm-ointment",
    },
    {
      name: "Foods",
      icon: <FaLeaf className="text-emerald-600" />,
      slug: "foods",
    },
    {
      name: "Dates",
      icon: <FaGem className="text-amber-700" />,
      slug: "dates",
    },
    {
      name: "Gear & Gadgets",
      icon: <FaCog className="text-slate-600" />,
      slug: "gear-gadgets",
    },
    {
      name: "Chocolates",
      icon: <FaHeart className="text-rose-600" />,
      slug: "chocolates",
    },
    {
      name: "Hair Care",
      icon: <FaSpa className="text-purple-600" />,
      slug: "hair-care",
    },
    {
      name: "Oil",
      icon: <FaOilCan className="text-yellow-700" />,
      slug: "oil",
    },
    { name: "Milk", icon: <FaTint className="text-blue-400" />, slug: "milk" },
    {
      name: "Tea & Coffee",
      icon: <FaCoffee className="text-amber-800" />,
      slug: "tea-coffee",
    },
    {
      name: "Perfume/Attar",
      icon: <FaSeedling className="text-pink-600" />,
      slug: "perfume-attar",
    },
    { name: "Nuts", icon: <FaLeaf className="text-amber-700" />, slug: "nuts" },
    {
      name: "Beauty Care",
      icon: <FaSpa className="text-rose-500" />,
      slug: "beauty-care",
    },
    {
      name: "Baby Care",
      icon: <FaBaby className="text-sky-500" />,
      slug: "baby-care",
    },
    {
      name: "Honey",
      icon: <FaGem className="text-amber-600" />,
      slug: "honey",
    },
    {
      name: "Winter Care",
      icon: <FaSnowflake className="text-blue-500" />,
      slug: "winter-care",
    },
  ];

  return (
    <>
      <TopSection slides={slides} categories={categories} />
      <BrowseCategories categories={categories} />

      <ProductSection
        title="Featured Products"
        subtitle="Handpicked favorites just for you"
        products={sampleProducts.featured}
        badge="HOT"
        columns={4}
        cardStyle="default"
      />

      <PlaceYourAd
        size="compact"
        bgGradient="from-indigo-600 to-purple-600"
        title="Advertise With Us"
        subtitle="Reach 5,000+ daily visitors"
        ctaText="Place Your Ad"
        visitorCount="5,000+ Daily Visitors"
      />

      <ProductSection
        title="Top Selling"
        subtitle="Most loved by our customers"
        products={sampleProducts.topSelling}
        badge="TRENDING"
        columns={4}
        cardStyle="featured"
        bgColor="bg-amber-50/30"
      />

      <ProductSection
        title="On Sale"
        subtitle="Great deals at amazing prices"
        products={sampleProducts.onSale}
        badge="SALE"
        columns={4}
        cardStyle="default"
      />

      <PlaceYourAd
        size="default"
        bgGradient="from-cyan-600 to-blue-600"
        title="Promote Your Brand Here"
        subtitle="Reach thousands of potential customers"
        ctaText="Advertise Now"
        visitorCount="10,000+ Monthly Visitors"
      />

      <ProductSection
        title="New Arrivals"
        subtitle="Fresh products just added"
        products={sampleProducts.newArrivals}
        badge="NEW"
        columns={4}
        cardStyle="minimal"
      />

      <PlaceYourAd
        size="large"
        bgGradient="from-amber-600 to-orange-600"
        title="📢 Advertise With SazzBazar"
        subtitle="Get featured on our homepage and reach thousands of customers daily"
        ctaText="Get Started"
        visitorCount="10,000+ Happy Customers"
      />
    </>
  );
};

export default Home;
