import type {
  FinishingValue,
  LaminationType,
  LaminationSides,
  FoldingType,
} from "../../types/finishing";

import LaminationSection from "./LaminationSection";
import FoldingSection from "./FoldingSection";
import CreasingSection from "./CreasingSection";
import type { Paper } from "../../data/papers";
import type { Product } from "../../types/product";

type Props = {
  productKey: Product['productId'];
  paper: Paper;
  value: FinishingValue;

  onChange: (
    value: FinishingValue
  ) => void;
};

export default function FinishingSelector({
  productKey,
  paper,
  value,
  onChange,
}: Props) {

  const updateLamination = (
    type: LaminationType,
    sides: LaminationSides
  ) => {
    onChange({
      ...value,

      lamination: {
        type,
        sides,
      },
    });
  };

  const updateFolding = (
    type: FoldingType,
    folds: number
  ) => {
    onChange({
      ...value,

      folding: {
        type,
        folds,
      },
    });
  };

  const updateCreasing = (
    count: number
  ) => {
    onChange({
      ...value,

      creasing: {
        count,
      },
    });
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow space-y-6">

      <h2 className="font-semibold">
        Finishing
      </h2>

      <LaminationSection
        paper={paper}
        type={value.lamination.type}
        sides={value.lamination.sides}
        onChange={updateLamination}
      />

      <FoldingSection
        productId={productKey}
        type={value.folding.type}
        folds={
          value.folding.folds
        }
        onChange={updateFolding}
      />

      <CreasingSection
        count={
          value.creasing.count
        }
        onChange={updateCreasing}
      />
    </div>
  );
}
