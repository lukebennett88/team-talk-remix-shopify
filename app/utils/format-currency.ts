export function formatCurrency(value: number, currencyCode?: string): string {
  return Intl.NumberFormat("en-AU", {
    currency: currencyCode || "AUD",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
}
