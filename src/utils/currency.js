// src/utils/currency.js

/**
 * Format a number as Bangladeshi Taka (BDT)
 * @param {number} amount - The amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted currency string
 */
export const formatTaka = (amount, options = {}) => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    currency = "BDT",
    locale = "bn-BD",
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

/**
 * Format a number as Taka without currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string
 */
export const formatTakaNumber = (amount) => {
  return new Intl.NumberFormat("bn-BD").format(amount);
};

/**
 * Parse a Taka formatted string back to number
 * @param {string} formatted - The formatted currency string
 * @returns {number} The parsed number
 */
export const parseTaka = (formatted) => {
  const cleaned = formatted.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};
