import { PRODUCTS } from "../data/products";
import type { Paper } from "../data/papers";
import { getPaperById } from "../data/papers";
import { getPaperRule } from "../data/productPaperRules";
import type { ProductPaperRule } from "../data/productPaperRules";
import type { Product } from "../types/product";

/**
 * PaperSelector is product-aware:
 * It only shows paper options valid for the currently active product.
 */
type Props = {
  productKey: Product['productId'];
  value: string;
  onChange: (value: Paper['id']) => void;
};

export default function PaperSelector({
  productKey,
  value,
  onChange,
}: Props) {
  //TODO make it as it should
  const product = PRODUCTS[productKey as keyof typeof PRODUCTS];

  /**
   * Defensive fallback:
   * If product is missing, show nothing safe.
   */
  if (!product) return null;

  const productPaperRule: ProductPaperRule = getPaperRule(product.productId);
  const papers: Paper[] = productPaperRule.allowedPaperIds.map(pid => getPaperById(pid)) ?? [];

  return (
    <div className="rounded-xl bg-white p-4 shadow space-y-3">
      <h2 className="font-semibold">Paper</h2>

      {/* PAPER OPTIONS */}
      <div className="flex flex-wrap gap-2">
        {papers.map((p) => {
          const active = p.id === value;

          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={`
                rounded-full px-3 py-1 text-sm border transition
                ${
                  active
                    ? "pointer-events-none bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:cursor-pointer hover:bg-slate-50"
                }
              `}
            >
              {p.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
