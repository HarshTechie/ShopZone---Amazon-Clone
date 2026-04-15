/**
 * Format price in INR with ₹ symbol and Indian number formatting.
 * E.g., 4999 → "₹4,999", 38999 → "₹38,999"
 */
export function formatPrice(price) {
  const num = parseFloat(price);
  return '₹' + num.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
}
