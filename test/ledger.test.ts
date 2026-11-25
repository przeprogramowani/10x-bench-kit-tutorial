import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createLedgerEntry } from '../src/ledger.ts';

describe('createLedgerEntry', () => {
  it('creates an entry with calculated total', () => {
    const entry = createLedgerEntry('INV-001', [
      { sku: 'SEAT', unitPriceCents: 5000, quantity: 3 },
    ], 'USD');
    assert.equal(entry.invoiceId, 'INV-001');
    assert.equal(entry.totalCents, 15000);
    assert.equal(entry.currency, 'USD');
  });

  it('rounds fractional tax amounts consistently half-up', () => {
    const entry = createLedgerEntry('INV-002', [
      { sku: 'MICRO', unitPriceCents: 10, quantity: 1, taxRate: 0.05 },
    ], 'PLN');
    assert.equal(entry.totalCents, 11);
  });

  it('rounds tax on a credit line symmetrically to the matching charge', () => {
    // 30 * 0.05 = 1.5 and -30 * 0.05 = -1.5: both halves must round away
    // from zero (2 and -2), so the credit cancels the tax of the charge.
    const entry = createLedgerEntry('INV-003', [
      { sku: 'SEAT', unitPriceCents: 1000, quantity: 1 },
      { sku: 'ADDON', unitPriceCents: 30, quantity: 1, taxRate: 0.05 },
      { sku: 'ADDON-CREDIT', unitPriceCents: -30, quantity: 1, taxRate: 0.05 },
    ], 'PLN');
    assert.equal(entry.totalCents, 1000);
  });
});
