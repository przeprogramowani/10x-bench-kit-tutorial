/**
 * Deterministic half-up rounding for non-negative and negative cent amounts.
 */
export function roundCents(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return value >= 0 ? Math.floor(value + 0.5) : -Math.floor(-value + 0.5);
}
