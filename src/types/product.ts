import type { SizeUnit } from "./size";

export type ProductSizeDefaults = {
  name: string;
  width: number;
  height: number;
  unit: SizeUnit;
};

export type ProductFinishingDefaults = {
  lamination: {
    enabled: boolean;
    sides: "front" | "back" | "both";
    type: "gloss" | "matt" | "soft-touch";
  };

  folding: {
    type: "none" | "half" | "letter" | "accordion";
    folds: number;
  };

  creasing: {
    count: number;
  };
};

export type ProductDefaults = {
  size: ProductSizeDefaults;

  paperId: string;

  printMode: "4/4" | "4/1" | "1/0";

  quantity: number;

  finishing: ProductFinishingDefaults;
};

export type Product = {
  productId: string;
  name: string;
  defaults: ProductDefaults;
};

export type ProductsMap = Record<string, Product>;
