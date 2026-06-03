/**
 * Unit conversion: mm ↔ in ↔ pt
 *
 * Canonical relationships:
 *   1 in  = 25.4 mm   (exact, by definition)
 *   1 in  = 72 pt     (PostScript / CSS standard)
 *   1 pt  = 25.4 / 72 mm
 */

export type Unit = "mm" | "in" | "pt";

// ─── primitives ──────────────────────────────────────────────────────────────

export const mmToIn  = (mm: number): number => mm / 25.4;
export const mmToPt  = (mm: number): number => mm * 72 / 25.4;

export const inToMm  = (inch: number): number => inch * 25.4;
export const inToPt  = (inch: number): number => inch * 72;

export const ptToMm  = (pt: number): number => pt * 25.4 / 72;
export const ptToIn  = (pt: number): number => pt / 72;

// ─── generic converter ───────────────────────────────────────────────────────

/**
 * Convert a value from one unit to another.
 *
 * @example
 * convert(210, "mm", "in")  // → 8.267...
 * convert(1,   "in", "pt")  // → 72
 * convert(72,  "pt", "mm")  // → 25.4
 */
export function convert(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;

  // normalise to mm first, then out
  const mm = from === "mm" ? value
           : from === "in" ? inToMm(value)
           :                 ptToMm(value);   // "pt"

  return to === "mm" ? mm
       : to === "in" ? mmToIn(mm)
       :               mmToPt(mm);            // "pt"
}

// ─── formatting helpers ──────────────────────────────────────────────────────

const DECIMAL_PLACES: Record<Unit, number> = {
  mm: 1,
  in: 3,
  pt: 1,
};

/**
 * Convert and round to a sensible number of decimal places for display.
 *
 * @example
 * convertForDisplay(210,  "mm", "in")  // → 8.268
 * convertForDisplay(8.27, "in", "mm")  // → 210.0
 */
export function convertForDisplay(value: number, from: Unit, to: Unit): number {
  const raw = convert(value, from, to);
  const dp  = DECIMAL_PLACES[to];
  return parseFloat(raw.toFixed(dp));
}
