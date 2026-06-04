import type { Paper } from "./papers";
import type { Product } from "../types/product";

/**
 * Core finishing types supported by the system.
 */
export type FinishingType =
  | "lamination"
  | "folding"
  | "creasing";

export type LaminationSide = "front" | "back" | "both";
export type LaminationType = "gloss" | "matt" | "soft-touch";

export type FoldingType =
 | "none"
 | "half-fold"
 | "tri-fold"
 | "z-fold"
 | "gate-fold"
 | "custom"
 | "none";

export type FinishingRuleContext = {
  paper: Paper;
  productID: Product['productId'];
};

/**
 * Rules define whether a finishing option is valid
 * for a given product configuration.
 */
export type FinishingRule = {
  type: FinishingType;

  /**
   * Whether this finishing is allowed at all.
   */
  isAllowed: (ctx: Partial<FinishingRuleContext>) => boolean;

  /**
   * Optional pricing multiplier hook.
   * (used later in engine)
   */
  priceMultiplier?: (ctx: FinishingRuleContext) => number;
};

export const laminationRule: FinishingRule = {
  type: "lamination",

  /**
   * Lamination is NOT allowed on very low GSM papers
   * (they deform / bubble in real production)
   */
  isAllowed: ({ paper }) => {
    return paper.gsm > 130;
  },

  priceMultiplier: ({ paper }) => {
    if (paper.finish === "Soft-touch") return 1.4;
    if (paper.gsm >= 250) return 1.2;
    return 1.1;
  },
};

export const foldingRule: FinishingRule = {
  type: "folding",

  /**
   * Folding is only allowed for lighter papers.
   * Heavy stock cracks in real production.
   */
  isAllowed: ({ paper, productId }) => {
    if (productId === "flyer") return false;
    return paper?.gsm <= 200;
  },

  priceMultiplier: ({ paper }) => {
    if (paper.gsm <= 130) return 1.05;
    if (paper.gsm <= 170) return 1.1;
    return 1.25;
  },
};

export const creasingRule: FinishingRule = {
  type: "creasing",

  /**
   * Creasing is required for heavy folded stock,
   * but optional for lighter papers.
   */
  isAllowed: ({ paper, quantity }) => {
    // always allowed, but economically relevant only for high GSM
    if (quantity < 50) return false;
    return true;
  },

  priceMultiplier: ({ paper }) => {
    if (paper.gsm >= 250) return 1.3;
    return 1.1;
  },
};

export const FINISHING_RULES: FinishingRule[] = [
  laminationRule,
  foldingRule,
  creasingRule,
];

export function getFinishingRule(type: FinishingType) {
  return FINISHING_RULES.find((r) => r.type === type);
}

export function isFinishingAllowed(
  type: FinishingType,
  ctx: FinishingRuleContext
): boolean {
  const rule = getFinishingRule(type);
  if (!rule) return true;

  return rule.isAllowed(ctx);
}

export function getFinishingMultiplier(
  type: FinishingType,
  ctx: FinishingRuleContext
): number {
  const rule = getFinishingRule(type);

  if (!rule?.priceMultiplier) return 1;

  return rule.priceMultiplier(ctx);
}
