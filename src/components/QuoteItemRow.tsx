export default function QuoteItemRow({
  item,
  active,
  onSelect,
  onDelete,
  price,
}) {
  return (
    <div
      className={`rounded border p-2 cursor-pointer ${
        active ? "border-blue-500 bg-blue-50" : ""
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between">
        <div className="font-medium">
          {item.product} · {item.size.name}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-xs text-red-500"
        >
          delete
        </button>
      </div>

      <div className="text-sm text-slate-500">
        Qty {item.quantity}
      </div>

      <div className="font-semibold">
        £{price.toFixed(2)}
      </div>
    </div>
  );
}
