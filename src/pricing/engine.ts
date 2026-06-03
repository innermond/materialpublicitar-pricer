import type { QuoteItem } from "../types/quote";
import { QUANTITY_POPULARITY } from "./popularityData";

function getPopularityMultiplier(quantity: number) {
  let closest = QUANTITY_POPULARITY[0];

  for (const p of QUANTITY_POPULARITY) {
    if (
      Math.abs(p.qty - quantity) <
      Math.abs(closest.qty - quantity)
    ) {
      closest = p;
    }
  }

  /**
   * Popularity affects perceived baseline pricing behavior
   * (not cost optimization anymore)
   */
  return closest.score / 100;
}

export function calculateItemPrice(item: QuoteItem): number {
  return 0.0
  const basePaperCost = item.quantity * 0.02;

  let total = basePaperCost;

  // NEW: popularity-based weighting
  const popularityFactor = getPopularityMultiplier(item.quantity);
  total *= 1 + (1 - popularityFactor) * 0.15;

  if (item.paper.includes("250gsm")) total *= 1.4;
  if (item.paper.includes("350gsm")) total *= 1.8;

  if (item.printMode === "4/4") total *= 1.5;
  if (item.printMode === "1/0") total *= 0.7;

  if (item.finishing.lamination.enabled) {
    const sideMultiplier =
      item.finishing.lamination.sides === "both" ? 2 : 1;

    total += item.quantity * 0.01 * sideMultiplier;
  }

  if (item.finishing.folding.type !== "none") {
    total += item.finishing.folding.folds * item.quantity * 0.002;
  }

  total += item.finishing.creasing.count * item.quantity * 0.0015;

  return total;
}
