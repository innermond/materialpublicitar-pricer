import { PRODUCTS } from "../data/products";
import { v4 as uuid } from "uuid";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import PaperSelector from "./PaperSelector";
import { getPaperById, type Paper } from "../data/papers";
import type { QuoteItem } from "../types/quote";
import FinishingSelector from "./FinishingSelector/FinishingSelector";

export default function ProductConfigurator({ store }) {
  const active = store.activeItem;

  const paper = getPaperById(active?.paperId);
  const productKeys = Object.keys(PRODUCTS);

  const applyDefaults = (key: string) => {
    const p = PRODUCTS[key as keyof typeof PRODUCTS];

    const newItem: QuoteItem = {
      id: uuid(),
      ...p.defaults,
      productId: p.productId,
      size: p.defaults.size,
    };

    store.addItem(newItem);
  };

  const updateActive = (patch: Partial<QuoteItem>) => {
    if (!active) return;
    console.log(patch)
    store.updateItem(active.id, patch);
  };

  return (
    <div className="space-y-4">

      {/* PRODUCT SELECTOR */}
      <div className="rounded-xl bg-white p-4 shadow">
        <h2 className="mb-2 font-semibold">Product</h2>

        <div className="flex gap-2">
          {productKeys.map((k) => (
            <button
              key={k}
              onClick={() => applyDefaults(k)}
              className={`
                rounded border px-3 py-1 transition

                ${
                  k === active?.productId
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:bg-blue-50"
                }
              `}
            >
              {PRODUCTS[k as keyof typeof PRODUCTS].name}
            </button>
          ))}
        </div>
      </div>

      {/* EDITOR */}
      {active && (
        <div className="rounded-xl bg-white p-4 shadow space-y-3">

          <h2 className="font-semibold">
            Editing: {active.productId}
          </h2>

          <SizeSelector
            productKey={active.productId}
            value={active.size}
            onChange={(val) =>
              updateActive({ size: val })
            }
          />

          <QuantitySelector
            value={active.quantity}
            onChange={(val) =>
              updateActive({ quantity: val })
            }
          />

          <PaperSelector
            productKey={active.productId}
            value={active.paperId}
            onChange={(val: Paper['id']) =>
              updateActive({ paperId: val })
            }
          />

          <FinishingSelector
            productKey={active.productId}
            paper={paper}
            value={active.finishing}
            onChange={(finishing) =>
              updateActive({ finishing })
            }
          />
        </div>
      )}

    </div>
  );
}
