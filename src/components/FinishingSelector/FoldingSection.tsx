import type { FoldingType } from "../../types/finishing";

type Props = {
  type: FoldingType;
  folds: number;

  onChange: (
    type: FoldingType,
    folds: number
  ) => void;
};

const TYPES: FoldingType[] = [
  "none",
  "half-fold",
  "tri-fold",
  "z-fold",
  "gate-fold",
];

export default function FoldingSection({
  type,
  folds,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      <div className="font-medium">
        Folding
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() =>
              onChange(
                t,
                t === "none"
                  ? 0
                  : Math.max(folds, 1)
              )
            }
            className={`
              px-3 py-1 rounded border
              ${
                type === t
                  ? "bg-blue-600 text-white"
                  : ""
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {type !== "none" && (
        <input
          type="number"
          min={1}
          value={folds}
          onChange={(e) =>
            onChange(
              type,
              Number(e.target.value)
            )
          }
          className="w-24 border rounded p-2"
        />
      )}
    </div>
  );
}
