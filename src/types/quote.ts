import type { Paper } from "../data/papers";
"
export type Lamination = {
  enabled: boolean;
  sides: "front" | "back" | "both";
  type: "gloss" | "matt" | "soft-touch";
};

export type Folding = {
  type: "none" | "half" | "letter" | "z" | "gate";
  folds: number;
};

export type Creasing = {
  count: number;
};

export type Finishing = {
  lamination: Lamination;
  folding: Folding;
  creasing: Creasing;
};

export type QuoteItem = {
  id: string;

  product: string;
  size: string;
  paperId: Paper['id'];
  printMode: string;
  quantity: number;

  finishing: Finishing;
};
