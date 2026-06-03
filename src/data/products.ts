export const PRODUCTS = {
  flyer: {
    name: "Flyer",
    defaults: {
      size: { name: "A6", width: 105, height: 148, unit: 'mm' },
      paper: "170gsm Gloss",
      printMode: "4/4",
      quantity: 1000,
      finishing: {
        lamination: {
          enabled: false,
          sides: "front",
          type: "gloss",
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
    name: "Brochure",
    defaults: {
      size: { name: "A4", width: 210, height: 297, unit: 'mm' },
      paper: "170gsm Silk",
      printMode: "4/4",
      quantity: 500,
      finishing: {
        lamination: {
          enabled: true,
          sides: "both",
          type: "matt",
        },
        folding: {
          type: "letter",
          folds: 2,
        },
        creasing: {
          count: 0,
        },
      },
    },
  },

  businessCard: {
    name: "Business Card",
    defaults: {
      size: { name: "custom size", width: 90, height: 50, unit: 'mm' },
      paper: "350gsm Matt",
      printMode: "4/4",
      quantity: 500,
      finishing: {
        lamination: {
          enabled: true,
          sides: "front",
          type: "soft-touch",
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
} as const;
