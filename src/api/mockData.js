// src/api/mockData.js
import Slide1 from "../assets/Slides/Slide-1.jpg";
import Slide2 from "../assets/Slides/Slide-2.jpg";

export const mockData = {
  // Page metadata
  meta: {
    title: "SazzBazar - Premium Products for Everyone",
    description:
      "Fresh groceries, honey, ghee, daily essentials delivered fast at your doorstep",
    keywords: "honey, ghee, dates, oils, chocolates, beauty care, baby care",
  },

  // Slideshow configuration
  slideshow: {
    enabled: true,
    slides: [
      { id: 1, image: Slide1, alt: "Slider 1" },
      { id: 2, image: Slide2, alt: "Slider 2" },
    ],
  },

  // Categories configuration
  categories: {
    enabled: true,
    title: "Shop by Category",
    items: [
      {
        name: "Balm/Ointment",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/bandcamp.svg",
        slug: "balm-ointment",
      },
      {
        name: "Foods",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/food.svg",
        slug: "foods",
      },
      {
        name: "Dates",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/datadog.svg",
        slug: "dates",
      },
      {
        name: "Gear & Gadgets",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gear.svg",
        slug: "gear-gadgets",
      },
      {
        name: "Chocolates",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/heart.svg",
        slug: "chocolates",
      },
      {
        name: "Hair Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spa.svg",
        slug: "hair-care",
      },
      {
        name: "Oil",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/oil.svg",
        slug: "oil",
      },
      {
        name: "Milk",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dropbox.svg",
        slug: "milk",
      },
      {
        name: "Tea & Coffee",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coffee.svg",
        slug: "tea-coffee",
      },
      {
        name: "Perfume/Attar",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/seedling.svg",
        slug: "perfume-attar",
      },
      {
        name: "Nuts",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/leaf.svg",
        slug: "nuts",
      },
      {
        name: "Beauty Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spa.svg",
        slug: "beauty-care",
      },
      {
        name: "Baby Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/baby.svg",
        slug: "baby-care",
      },
      {
        name: "Honey",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/honey.svg",
        slug: "honey",
      },
      {
        name: "Winter Care",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snowflake.svg",
        slug: "winter-care",
      },
    ],
  },

  // Product sections
  productSections: [
    {
      id: "featured",
      enabled: true,
      title: "Featured Products",
      subtitle: "Handpicked favorites just for you",
      badge: "HOT",
      columns: 4,
      cardStyle: "default",
      bgColor: "bg-white",
      products: [
        {
          id: 1,
          name: "Organic Honey - Pure & Natural",
          category: "Honey",
          price: 1559, // 12.99 * 120
          originalPrice: 1919, // 15.99 * 120
          discount: 15,
          rating: 4.8,
          reviews: 124,
          slug: "organic-honey",
          image: "https://placehold.co/300x300/FFB300/FFFFFF?text=Honey",
          badge: "HOT",
          images: [
            "https://placehold.co/600x600/FFB300/FFFFFF?text=Honey+1",
            "https://placehold.co/600x600/F9A825/FFFFFF?text=Honey+2",
            "https://placehold.co/600x600/F57F17/FFFFFF?text=Honey+3",
          ],
          description: `<h3>Pure & Natural Organic Honey</h3>
            <p>Our organic honey is sourced from sustainable farms and is 100% pure, raw, and unfiltered. Rich in antioxidants and natural enzymes.</p>
            <ul>
              <li>100% Pure & Natural</li>
              <li>Rich in antioxidants</li>
              <li>No added sugar or preservatives</li>
              <li>Supports immune system</li>
              <li>Perfect for tea, cooking, or direct consumption</li>
            </ul>
            <p><strong>Storage:</strong> Store in a cool, dry place away from direct sunlight.</p>`,
        },
        {
          id: 2,
          name: "Premium Ghee - Clarified Butter",
          category: "Dairy",
          price: 1079, // 8.99 * 120
          originalPrice: null,
          rating: 4.9,
          reviews: 89,
          slug: "premium-ghee",
          image: "https://placehold.co/300x300/2E7D32/FFFFFF?text=Ghee",
          badge: "BEST",
          images: [
            "https://placehold.co/600x600/2E7D32/FFFFFF?text=Ghee+1",
            "https://placehold.co/600x600/1B5E20/FFFFFF?text=Ghee+2",
          ],
          description: `<h3>Premium Quality Ghee</h3>
            <p>Made from 100% pure cow's milk butter using traditional methods. Our ghee is rich in healthy fats and has a delightful nutty flavor.</p>
            <ul>
              <li>100% Pure Cow's Milk Ghee</li>
              <li>Rich in Vitamin A, D, E & K</li>
              <li>Lactose-free</li>
              <li>High smoke point - ideal for cooking</li>
              <li>Traditional hand-churned method</li>
            </ul>`,
        },
        {
          id: 3,
          name: "Basmati Rice - Aged 1 Year",
          category: "Foods",
          price: 1919, // 15.99 * 120
          originalPrice: 2399, // 19.99 * 120
          discount: 20,
          rating: 4.7,
          reviews: 56,
          slug: "basmati-rice",
          image: "https://placehold.co/300x300/FFD700/FFFFFF?text=Rice",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/FFD700/FFFFFF?text=Rice+1",
            "https://placehold.co/600x600/F9A825/FFFFFF?text=Rice+2",
          ],
          description: `<h3>Premium Aged Basmati Rice</h3>
            <p>Aged for 1 year to perfection, our basmati rice offers long, fluffy grains with an exquisite aroma and taste.</p>
            <ul>
              <li>Premium quality basmati rice</li>
              <li>Aged 1 year for superior taste</li>
              <li>Long, fluffy grains</li>
              <li>Exquisite aroma and flavor</li>
              <li>Perfect for biryani and special dishes</li>
            </ul>`,
        },
        {
          id: 4,
          name: "Extra Virgin Olive Oil",
          category: "Cooking Oils",
          price: 2759, // 22.99 * 120
          originalPrice: null,
          rating: 4.6,
          reviews: 78,
          slug: "olive-oil",
          image: "https://placehold.co/300x300/4CAF50/FFFFFF?text=Olive",
          badge: "NEW",
          images: [
            "https://placehold.co/600x600/4CAF50/FFFFFF?text=Olive+1",
            "https://placehold.co/600x600/388E3C/FFFFFF?text=Olive+2",
          ],
          description: `<h3>Premium Extra Virgin Olive Oil</h3>
            <p>Cold-pressed from the finest olives, our extra virgin olive oil is rich in healthy monounsaturated fats and antioxidants.</p>
            <ul>
              <li>100% Extra Virgin Olive Oil</li>
              <li>Cold-pressed for maximum benefits</li>
              <li>Rich in antioxidants</li>
              <li>Heart-healthy monounsaturated fats</li>
              <li>Perfect for salads, cooking, and dipping</li>
            </ul>`,
        },
      ],
    },
    {
      id: "top-selling",
      enabled: true,
      title: "Top Selling",
      subtitle: "Most loved by our customers",
      badge: "TRENDING",
      columns: 4,
      cardStyle: "featured",
      bgColor: "bg-amber-50/30",
      products: [
        {
          id: 5,
          name: "Medjool Dates - Premium Quality",
          category: "Dates",
          price: 2279, // 18.99 * 120
          originalPrice: 2999, // 24.99 * 120
          discount: 25,
          rating: 4.9,
          reviews: 234,
          slug: "medjool-dates",
          image: "https://placehold.co/300x300/8D6E63/FFFFFF?text=Dates",
          badge: "HOT",
          images: [
            "https://placehold.co/600x600/8D6E63/FFFFFF?text=Dates+1",
            "https://placehold.co/600x600/6D4C41/FFFFFF?text=Dates+2",
          ],
          description: `<h3>Premium Medjool Dates</h3>
            <p>Known as the "King of Dates," our Medjool dates are large, sweet, and incredibly delicious. Naturally grown and sun-dried.</p>
            <ul>
              <li>Premium Medjool dates</li>
              <li>Naturally sweet and delicious</li>
              <li>Rich in fiber, potassium, and magnesium</li>
              <li>Sun-dried to perfection</li>
              <li>Perfect for snacking or desserts</li>
            </ul>`,
        },
        {
          id: 6,
          name: "Almonds - California Grown",
          category: "Nuts",
          price: 1799, // 14.99 * 120
          originalPrice: null,
          rating: 4.8,
          reviews: 167,
          slug: "almonds",
          image: "https://placehold.co/300x300/D7CCC8/000000?text=Almonds",
          badge: "BEST",
          images: [
            "https://placehold.co/600x600/D7CCC8/000000?text=Almonds+1",
            "https://placehold.co/600x600/BCAAA4/000000?text=Almonds+2",
          ],
          description: `<h3>Premium California Almonds</h3>
            <p>Our California-grown almonds are carefully selected for their size, crunch, and nutritional value. Packed with healthy fats and protein.</p>
            <ul>
              <li>Premium California almonds</li>
              <li>Rich in Vitamin E and magnesium</li>
              <li>Excellent source of protein</li>
              <li>Heart-healthy monounsaturated fats</li>
              <li>Perfect for snacking or baking</li>
            </ul>`,
        },
        {
          id: 7,
          name: "Dark Chocolate 70% Cocoa",
          category: "Chocolates",
          price: 839, // 6.99 * 120
          originalPrice: 1079, // 8.99 * 120
          discount: 22,
          rating: 4.7,
          reviews: 92,
          slug: "dark-chocolate",
          image: "https://placehold.co/300x300/4E342E/FFFFFF?text=Chocolate",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/4E342E/FFFFFF?text=Chocolate+1",
            "https://placehold.co/600x600/3E2723/FFFFFF?text=Chocolate+2",
          ],
          description: `<h3>Premium Dark Chocolate 70% Cocoa</h3>
            <p>Rich and smooth dark chocolate with 70% cocoa content. Made from premium cocoa beans for an intense chocolate experience.</p>
            <ul>
              <li>70% cocoa content</li>
              <li>Rich, intense chocolate flavor</li>
              <li>Made from premium cocoa beans</li>
              <li>Rich in antioxidants</li>
              <li>Perfect for chocolate lovers</li>
            </ul>`,
        },
        {
          id: 8,
          name: "Coconut Oil - Cold Pressed",
          category: "Cooking Oils",
          price: 1199, // 9.99 * 120
          originalPrice: null,
          rating: 4.5,
          reviews: 145,
          slug: "coconut-oil",
          image: "https://placehold.co/300x300/F5F5F5/000000?text=Coconut",
          badge: "TRENDING",
          images: [
            "https://placehold.co/600x600/F5F5F5/000000?text=Coconut+1",
            "https://placehold.co/600x600/E0E0E0/000000?text=Coconut+2",
          ],
          description: `<h3>Premium Cold-Pressed Coconut Oil</h3>
            <p>Pure, unrefined coconut oil extracted using the traditional cold-pressed method. Rich in medium-chain triglycerides (MCTs).</p>
            <ul>
              <li>100% pure coconut oil</li>
              <li>Cold-pressed for maximum nutrients</li>
              <li>Rich in MCTs for energy</li>
              <li>Versatile - cooking, baking, beauty</li>
              <li>Unrefined and naturally processed</li>
            </ul>`,
        },
      ],
    },
    {
      id: "on-sale",
      enabled: true,
      title: "On Sale",
      subtitle: "Great deals at amazing prices",
      badge: "SALE",
      columns: 4,
      cardStyle: "default",
      bgColor: "bg-white",
      products: [
        {
          id: 9,
          name: "Winter Care Gift Set",
          category: "Winter Care",
          price: 3599, // 29.99 * 120
          originalPrice: 5999, // 49.99 * 120
          discount: 40,
          rating: 4.6,
          reviews: 67,
          slug: "winter-gift-set",
          image: "https://placehold.co/300x300/1976D2/FFFFFF?text=Winter",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/1976D2/FFFFFF?text=Winter+1",
            "https://placehold.co/600x600/1565C0/FFFFFF?text=Winter+2",
          ],
          description: `<h3>Complete Winter Care Gift Set</h3>
            <p>Everything you need for winter care in one beautiful gift set. Includes premium moisturizers, lip balms, and hand creams.</p>
            <ul>
              <li>Complete winter care set</li>
              <li>Includes moisturizer, lip balm, hand cream</li>
              <li>Perfect gift for loved ones</li>
              <li>Protects against harsh winter conditions</li>
              <li>Natural ingredients</li>
            </ul>`,
        },
        {
          id: 10,
          name: "Vitamin C Serum - 30ml",
          category: "Beauty Care",
          price: 2399, // 19.99 * 120
          originalPrice: 3599, // 29.99 * 120
          discount: 33,
          rating: 4.4,
          reviews: 89,
          slug: "vitamin-c-serum",
          image: "https://placehold.co/300x300/F57C00/FFFFFF?text=Vitamin+C",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/F57C00/FFFFFF?text=Vitamin+C+1",
            "https://placehold.co/600x600/EF6C00/FFFFFF?text=Vitamin+C+2",
          ],
          description: `<h3>Premium Vitamin C Serum</h3>
            <p>Brighten and rejuvenate your skin with our powerful Vitamin C serum. Formulated with 20% pure Vitamin C for maximum results.</p>
            <ul>
              <li>20% pure Vitamin C</li>
              <li>Brightens skin tone</li>
              <li>Reduces fine lines and wrinkles</li>
              <li>Protects against environmental damage</li>
              <li>Suitable for all skin types</li>
            </ul>`,
        },
        {
          id: 11,
          name: "Hair Growth Oil - 100ml",
          category: "Hair Care",
          price: 2999, // 24.99 * 120
          originalPrice: 4199, // 34.99 * 120
          discount: 28,
          rating: 4.3,
          reviews: 56,
          slug: "hair-growth-oil",
          image: "https://placehold.co/300x300/7B1FA2/FFFFFF?text=Hair+Oil",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/7B1FA2/FFFFFF?text=Hair+Oil+1",
            "https://placehold.co/600x600/6A1B9A/FFFFFF?text=Hair+Oil+2",
          ],
          description: `<h3>Natural Hair Growth Oil</h3>
            <p>Promote healthy hair growth with our premium blend of natural oils. Formulated with rosemary, castor, and essential oils.</p>
            <ul>
              <li>Natural hair growth formula</li>
              <li>Contains rosemary and castor oil</li>
              <li>Stimulates hair follicles</li>
              <li>Reduces hair fall</li>
              <li>Promotes thicker, healthier hair</li>
            </ul>`,
        },
        {
          id: 12,
          name: "Baby Care Starter Kit",
          category: "Baby Care",
          price: 4199, // 34.99 * 120
          originalPrice: 5999, // 49.99 * 120
          discount: 30,
          rating: 4.8,
          reviews: 112,
          slug: "baby-care-kit",
          image: "https://placehold.co/300x300/EC407A/FFFFFF?text=Baby+Kit",
          badge: "SALE",
          images: [
            "https://placehold.co/600x600/EC407A/FFFFFF?text=Baby+Kit+1",
            "https://placehold.co/600x600/D81B60/FFFFFF?text=Baby+Kit+2",
          ],
          description: `<h3>Complete Baby Care Starter Kit</h3>
            <p>Everything you need for your baby's daily care. Includes gentle shampoo, moisturizer, diaper cream, and more.</p>
            <ul>
              <li>Complete baby care set</li>
              <li>Gentle, natural ingredients</li>
              <li>Dermatologically tested</li>
              <li>Safe for sensitive skin</li>
              <li>Perfect for new parents</li>
            </ul>`,
        },
      ],
    },
    {
      id: "new-arrivals",
      enabled: true,
      title: "New Arrivals",
      subtitle: "Fresh products just added",
      badge: "NEW",
      columns: 4,
      cardStyle: "minimal",
      bgColor: "bg-white",
      products: [
        {
          id: 13,
          name: "Arabic Coffee - Premium Blend",
          category: "Tea & Coffee",
          price: 2639, // 21.99 * 120
          originalPrice: null,
          rating: 4.5,
          reviews: 34,
          slug: "arabic-coffee",
          image: "https://placehold.co/300x300/3E2723/FFFFFF?text=Coffee",
          badge: "NEW",
          images: [
            "https://placehold.co/600x600/3E2723/FFFFFF?text=Coffee+1",
            "https://placehold.co/600x600/2C1A0E/FFFFFF?text=Coffee+2",
          ],
          description: `<h3>Premium Arabic Coffee Blend</h3>
            <p>Experience the rich, aromatic flavor of traditional Arabic coffee. Perfectly roasted and blended for an authentic taste.</p>
            <ul>
              <li>Authentic Arabic coffee blend</li>
              <li>Perfectly roasted beans</li>
              <li>Rich and aromatic</li>
              <li>Traditional preparation</li>
              <li>Premium quality beans</li>
            </ul>`,
        },
        {
          id: 14,
          name: "Rose Water Toner - 200ml",
          category: "Beauty Care",
          price: 2039, // 16.99 * 120
          originalPrice: null,
          rating: 4.2,
          reviews: 45,
          slug: "rose-water-toner",
          image: "https://placehold.co/300x300/F48FB1/FFFFFF?text=Rose",
          badge: "NEW",
          images: [
            "https://placehold.co/600x600/F48FB1/FFFFFF?text=Rose+1",
            "https://placehold.co/600x600/F06292/FFFFFF?text=Rose+2",
          ],
          description: `<h3>Natural Rose Water Toner</h3>
            <p>Refresh and revitalize your skin with our pure rose water toner. Gently balances pH and provides natural hydration.</p>
            <ul>
              <li>100% pure rose water</li>
              <li>Natural pH balancer</li>
              <li>Hydrates and refreshes skin</li>
              <li>Anti-inflammatory properties</li>
              <li>Suitable for all skin types</li>
            </ul>`,
        },
        {
          id: 15,
          name: "Oud Attar - 12ml",
          category: "Perfume & Attar",
          price: 4199, // 34.99 * 120
          originalPrice: null,
          rating: 4.9,
          reviews: 78,
          slug: "oud-attar",
          image: "https://placehold.co/300x300/FFC107/FFFFFF?text=Oud",
          badge: "NEW",
          images: [
            "https://placehold.co/600x600/FFC107/FFFFFF?text=Oud+1",
            "https://placehold.co/600x600/FFB300/FFFFFF?text=Oud+2",
          ],
          description: `<h3>Premium Oud Attar</h3>
            <p>Experience the rich, woody fragrance of our premium Oud Attar. Long-lasting and perfect for special occasions.</p>
            <ul>
              <li>Premium quality oud</li>
              <li>Long-lasting fragrance</li>
              <li>Rich, woody aroma</li>
              <li>Concentrated attar oil</li>
              <li>Perfect for special occasions</li>
            </ul>`,
        },
        {
          id: 16,
          name: "Handmade Soap - Lavender",
          category: "Beauty Care",
          price: 1079, // 8.99 * 120
          originalPrice: null,
          rating: 4.6,
          reviews: 23,
          slug: "lavender-soap",
          image: "https://placehold.co/300x300/E1BEE7/000000?text=Soap",
          badge: "NEW",
          images: [
            "https://placehold.co/600x600/E1BEE7/000000?text=Soap+1",
            "https://placehold.co/600x600/CE93D8/000000?text=Soap+2",
          ],
          description: `<h3>Handmade Lavender Soap</h3>
            <p>Gently cleanse and soothe your skin with our handmade lavender soap. Made with natural ingredients for a luxurious experience.</p>
            <ul>
              <li>Handmade with care</li>
              <li>Natural lavender essential oil</li>
              <li>Gentle on skin</li>
              <li>Moisturizing formula</li>
              <li>Perfect for daily use</li>
            </ul>`,
        },
      ],
    },
  ],

  // Ad sections
  adSections: [
    {
      id: "ad-1",
      enabled: true,
      position: "after-featured",
      size: "compact",
      bgGradient: "from-indigo-600 to-purple-600",
      title: "Advertise With Us",
      subtitle: "Reach 5,000+ daily visitors",
      ctaText: "Place Your Ad",
      visitorCount: "5,000+ Daily Visitors",
    },
    {
      id: "ad-2",
      enabled: true,
      position: "after-on-sale",
      size: "default",
      bgGradient: "from-cyan-600 to-blue-600",
      title: "Promote Your Brand Here",
      subtitle: "Reach thousands of potential customers",
      ctaText: "Advertise Now",
      visitorCount: "10,000+ Monthly Visitors",
    },
    {
      id: "ad-3",
      enabled: true,
      position: "after-new-arrivals",
      size: "large",
      bgGradient: "from-amber-600 to-orange-600",
      title: "📢 Advertise With SazzBazar",
      subtitle:
        "Get featured on our homepage and reach thousands of customers daily",
      ctaText: "Get Started",
      visitorCount: "10,000+ Happy Customers",
    },
  ],

  // Contact info for Buy Now
  contactInfo: {
    whatsapp: "+1234567890",
    phone: "+1234567890",
  },

  // Delivery info
  deliveryInfo: {
    freeShipping: true,
    estimatedDays: "2-4",
    returnPolicy: "30 days",
    warranty: "1 year",
    inStock: true,
  },
};