import type { ProductSizeRule } from "../data/products";
import type { Product } from "../types/product";

export const PRODUCT_SIZE_RULES: ProductSizeRule[] = [
  {
    productKey: "flyer",

    defaultSize: {
      name: "A6",
      width: 105,
      height: 148,
      unit: "mm",
    },

    allowedPresets: ["A6", "A5", "A4", "A3"],

    minWidthMm: 74,
    maxWidthMm: 297,

    minHeightMm: 105,
    maxHeightMm: 420,
  },

  {
    productKey: "brochure",

    defaultSize: {
      name: "A4",
      width: 210,
      height: 297,
      unit: "mm",
    },

    allowedPresets: ["A4", "A3"],

    minWidthMm: 148,
    maxWidthMm: 420,

    minHeightMm: 210,
    maxHeightMm: 594,
  },

  {
    productKey: "businessCard",

    defaultSize: {
      name: "BC1",
      width: 90,
      height: 50,
      unit: "mm",
    },

    allowedPresets: ["BC1", "BC2"],

    minWidthMm: 85,
    maxWidthMm: 100,

    minHeightMm: 45,
    maxHeightMm: 60,
  },
];

export function getProductSizeRule(productKey: Product['productId']) {
  return PRODUCT_SIZE_RULES.find(
    (r) => r.productKey === productKey
  );
}
