import QuoteItemRow from "./QuoteItemRow";
import { calculateItemPrice } from "../pricing/engine";
import type { QuoteItem } from "../types/quote";

export default function QuoteCart({ store, total }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">

      <h2 className="mb-3 font-semibold">Quote</h2>

      <div className="space-y-2">
        {store.items.map((item: QuoteItem) => (
          <QuoteItemRow
            key={item.id}
            item={item}
            active={store.activeId === item.id}
            onSelect={() => store.setActiveId(item.id)}
            onDelete={() => store.deleteItem(item.id)}
            price={calculateItemPrice(item)}
          />
        ))}
      </div>

      <div className="mt-4 border-t pt-3 font-bold">
        Total: £{total.toFixed(2)}
      </div>

    </div>
  );
}
