import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscount } from '../src/discounts.ts';

describe('calculateDiscount', () => {
  it('applies percentage discount when threshold is met', () => {
    assert.equal(calculateDiscount(10000, { percent: 15, minSubtotalCents: 5000 }), 1500);
  });

  it('returns 0 when subtotal is below minimum threshold', () => {
    assert.equal(calculateDiscount(3000, { percent: 15, minSubtotalCents: 5000 }), 0);
  });
});
