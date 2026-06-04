import type { ProductsMap } from "../types/product";

export const PRODUCTS: ProductsMap = {
  flyer: {
    productId: "flyer",
    name: "Flyer",

    defaults: {
      size: {
        name: "A6",
        width: 105,
        height: 148,
        unit: 'mm',
      },

      paperId: "130-silk",

      printMode: "4/4",

      quantity: 1000,

      finishing: {
        lamination: {
          type: "none",
          sides: "front",
        },

        folding: {
          type: "none",
          folds: 0,
        },

        creasing: {
          count: 0,
        },
      },
    },
  },

  brochure: {
    productId: "brochure",
    name: "Brochure",

    defaults: {
      size: {
        name: "A4",
        width: 210,
        height: 297,
        unit: 'mm',
      },

      paperId: "170-silk",

      printMode: "4/4",

      quantity: 500,

      finishing: {
        lamination: {
          type: "matt",
          sides: "front",
        },

        folding: {
          type: "half-fold",
          folds: 1,
        },

        creasing: {
          count: 0,
        },
      },
    },
  },

  businessCard: {
    productId: "businessCard",
    name: "Business Card",

    defaults: {
      size: {
        name: "BC1",
        width: 90,
        height: 50,
        unit: 'mm',
      },

      paperId: "350-softtouch",

      printMode: "4/0",

      quantity: 500,

      finishing: {
        lamination: {
          type: "none",
          sides: "front",
        },

        folding: {
          type: "none",
          folds: 0,
        },

        creasing: {
          count: 0,
        },
      },
    },
  },
};
