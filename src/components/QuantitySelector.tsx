import { useMemo } from "react";
import {
  QUANTITY_POPULARITY,
  getMostSoldQuantity,
} from "../pricing/popularityData";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function QuantitySelector({
  value,
  onChange,
}: Props) {
  const sorted = useMemo(() => {
    return [...QUANTITY_POPULARITY].sort(
      (a, b) => a.qty - b.qty
    );
  }, []);

  const mostSold = useMemo(() => getMostSoldQuantity(), []);

  const closestPopularity = useMemo(() => {
    return sorted.reduce((prev, curr) =>
      Math.abs(curr.qty - value) <
      Math.abs(prev.qty - value)
        ? curr
        : prev
    );
  }, [value, sorted]);

  return (
    <div className="rounded-xl bg-white p-4 shadow space-y-3">
      <h2 className="font-semibold">Quantity</h2>

      {/* MOST SOLD indicator */}
      <div className="text-xs text-slate-500">
        Most ordered option:{" "}
        <span className="font-semibold text-blue-600">
          {mostSold.qty} units
        </span>
      </div>

      {/* popularity chips */}
      <div className="flex flex-wrap gap-2">
        {sorted.map((p) => {
          const active = p.qty === value;
          const isMostSold = p.qty === mostSold.qty;

          return (
            <button
              key={p.qty}
              onClick={() => onChange(p.qty)}
              className={`
                relative rounded-full px-3 py-1 text-sm border transition
                ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300 hover:bg-slate-50"
                }
              `}
            >
              {p.qty}

              {/* MOST SOLD badge */}
              {isMostSold && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-indigo-600 text-white px-1 rounded">
                  most sold
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* numeric input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-lg border p-2"
        />
        <span className="text-sm text-slate-500">units</span>
      </div>

      {/* feedback */}
      <div className="text-xs text-slate-500">
        Closest market option:{" "}
        <span className="font-medium">
          {closestPopularity.qty} (
          {closestPopularity.score}%)
        </span>
      </div>
    </div>
  );
}