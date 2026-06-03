type Props = {
  width: number;
  height: number;
  onChange: (w: number, h: number) => void;
};

export default function SizeInputs({
  width,
  height,
  onChange,
}: Props) {
  const format = (value: number) => parseFloat(value.toFixed(2));

  return (
    <div className="grid grid-cols-3 gap-2 items-center">
      <input
        type="number"
        value={format(width)}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(
            v,
            height,
          );
        }}
        className="rounded border p-2"
      />

      <span className="text-center text-slate-400">×</span>

      <input
        type="number"
        value={format(height)}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(
            width,
            v,
          );
        }}
        className="rounded border p-2"
      />
    </div>
  );
}
