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

    allowedRatios: [
      { width: 1, height: 1.414 }, // A-series ratio
    ],
  },

  {
    productKey: "businessCard",

    defaultSize: {
      name: "custom size",
      width: 90,
      height: 50,
      unit: "mm",
    },

    allowedPresets: [],

    minWidthMm: 85,
    maxWidthMm: 100,

    minHeightMm: 45,
    maxHeightMm: 60,
  },
];

export function getProductSizeRule(productKey: string) {
  return PRODUCT_SIZE_RULES.find(
    (r) => r.productKey === productKey
  );
}
