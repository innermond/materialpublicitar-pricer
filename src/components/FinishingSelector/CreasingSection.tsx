type Props = {
  count: number;

  onChange: (
    count: number
  ) => void;
};

export default function CreasingSection({
  count,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      <div className="font-medium">
        Creasing
      </div>

      <input
        type="number"
        min={0}
        value={count}
        onChange={(e) =>
          onChange(
            Number(e.target.value)
          )
        }
        className="w-24 border rounded p-2"
      />
    </div>
  );
}