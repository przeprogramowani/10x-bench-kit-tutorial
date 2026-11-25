import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateProration } from '../src/ledger.ts';

describe('calculateProration', () => {
  const starter = { id: 'starter', monthlyPriceCents: 3000 };
  const pro = { id: 'pro', monthlyPriceCents: 9000 };

  it('computes net charge for a mid-cycle upgrade', () => {
    const res = calculateProration(starter, pro, 15, 30);
    assert.equal(res.creditCents, 1500);
    assert.equal(res.chargeCents, 4500);
    assert.equal(res.netDueCents, 3000);
  });

  it('returns negative netDueCents on downgrade', () => {
    const res = calculateProration(pro, starter, 10, 30);
    assert.equal(res.creditCents, 3000);
    assert.equal(res.chargeCents, 1000);
    assert.equal(res.netDueCents, -2000);
  });

  it('returns zeros when no days remain in cycle', () => {
    const res = calculateProration(starter, pro, 0, 30);
    assert.deepEqual(res, { creditCents: 0, chargeCents: 0, netDueCents: 0 });
  });

  it('clamps daysRemaining to daysInCycle', () => {
    const res = calculateProration(starter, pro, 40, 30);
    assert.equal(res.netDueCents, 6000);
  });
});
