export type PaperFinish = "Gloss" | "Silk" | "Matt" | "Soft-touch";
export type PaperWeight = 80 | 130 | 170 | 200 | 250 | 350;

export type Paper = {
  id: string;

  /**
   * Human-readable label used in UI
   */
  label: string;

  /**
   * Core print attributes (future pricing drivers)
   */
  gsm: PaperWeight;
  finish: PaperFinish;

  /**
   * Optional flags for production constraints
   */
  coated: boolean;
  recyclable: boolean;
};

/**
 * Master paper catalog (used by all products)
 * You can later override availability per product.
 */
export const PAPERS: Paper[] = [
  {
    id: "170-gloss",
    label: "170gsm Gloss",
    gsm: 170,
    finish: "Gloss",
    coated: true,
    recyclable: true,
  },

  {
    id: "170-silk",
    label: "170gsm Silk",
    gsm: 170,
    finish: "Silk",
    coated: true,
    recyclable: true,
  },

  {
    id: "130-silk",
    label: "130gsm Silk",
    gsm: 130,
    finish: "Silk",
    coated: true,
    recyclable: true,
  },

  {
    id: "200-matt",
    label: "200gsm Matt",
    gsm: 200,
    finish: "Matt",
    coated: true,
    recyclable: true,
  },

  {
    id: "250-matt",
    label: "250gsm Matt",
    gsm: 250,
    finish: "Matt",
    coated: true,
    recyclable: true,
  },

  {
    id: "350-matt",
    label: "350gsm Matt",
    gsm: 350,
    finish: "Matt",
    coated: true,
    recyclable: true,
  },

  {
    id: "350-softtouch",
    label: "350gsm Soft-touch",
    gsm: 350,
    finish: "Soft-touch",
    coated: true,
    recyclable: false,
  },
];

/**
 * Helper: get paper by id
 */
export function getPaperById(id: string): Paper | undefined {
  return PAPERS.find((p) => p.id === id);
}
