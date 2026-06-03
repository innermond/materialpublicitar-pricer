import { describe, it, expect } from "vitest";
import {
  mmToIn, mmToPt,
  inToMm, inToPt,
  ptToMm, ptToIn,
  convert,
  convertForDisplay,
} from "./units";
import type { Unit } from "./units";

// ─── constants ───────────────────────────────────────────────────────────────

const MM_PER_IN = 25.4;
const PT_PER_IN = 72;
const EPSILON   = 1e-9;

// ─── primitives ──────────────────────────────────────────────────────────────

describe("mmToIn", () => {
  it("1 inch is 25.4 mm", () =>
    expect(mmToIn(MM_PER_IN)).toBeCloseTo(1, 10));

  it("210 mm is ~8.267 in", () =>
    expect(mmToIn(210)).toBeCloseTo(8.2677165, 5));
});

describe("mmToPt", () => {
  it("25.4 mm is 72 pt", () =>
    expect(mmToPt(MM_PER_IN)).toBeCloseTo(PT_PER_IN, 10));

  it("0 mm is 0 pt", () =>
    expect(mmToPt(0)).toBe(0));
});

describe("inToMm", () => {
  it("1 in is 25.4 mm", () =>
    expect(inToMm(1)).toBeCloseTo(MM_PER_IN, 10));

  it("0.5 in is 12.7 mm", () =>
    expect(inToMm(0.5)).toBeCloseTo(12.7, 10));
});

describe("inToPt", () => {
  it("1 in is 72 pt", () =>
    expect(inToPt(1)).toBeCloseTo(PT_PER_IN, 10));

  it("0.5 in is 36 pt", () =>
    expect(inToPt(0.5)).toBeCloseTo(36, 10));
});

describe("ptToMm", () => {
  it("72 pt is 25.4 mm", () =>
    expect(ptToMm(PT_PER_IN)).toBeCloseTo(MM_PER_IN, 10));
});

describe("ptToIn", () => {
  it("72 pt is 1 in", () =>
    expect(ptToIn(PT_PER_IN)).toBeCloseTo(1, 10));

  it("36 pt is 0.5 in", () =>
    expect(ptToIn(36)).toBeCloseTo(0.5, 10));
});

// ─── convert: identity ───────────────────────────────────────────────────────

describe("convert — same-unit identity", () => {
  const units: Unit[] = ["mm", "in", "pt"];
  it.each(units)("convert(x, %s, %s) returns x unchanged", (u) => {
    expect(convert(123.456, u, u)).toBe(123.456);
  });
});

// ─── convert: round-trip ─────────────────────────────────────────────────────

describe("convert — round-trips", () => {
  const pairs: [Unit, Unit][] = [
    ["mm", "in"],
    ["mm", "pt"],
    ["in", "pt"],
  ];

  it.each(pairs)("%s → %s → %s", (a, b) => {
    const original = 210;
    const there    = convert(original, a, b);
    const back     = convert(there,    b, a);
    expect(Math.abs(back - original)).toBeLessThan(EPSILON);
  });
});

// ─── convert: known values ───────────────────────────────────────────────────

describe("convert — known physical values", () => {
  it("A4 width: 210 mm → ~8.268 in", () =>
    expect(convert(210, "mm", "in")).toBeCloseTo(8.2677165, 5));

  it("1 in → 72 pt", () =>
    expect(convert(1, "in", "pt")).toBeCloseTo(72, 10));

  it("72 pt → 25.4 mm", () =>
    expect(convert(72, "pt", "mm")).toBeCloseTo(25.4, 10));

  it("210 mm → pt → mm round-trip (A4 width)", () => {
    const there = convert(210, "mm", "pt");
    const back  = convert(there, "pt", "mm");
    expect(Math.abs(back - 210)).toBeLessThan(EPSILON);
  });
});

// ─── convertForDisplay ───────────────────────────────────────────────────────

describe("convertForDisplay — decimal places", () => {
  it("mm result has 1 dp", () =>
    expect(convertForDisplay(1, "in", "mm").toString()).toMatch(/^\d+\.\d$/));

  it("in result has 3 dp", () =>
    expect(convertForDisplay(210, "mm", "in").toString()).toMatch(/^\d+\.\d{1,3}$/));

  it("pt result has at most 1 dp", () => {
    // 25.4 mm = exactly 72 pt; parseFloat strips the trailing zero, so we
    // check the numeric value rather than the string representation.
    const result = convertForDisplay(25.4, "mm", "pt");
    expect(result).toBeCloseTo(72, 1);
    // non-exact value does keep the decimal place
    expect(convertForDisplay(26, "mm", "pt").toString()).toMatch(/^\d+\.\d$/);
  });

  it("same-unit passthrough still rounds correctly", () =>
    expect(convertForDisplay(210.12345, "mm", "mm")).toBe(210.1));
});
