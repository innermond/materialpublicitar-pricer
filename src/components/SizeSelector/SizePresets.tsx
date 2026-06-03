import type { SizeValue } from "../../types/size";
import { SIZE_PRESETS } from "../../data/presets";

type Props = {
  value: SizeValue | null;
  onSelect: (preset: SizeValue) => void;
};

export default function SizePresets({ value, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SIZE_PRESETS.map((p) => {
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
