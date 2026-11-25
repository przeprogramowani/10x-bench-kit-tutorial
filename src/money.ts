/**
 * Deterministic half-up rounding for non-negative and negative cent amounts.
 * Halves round away from zero (1.5 -> 2, -1.5 -> -2), so a credit rounds
 * symmetrically to the matching charge. Math.round would give -1 for -1.5.
 */
export function roundCents(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value >= 0 ? Math.floor(value + 0.5) : -Math.floor(-value + 0.5);
}
