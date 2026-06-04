import type { Paper } from "../data/papers";
import type { Product } from "../types/product";
import type {FinishingValue} from "./finishing";
import type { SizeValue, } from "./size";

export type QuoteItem = {
  id: string;

  productId: Product['productId'];
  size: SizeValue;
  paperId: Paper['id'];
  printMode: string;
  quantity: number;

  finishing: FinishingValue;
};
