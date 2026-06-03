import { PRODUCTS } from "../data/products";
import { v4 as uuid } from "uuid";
import QuantitySelector from "./QuantitySelector";
import SizeSelector from "./SizeSelector";
import PaperSelector from "./PaperSelector";
import { getPaperById } from "../data/papers";
import type { Paper } from "../data/papers";

export default function ProductConfigurator({ store }: any) {
  const active = store.activeItem;

  const productKeys = Object.keys(PRODUCTS);

  const productPaper: Paper = getPaperById(active?.productId);

  const applyDefaults = (key: string) => {
    const p = PRODUCTS[key as keyof typeof PRODUCTS];

    const newItem = {
      id: uuid(),
      product: p.name,
      ...p.defaults,
    };

    store.addItem(newItem);
  };

  const updateActive = (patch: any) => {
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
              className="rounded border px-3 py-1 hover:bg-blue-50"
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
            Editing: {active.product}
          </h2>

          <SizeSelector
            productKey={active.product}
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
            productKey={active.product}
            value={active.paperId}
            onChange={(val: Paper) =>
              updateActive({ paperId: val })
            }
          />

        </div>
      )}

    </div>
  );
}
