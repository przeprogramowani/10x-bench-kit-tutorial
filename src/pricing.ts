import type { LineItem, InvoiceSummary } from './types.ts';

export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export function calculateInvoiceTotal(
  items: LineItem[],
  discountCents = 0,
): InvoiceSummary {
  const subtotalCents = calculateSubtotal(items);
  const netCents = subtotalCents - discountCents;
  const taxCents = items.reduce((sum, item) => {
    const rate = item.taxRate ?? 0;
    return sum + Math.round(item.unitPriceCents * item.quantity * rate);
  }, 0);
  const totalCents = netCents + taxCents;

  return {
    subtotalCents,
    discountCents,
    taxCents,
    totalCents,
  };
}
