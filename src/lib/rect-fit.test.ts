import { describe, it, expect } from 'vitest'
import rectFit, { rectFitSimple } from './rect-fit'
import type { FitResult } from './rect-fit';

const SHEET_WIDTH: number = 320, SHEET_HEIGHT: number = 450;
const MARGIN_WIDTH: number = 10, MARGIN_HEIGHT = 10;
const SHEET_WIDTH_PRINTABLE: number = SHEET_WIDTH - 2*MARGIN_WIDTH, SHEET_HEIGHT_PRINTABLE: number = SHEET_HEIGHT - 2*MARGIN_HEIGHT;

describe(`rectFitSimplpe: Fit on wxh ${SHEET_WIDTH_PRINTABLE} x ${SHEET_HEIGHT_PRINTABLE}`, () => {

  const cases: [width: number, height: number, wanted: number][] = [
    [420, 297, 1],
    [210, 297, 2],
    [90, 50, 24],
    [120, 100, 9], // rotated
  ];
// implement cases
  it.each(cases)(`%ix%i fits %i times`, (w, h, expected) => {
    const r: FitResult = rectFitSimple(SHEET_WIDTH_PRINTABLE, SHEET_HEIGHT_PRINTABLE, w, h);
    expect(r.total).toBe(expected);
  })

  it(`120x100 fits 8 times when no rotation allowed`, () => {
    const r: FitResult = rectFit(SHEET_WIDTH_PRINTABLE, SHEET_HEIGHT_PRINTABLE, 120, 100, {allowRotation: false});
    expect(r.total).toBe(8);
  })
})
