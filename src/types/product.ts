import type { SizeValue, } from "./size";
import type { FinishingValue } from "./finishing";

export type ProductFinishingDefaults = {
  lamination: FinishingValue['lamination'];

  folding: FinishingValue['folding'];

  creasing: FinishingValue['creasing'];
};

export type ProductDefaults = {
  size: SizeValue;

  paperId: string;

  printMode: "4/4" | "4/1" | "4/0" | "1/1" | "1/0";

  quantity: number;

  finishing: ProductFinishingDefaults;
};

export type Product = {
  productId: string;
  name: string;
  defaults: ProductDefaults;
};

export type ProductsMap = Record<string, Product>;
