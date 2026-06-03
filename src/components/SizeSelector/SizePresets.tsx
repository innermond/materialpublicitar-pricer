import type { SizeValue } from "../../types/size";
import { SIZE_PRESETS, getPresetByName } from "../../data/presets";
import  { PRODUCT_SIZE_RULES } from "../../data/productSizeRules";
import { getProductSizeRule } from "../../data/productSizeRules";
import type { Product } from "../../data/products";

type Props = {
  productKey: Product['id'];
  value: SizeValue | null;
  onSelect: (preset: SizeValue) => void;
};

export default function SizePresets({ productKey, value, onSelect }: Props) {
  
  const presets: SizeValue[] = getProductSizeRule(productKey)?.allowedPresets?.map((sn: string) => getPresetByName(sn)) ?? SIZE_PRESETS;

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => {
        const active = value?.name === p.name;

        return (
          <button
            key={p.name}
            onClick={() => onSelect(p)}
            className={`
              relative rounded-full px-3 py-1 text-sm border transition
              ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-slate-300 hover:bg-slate-50"
              }
            `}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}
