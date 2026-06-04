export type LaminationSides =
  | "front"
  | "back"
  | "both";

export type LaminationType =
  | "none"
  | "gloss"
  | "matt"
  | "soft-touch";

export type FoldingType =
  | "none"
  | "half-fold"
  | "tri-fold"
  | "z-fold"
  | "gate-fold"
  | "custom";

export type FinishingValue = {
  lamination: {
    type: LaminationType;
    sides: LaminationSides;
  };

  folding: {
    type: FoldingType;
    folds: number;
  };

  creasing: {
    count: number;
  };
};
