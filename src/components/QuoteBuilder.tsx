import { useMemo } from "react";
import { useQuoteStore } from "../state/quoteStore";
import { calculateItemPrice } from "../pricing/engine";
import ProductConfigurator from "./ProductConfigurator";
import QuoteCart from "./QuoteCart";

export default function QuoteBuilder() {
  const store = useQuoteStore();

  const total = useMemo(() => {
    return store.items.reduce((sum, item) => {
      return sum + calculateItemPrice(item);
    }, 0);
  }, [store.items]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-6">

        {/* LEFT: Configurator */}
        <div className="col-span-2">
          <ProductConfigurator store={store} />
        </div>

        {/* RIGHT: Cart */}
        <div className="space-y-4">
          <QuoteCart store={store} total={total} />
        </div>

      </div>
    </div>
  );
}