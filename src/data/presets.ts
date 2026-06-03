import type { SizeValue } from "../types/size";

export const SIZE_PRESETS: SizeValue[] = [
  { name: "A6", width: 105, height: 148, unit: 'mm' },
  { name: "A5", width: 148, height: 210, unit: 'mm' },
  { name: "A4", width: 210, height: 297, unit: 'mm' },
  { name: "A3", width: 297, height: 420, unit: 'mm' },
  { name: "BC1", width: 90, height: 50, unit: 'mm' },
  { name: "BC2", width: 100, height: 54, unit: 'mm' },
];

export type SizePresetId =
  | "A6"
  | "A5"
  | "A4"
  | "A3"
  | "BC1"
  | "BC2";

export function getPresetByName(
  name: SizePresetId
): SizeValue | undefined {
  return SIZE_PRESETS.find(
    (p) => p.name === name
  );
}
