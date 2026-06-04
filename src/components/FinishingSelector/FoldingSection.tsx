import type { FoldingType } from "../../types/finishing";
import  { foldingRule } from "../../data/finishingRules";
import type { Product } from "../../types/product";

type Props = {
  productKey: Product['productId'];
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
  "custom",
];

export default function FoldingSection({
  productId,
  type,
  folds,
  onChange,
}: Props) {

  const types = TYPES.filter(() => foldingRule.isAllowed({productId}));

  return (
    <div className="space-y-3">

      <div className="font-medium">
        Folding
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => {
              if (["tri-fold", "z-fold", "gate-fold"].includes(t)) {
                folds = 2;
              } else if ("half-fold" === t) {
                folds = 1;
              } else if ("none" === t) {
                folds = 0;
              }
              onChange( t, Math.max(folds, 0));
              }
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
          min={0}
          value={folds}
          onChange={(e) => {
            const c = Number(e.target.value);
            if (c > 2) type = "custom";
            else if (c === 2) type = "tri-fold";
            else if (c === 1) type = "half-fold";
            else if (c === 0) type = "none";
            onChange( type, c,);
           }
          }
          className="w-24 border rounded p-2"
        />
      )}
    </div>
  );
}
