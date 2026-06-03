export type PopularitySignal = {
  qty: number;
  score: number;
};

/**
 * Simulated real-world order distribution.
 * Higher score = more commonly ordered.
 */
export const QUANTITY_POPULARITY: PopularitySignal[] = [
  { qty: 100, score: 40 },
  { qty: 250, score: 65 },
  { qty: 500, score: 90 },
  { qty: 1000, score: 100 }, // most sold baseline
  { qty: 2500, score: 70 },
  { qty: 5000, score: 45 },
];

export function getMostSoldQuantity(): PopularitySignal {
  return QUANTITY_POPULARITY.reduce((best, current) =>
    current.score > best.score ? current : best
  );
}