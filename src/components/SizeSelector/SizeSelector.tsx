import { useEffect, useMemo, useState } from "react";

import SizeLabel from "./SizeLabel";
import SizeValues from "./SizePresets";
import SizeInputs from "./SizeInputs";
import UnitSelector from "./UnitSelector";
import { convert } from '../../lib/units'

import { SIZE_PRESETS } from "../../data/presets";
import type {
  SizeValue,
  SizeUnit,
} from "../../types/size";

/**
 * Small tolerance to avoid floating point / conversion drift issues.
 * Example: 210mm → in → mm may become 209.999999
 */
const EPSILON = 0.1;

/**
 * Finds if current dimensions match a known physical format (A4, A5, etc).
 * This is purely a "recognition" function — NOT a data source of truth.
 */
function findMatchingPreset(
  width: number,
  height: number,
  unit: SizeUnit,
): SizeValue | null {
  return (
    SIZE_PRESETS.find((p) => {
      const w = convert(width, unit, p.unit);
      const h = convert(height, unit, p.unit);

      const widthMatch =
        Math.abs(p.width - w) < EPSILON;

      const heightMatch =
        Math.abs(p.height - h) < EPSILON;

      return widthMatch && heightMatch;
    }) ?? null
  );
}

type Props = {
  /**
   * Canonical model:
   * Everything is stored in millimeters.
   * Preset is optional metadata ("A4", "A5", etc)
   */
  value: SizeValue;

  /**
   * Always emits normalized mm-based values.
   */
  onChange: (value: SizeValue) => void;
};

export default function SizeSelector({
  value,
  onChange,
}: Props) {
  /**
   * Display unit only.
   * Does NOT affect stored values.
   */
  const [unit, setUnit] = useState<SizeUnit>("mm");

  const widthUnit = value.unit !== unit ? convert(value.width, value.unit, unit) : value.width;
  const heightUnit = value.unit !== unit ? convert(value.height, value.unit, unit) : value.height;

  /**
   * Active preset represents whether current size
   * matches a known physical format (A4, A5, etc).
   */
  const [activePreset, setActivePreset] =
    useState<SizeValue | null>(null);

  /**
   * Whenever size changes externally (e.g. product switch,
   * quote line switch), we re-evaluate whether it matches
   * a known preset.
   */
  useEffect(() => {
    setActivePreset(
      findMatchingPreset(
        widthUnit,
        heightUnit,
        unit,
      )
    );
  }, [widthUnit, heightUnit]);

  /**
   * Label shown in UI:
   * - preset match → "A4"
   * - no match → "Custom size"
   */
  const label = useMemo(() => {
    return activePreset?.name ?? "Custom size";
  }, [activePreset]);

  /**
   * When user clicks a preset:
   * We fully overwrite dimensions with canonical mm values.
   */
  const handlePreset = (preset: SizeValue) => {
    setActivePreset(preset);

    onChange({
      name: preset.name,
      width: preset.width,
      height: preset.height,
      unit: preset.unit,
    });
  };

  /**
   * When user manually edits dimensions:
   * We break association with preset.
   */
  const handleSizeChange = (
    width: number,
    height: number,
  ) => {
    setActivePreset(null);

    onChange({
      name: null,
      width,
      height,
      unit,
    });
  };

  /**
   * Unit change only affects display.
   * We do NOT modify stored mm values here.
   *
   * This is critical: mm is canonical storage.
   */
  const handleUnitChange = (newUnit: SizeUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow space-y-4">

      {/* HEADER: shows either A4/A5 or Custom size */}
      <SizeLabel
        label={label}
        isCustom={!activePreset}
      />

      {/* PRESET SELECTION (A6 / A5 / A4 / A3) */}
      <SizeValues
        value={activePreset}
        onSelect={handlePreset}
      />

      {/* DIMENSION INPUTS */}
      <SizeInputs
        width={widthUnit}
        height={heightUnit}
        onChange={handleSizeChange}
      />

      {/* UNIT SWITCH (mm / in / pt) */}
      <UnitSelector
        unit={unit}
        onChange={handleUnitChange}
      />

      {/* DEBUG / TRANSPARENCY FEEDBACK */}
      {/* Helps ensure canonical values are always correct */}
      <div className="text-xs text-slate-500">
        Internal (mm):{" "}
        {Math.round(value.width)} ×{" "}
        {Math.round(value.height)}
      </div>
    </div>
  );
}
