type Props = {
  label: string;
  isCustom: boolean;
};

export default function SizeLabel({ label, isCustom }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">Size</h2>

      <span
        className={`
          text-xs px-2 py-1 rounded-full border
          ${
            isCustom
              ? "bg-slate-100 text-slate-600"
              : "bg-blue-100 text-blue-700 border-blue-200"
          }
        `}
      >
        {label}
      </span>
    </div>
  );
}