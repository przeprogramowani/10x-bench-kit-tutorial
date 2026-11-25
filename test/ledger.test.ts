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
});
