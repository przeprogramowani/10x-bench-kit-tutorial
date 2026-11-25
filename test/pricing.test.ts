import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateInvoiceTotal } from '../src/pricing.ts';

describe('calculateInvoiceTotal', () => {
  it('computes subtotal, tax and total for standard items', () => {
    const res = calculateInvoiceTotal([
      { sku: 'PRO', unitPriceCents: 10000, quantity: 2, taxRate: 0.23 },
    ]);
    assert.equal(res.subtotalCents, 20000);
    assert.equal(res.taxCents, 4600);
    assert.equal(res.totalCents, 24600);
  });

  it('ignores items with zero or negative quantity', () => {
    const res = calculateInvoiceTotal([
      { sku: 'PRO', unitPriceCents: 10000, quantity: 1, taxRate: 0.23 },
      { sku: 'FREEBIE', unitPriceCents: 5000, quantity: 0, taxRate: 0.23 },
      { sku: 'BROKEN', unitPriceCents: 5000, quantity: -2, taxRate: 0.23 },
    ]);
    assert.equal(res.subtotalCents, 10000);
    assert.equal(res.taxCents, 2300);
    assert.equal(res.totalCents, 12300);
  });

  it('caps discount at subtotal so total never goes negative', () => {
    const res = calculateInvoiceTotal(
      [{ sku: 'STARTER', unitPriceCents: 2000, quantity: 1 }],
      5000,
    );
    assert.equal(res.discountCents, 2000);
    assert.equal(res.totalCents, 0);
  });
});
