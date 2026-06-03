import type { Paper } from "./papers";

/**
 * Defines constraints per product type.
 * This controls:
 * - which papers are allowed
 * - which are preferred
 * - default selection logic
 */
export type ProductPaperRule = {
  productKey: string;

  /**
   * Explicitly allowed paper IDs.
   * If empty → all papers allowed.
   */
  allowedPaperIds?: string[];

  /**
   * Preferred/default paper ID for UI selection.
   */
  defaultPaperId: string;

  /**
   * Optional constraints for future validation logic
   */
  minGsm?: number;
  maxGsm?: number;

  /**
   * Optional UI grouping hint
   */
  preferredFinish?: Paper["finish"];
};

/**
 * Product-specific paper rules.
 * This is where print business logic lives.
 */
export const PRODUCT_PAPER_RULES: ProductPaperRule[] = [
  {
    productKey: "flyer",

    allowedPaperIds: [
      "130-silk",
      "170-gloss",
      "170-silk",
      "200-matt",
    ],

    defaultPaperId: "170-gloss",

    minGsm: 130,
    maxGsm: 200,
  },

  {
    productKey: "brochure",

    allowedPaperIds: [
      "130-silk",
      "170-silk",
      "200-matt",
      "250-matt",
    ],

    defaultPaperId: "170-silk",

    minGsm: 130,
    maxGsm: 250,

    preferredFinish: "Silk",
  },

  {
    productKey: "businessCard",

    allowedPaperIds: [
      "250-matt",
      "350-matt",
      "350-softtouch",
    ],

    defaultPaperId: "350-softtouch",

    minGsm: 250,
    maxGsm: 350,

    preferredFinish: "Soft-touch",
  },
];

/**
 * Helper: get rule for product
 */
export function getPaperRule(productKey: string) {
  return PRODUCT_PAPER_RULES.find(
    (r) => r.productKey === productKey
  );
}

/**
 * Helper: check if paper is allowed for product
 */
export function isPaperAllowed(
  productKey: string,
  paper: Paper
): boolean {
  const rule = getPaperRule(productKey);

  if (!rule) return true;

  if (rule.allowedPaperIds?.length) {
    return rule.allowedPaperIds.includes(paper.id);
  }

  if (rule.minGsm && paper.gsm < rule.minGsm) return false;

  if (rule.maxGsm && paper.gsm > rule.maxGsm) return false;

  return true;
}

/**
 * Helper: get default paper for product
 */
export function getDefaultPaperId(productKey: string) {
  return (
    getPaperRule(productKey)?.defaultPaperId ?? null
  );
}
