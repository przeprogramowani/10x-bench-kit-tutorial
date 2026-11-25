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
});
