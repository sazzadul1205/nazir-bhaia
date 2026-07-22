// src/Shared/Footer/Footer.jsx
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaLeaf,
  FaStore,
  FaArrowRight,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ----- Custom Bangladesh Payment Icons (text-based, no external deps) -----
const BkashIcon = ({ className = "text-2xl" }) => (
  <span className={`font-bold ${className}`} style={{ color: "#D61A7D" }}>
    bKash
  </span>
);
const NagadIcon = ({ className = "text-2xl" }) => (
  <span className={`font-bold ${className}`} style={{ color: "#F58420" }}>
    Nagad
  </span>
);
const RocketIcon = ({ className = "text-2xl" }) => (
  <span className={`font-bold ${className}`} style={{ color: "#1A7BC4" }}>
    Rocket
  </span>
);

// Icon mapping for React Icons (only from react-icons/fa)
const iconMap = {
  // Feature Icons
  truck: FaTruck,
  shield: FaShieldAlt,
  undo: FaUndo,
  clock: FaClock,
  leaf: FaLeaf,
  store: FaStore,
  heart: FaHeart,
  phone: FaPhone,
  envelope: FaEnvelope,
  mapMarker: FaMapMarkerAlt,

  // Social Icons
  facebook: FaFacebook,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  pinterest: FaPinterest,

  // International Payment Icons
  paypal: FaPaypal,
  visa: FaCcVisa,
  mastercard: FaCcMastercard,
  amex: FaCcAmex,
  discover: FaCcDiscover,
};

// Helper to get React Icon component (only for Fa icons now)
const getIcon = (iconName, className = "text-lg") => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

// ----- Configuration -----
const footerConfig = {
  // Brand Info
  brand: {
    name: "SazzBazar",
    tagline:
      "Fresh groceries, honey, ghee, daily essentials — delivered fast at your doorstep with love. 💛",
    logo: null,
    logoIcon: "store",
    logoBg: "from-amber-100 to-orange-100",
    logoBorder: "border-amber-200/60",
    brandColor: "text-amber-700",
    accentColor: "text-orange-500",
  },

  // Contact Information
  contact: {
    phone: "01818-186097",
    phoneDisplay: "01818-186097",
    email: "support@sazzbazar.com",
    address: "Dhaka, Bangladesh",
    showPhone: true,
    showEmail: true,
    showAddress: true,
  },

  // Social Links
  social: {
    enabled: true,
    links: [
      {
        icon: "facebook",
        url: "https://facebook.com/valobazar",
        label: "Facebook",
      },
      {
        icon: "instagram",
        url: "https://instagram.com/valobazar",
        label: "Instagram",
      },
      {
        icon: "youtube",
        url: "https://youtube.com/valobazar",
        label: "YouTube",
      },
      {
        icon: "whatsapp",
        url: "https://wa.me/8801719225779",
        label: "WhatsApp",
      },
      {
        icon: "twitter",
        url: "https://twitter.com/valobazar",
        label: "Twitter",
      },
      {
        icon: "linkedin",
        url: "https://linkedin.com/company/valobazar",
        label: "LinkedIn",
      },
    ],
  },

  // Features Row
  features: {
    enabled: true,
    items: [
      {
        icon: "truck",
        title: "Free Delivery",
        desc: "On orders over $50",
        color: "text-emerald-500",
      },
      {
        icon: "shield",
        title: "Secure Payment",
        desc: "100% protected",
        color: "text-emerald-500",
      },
      {
        icon: "undo",
        title: "Easy Returns",
        desc: "30 days return policy",
        color: "text-emerald-500",
      },
      {
        icon: "clock",
        title: "24/7 Support",
        desc: "Customer service",
        color: "text-emerald-500",
      },
    ],
  },

  // Quick Links
  quickLinks: {
    enabled: true,
    title: "Quick Links",
    links: [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: "Track Order", path: "/track-order" },
      { name: "About Us", path: "/about" },
      { name: "Contact Us", path: "/contact" },
      { name: "Blog", path: "/blog" },
    ],
  },

  // Policies
  policies: {
    enabled: true,
    title: "Policies",
    links: [
      { name: "Terms & Conditions", path: "/terms" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Returns & Refunds", path: "/returns" },
      { name: "Shipping Policy", path: "/shipping" },
      { name: "FAQ", path: "/faq" },
    ],
  },

  // Categories
  categories: {
    enabled: true,
    title: "Top Categories",
    links: [
      { name: "Honey", path: "/c/mdhu-honey" },
      { name: "Dates", path: "/c/khejur-dates" },
      { name: "Ghee", path: "/c/ghee" },
      { name: "Cooking Oils", path: "/c/tel-oil" },
      { name: "Chocolates", path: "/c/chocolates" },
      { name: "Nuts & Seeds", path: "/c/nuts-seeds" },
    ],
  },

  // Payment Methods - now using custom components for BD methods
  paymentMethods: {
    enabled: true,
    title: "Payment Methods",
    groups: [
      {
        name: "Mobile Banking",
        methods: [
          { component: BkashIcon, label: "bKash", color: "text-pink-500" },
          { component: NagadIcon, label: "Nagad", color: "text-orange-500" },
          { component: RocketIcon, label: "Rocket", color: "text-blue-500" },
        ],
      },
      {
        name: "Cards & Online",
        methods: [
          { icon: "visa", label: "Visa" },
          { icon: "mastercard", label: "Mastercard" },
          { icon: "amex", label: "Amex" },
          { icon: "paypal", label: "PayPal" },
        ],
      },
    ],
  },

  // Payment Features
  paymentFeatures: {
    enabled: true,
    items: ["Cash on Delivery", "Free Shipping", "Secure Checkout"],
  },

  // Newsletter
  newsletter: {
    enabled: true,
    title: "Subscribe for exclusive offers",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
    buttonColor: "bg-amber-600 hover:bg-amber-700",
    icon: "leaf",
  },

  // Bottom Bar
  bottomBar: {
    showTradeLicense: true,
    tradeLicense: "TRAD/CHTG/014708/2025",
    showLoveNote: true,
    loveNote: "Made with love in Bangladesh",
    loveIcon: "heart",
    copyrightFormat: "© {year} {brand} — All rights reserved.",
  },

  // Styling
  styling: {
    bgGradient: "from-emerald-50/40 via-orange-50/40 to-amber-50/40",
    borderColor: "border-amber-200/60",
    headerColor: "text-emerald-800",
    linkColor: "text-slate-600",
    linkHoverColor: "hover:text-emerald-600",
    footerBg: "bg-white/70",
    featureIconBg: "bg-emerald-100/80",
    featureIconHoverBg: "bg-emerald-200/60",
    socialIconBg: "bg-white/80",
    socialIconBorder: "border-slate-200",
    socialIconHoverBg: "hover:bg-amber-50",
    socialIconHoverBorder: "hover:border-amber-300",
    iconSize: "text-lg",
    socialIconSize: "text-sm",
    paymentIconSize: "text-2xl",
  },

  // Section visibility
  sections: {
    showFeatures: true,
    showBrandInfo: true,
    showQuickLinks: true,
    showPolicies: true,
    showCategories: true,
    showPaymentMethods: true,
    showNewsletter: true,
    showBottomBar: true,
  },
};

// ----- Footer Component -----
const Footer = () => {
  const config = footerConfig;
  const currentYear = new Date().getFullYear();

  const renderLinkColumn = (title, links, show = true) => {
    if (!show || !links || links.length === 0) return null;
    return (
      <div>
        <h3
          className={`${config.styling.headerColor} font-semibold text-base mb-4 flex items-center gap-2`}
        >
          <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
          {title}
        </h3>
        <ul className="space-y-2.5">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className={`${config.styling.linkColor} ${config.styling.linkHoverColor} transition-colors duration-200 flex items-center gap-2 group`}
              >
                <FaArrowRight className="text-emerald-400 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render a single payment method (handles both icon strings and custom components)
  const renderPaymentMethod = (method) => {
    if (method.component) {
      // Custom component (e.g., BkashIcon)
      const CustomIcon = method.component;
      return (
        <CustomIcon className={`${config.styling.paymentIconSize} font-bold`} />
      );
    }
    if (method.icon) {
      // Regular Fa icon
      return getIcon(method.icon, config.styling.paymentIconSize);
    }
    return null;
  };

  return (
    <footer
      className={`mt-10 bg-linear-to-b ${config.styling.bgGradient} border-t ${config.styling.borderColor}`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Row */}
        {config.sections.showFeatures && config.features.enabled && (
          <div className="py-6 md:py-8 border-b border-amber-200/40">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {config.features.items.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-full ${config.styling.featureIconBg} group-hover:${config.styling.featureIconHoverBg} flex items-center justify-center transition-colors duration-300 shrink-0`}
                  >
                    {getIcon(
                      feature.icon,
                      feature.color || "text-emerald-500 text-lg",
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-[10px] md:text-xs text-slate-500">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-8 md:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-sm text-slate-700">
          {/* Brand Info */}
          {config.sections.showBrandInfo && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className={`h-9 w-9 rounded-xl bg-linear-to-br ${config.brand.logoBg} flex items-center justify-center border ${config.brand.logoBorder}`}
                >
                  {config.brand.logo ? (
                    <img
                      src={config.brand.logo}
                      alt={config.brand.name}
                      className="h-6 w-6"
                    />
                  ) : (
                    getIcon(config.brand.logoIcon, "text-amber-600 text-lg")
                  )}
                </div>
                <span
                  className={`text-xl font-extrabold ${config.brand.brandColor}`}
                >
                  {config.brand.name.split(" ")[0]}
                  <span className={config.brand.accentColor}>
                    {config.brand.name.split(" ").slice(1).join(" ")}
                  </span>
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                {config.brand.tagline}
              </p>

              {/* Contact Info */}
              <div className="space-y-2 pt-2">
                {config.contact.showPhone && (
                  <a
                    href={`tel:${config.contact.phone}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    {getIcon("phone", "text-emerald-500 text-xs")}
                    <span>{config.contact.phoneDisplay}</span>
                  </a>
                )}
                {config.contact.showEmail && (
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    {getIcon("envelope", "text-emerald-500 text-xs")}
                    <span>{config.contact.email}</span>
                  </a>
                )}
                {config.contact.showAddress && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    {getIcon("mapMarker", "text-emerald-500 text-xs")}
                    <span>{config.contact.address}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {config.social.enabled && (
                <div className="flex items-center gap-2 pt-2">
                  {config.social.links.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`h-8 w-8 rounded-full ${config.styling.socialIconBg} border ${config.styling.socialIconBorder} ${config.styling.socialIconHoverBg} ${config.styling.socialIconHoverBorder} flex items-center justify-center text-slate-600 hover:text-amber-600 transition-all duration-300 hover:scale-110`}
                    >
                      {getIcon(social.icon, config.styling.socialIconSize)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick Links */}
          {config.sections.showQuickLinks &&
            config.quickLinks.enabled &&
            renderLinkColumn(config.quickLinks.title, config.quickLinks.links)}

          {/* Policies */}
          {config.sections.showPolicies &&
            config.policies.enabled &&
            renderLinkColumn(config.policies.title, config.policies.links)}

          {/* Categories */}
          {config.sections.showCategories &&
            config.categories.enabled &&
            renderLinkColumn(config.categories.title, config.categories.links)}
        </div>

        {/* Payment Methods */}
        {config.sections.showPaymentMethods &&
          config.paymentMethods.enabled && (
            <div className="py-4 border-t border-amber-200/40">
              <div className="flex flex-col gap-3">
                {config.paymentMethods.groups && (
                  <div className="flex flex-wrap items-start sm:items-center justify-between gap-4">
                    {config.paymentMethods.groups.map((group, groupIndex) => (
                      <div
                        key={groupIndex}
                        className="flex flex-wrap items-center gap-2"
                      >
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          {group.name}:
                        </span>
                        <div className="flex items-center gap-2.5">
                          {group.methods.map((method, index) => (
                            <span
                              key={index}
                              className={`transition-colors ${method.color || "text-slate-600 hover:text-emerald-600"}`}
                              title={method.label}
                            >
                              {renderPaymentMethod(method)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Payment Features */}
                {config.paymentFeatures.enabled && (
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    {config.paymentFeatures.items.map((item, index) => (
                      <span key={index} className="flex items-center gap-1">
                        <span className="text-emerald-500">✓</span>
                        {item}
                        {index < config.paymentFeatures.items.length - 1 && (
                          <span className="h-3 w-px bg-slate-300 mx-2 inline-block"></span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        {/* Newsletter */}
        {config.sections.showNewsletter && config.newsletter.enabled && (
          <div className="py-4 border-t border-amber-200/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {getIcon(config.newsletter.icon, "text-emerald-500 text-lg")}
                <span className="text-sm text-slate-600">
                  {config.newsletter.title.split(" ").map((word, i) =>
                    word === "exclusive" ? (
                      <span key={i} className="font-semibold text-emerald-700">
                        {word}{" "}
                      </span>
                    ) : word === "offers" ? (
                      <span key={i} className="font-semibold text-emerald-700">
                        {word}
                      </span>
                    ) : (
                      <span key={i}>{word} </span>
                    ),
                  )}
                </span>
              </div>
              <form className="flex w-full sm:w-auto">
                <input
                  type="email"
                  placeholder={config.newsletter.placeholder}
                  className="flex-1 sm:w-64 px-4 py-2 rounded-l-full border border-amber-200/60 bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
                <button
                  className={`px-4 py-2 rounded-r-full text-white text-sm font-medium transition-colors whitespace-nowrap ${config.newsletter.buttonColor}`}
                >
                  {config.newsletter.buttonText}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      {config.sections.showBottomBar && (
        <div
          className={`border-t ${config.styling.borderColor} ${config.styling.footerBg}`}
        >
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="flex items-center gap-2 flex-wrap justify-center">
                {config.bottomBar.copyrightFormat
                  .replace(/\{year\}/g, currentYear)
                  .replace(/\{brand\}/g, config.brand.name)}
                {config.bottomBar.showTradeLicense && (
                  <>
                    <span className="hidden sm:inline mx-1">|</span>
                    Trade License:{" "}
                    <strong className="text-emerald-700">
                      {config.bottomBar.tradeLicense}
                    </strong>
                  </>
                )}
              </p>
              {config.bottomBar.showLoveNote && (
                <p className="text-slate-500 flex items-center gap-1">
                  {getIcon(config.bottomBar.loveIcon, "text-amber-500")}
                  <span>{config.bottomBar.loveNote}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
