import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateDiscount, calculateTieredDiscount } from '../src/discounts.ts';

describe('calculateDiscount', () => {
  it('applies percentage discount when threshold is met', () => {
    assert.equal(calculateDiscount(10000, { percent: 15, minSubtotalCents: 5000 }), 1500);
  });

  it('returns 0 when subtotal is below minimum threshold', () => {
    assert.equal(calculateDiscount(3000, { percent: 15, minSubtotalCents: 5000 }), 0);
  });
});

describe('calculateTieredDiscount', () => {
  const tiers = [
    { percent: 5, minSubtotalCents: 5000 },
    { percent: 15, minSubtotalCents: 20000 },
    { percent: 30, minSubtotalCents: 50000 },
  ];

  it('picks the highest eligible tier regardless of array order', () => {
    const reversed = [...tiers].reverse();
    assert.equal(calculateTieredDiscount(25000, { tiers: reversed }), 3750);
  });

  it('respects maxDiscountPercent cap when set', () => {
    assert.equal(
      calculateTieredDiscount(60000, { tiers, maxDiscountPercent: 20 }),
      12000,
    );
  });

  it('returns 0 when no tier threshold is reached', () => {
    assert.equal(calculateTieredDiscount(1000, { tiers }), 0);
  });
});
