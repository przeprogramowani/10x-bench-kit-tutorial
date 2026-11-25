export interface LineItem {
  sku: string;
  unitPriceCents: number;
  quantity: number;
  taxRate?: number; // e.g. 0.23 for 23% VAT
}

export interface DiscountRule {
  percent: number;
  minSubtotalCents?: number;
}

export interface TieredDiscountOptions {
  tiers: DiscountRule[];
  maxDiscountPercent?: number;
}

export interface InvoiceSummary {
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
}

export interface SubscriptionPlan {
  id: string;
  monthlyPriceCents: number;
}
