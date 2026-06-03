import type { SizeUnit } from "../../types/size";

type Props = {
  unit: SizeUnit;
  onChange: (unit: SizeUnit) => void;
};

export default function UnitSelector({ unit, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {(["mm", "in", "pt"] as SizeUnit[]).map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`
            px-3 py-1 rounded border text-sm
            ${
              unit === u
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-slate-300"
            }
          `}
        >
          {u}
        </button>
      ))}
    </div>
  );
}
