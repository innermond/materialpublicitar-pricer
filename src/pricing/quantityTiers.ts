export type QuantityTier = {
  qty: number;
  unitCostMultiplier: number;
};

/**
 * This simulates print economies of scale:
 * higher quantity → lower unit cost
 */
export const DEFAULT_TIERS: QuantityTier[] = [
  { qty: 100, unitCostMultiplier: 2.0 },
  { qty: 250, unitCostMultiplier: 1.6 },
  { qty: 500, unitCostMultiplier: 1.3 },
  { qty: 1000, unitCostMultiplier: 1.0 },
  { qty: 2500, unitCostMultiplier: 0.85 },
  { qty: 5000, unitCostMultiplier: 0.75 },
];

/**
 * Get recommended quantity = best unit economics within range
 */
export function getBestTier(
  tiers: QuantityTier[]
): QuantityTier {
  return tiers.reduce((best, current) =>
    current.unitCostMultiplier < best.unitCostMultiplier
      ? current
      : best
  );
}