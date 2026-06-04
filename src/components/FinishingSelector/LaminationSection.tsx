import { laminationRule } from "../../data/finishingRules";
import type {Paper} from "../../data/papers";
import type {
  LaminationSides,
  LaminationType,
} from "../../types/finishing";

type Props = {
  paper: Paper;
  type: LaminationType;
  sides: LaminationSides;

  onChange: (
    type: LaminationType,
    sides: LaminationSides
  ) => void;
};

const TYPES: LaminationType[] = [
  "none",
  "gloss",
  "matt",
  "soft-touch",
];

export default function LaminationSection({
  paper,
  type,
  sides,
  onChange,
}: Props) {
  const enabled = type !== "none";
  const types = TYPES.filter(() => laminationRule.isAllowed({paper}));
  if (types.length === 0) {
    types.push("none");
  }

  return (
    <div className="space-y-4">

      <div className="font-medium">
        Lamination
      </div>

      {/* Lamination type */}
      <div className="flex flex-wrap gap-2">
        {types.map((option) => (
          <button
            key={option}
            onClick={() =>
              onChange(
                option,
                sides
              )
            }
            className={`
              px-3 py-1 rounded border text-sm
              ${
                type === option
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white border-slate-300"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Front / Back / Both */}
      {enabled && (
        <div className="flex flex-wrap gap-2">
          {(
            [
              "front",
              "back",
              "both",
            ] as LaminationSides[]
          ).map((option) => (
            <button
              key={option}
              onClick={() =>
                onChange(
                  type,
                  option
                )
              }
              className={`
                px-3 py-1 rounded border text-sm
                ${
                  sides === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-slate-300"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
