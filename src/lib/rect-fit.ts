export interface FitOptions {
  gx?: number;
  gy?: number;
  allowRotation?: boolean;
}

export interface FitResult {
  total: number;
  cols: number;
  rows: number;
  rotated: boolean;
  w: number;
  h: number;
}

function _fit(W: number, H: number, w: number, h: number, gx: number, gy: number): Omit<FitResult, 'rotated' | 'w' | 'h'> {
  if (w <= 0 || h <= 0 || W < w || H < h) return { cols: 0, rows: 0, total: 0 };
  const cols = Math.floor((W + gx) / (w + gx));
  const rows = Math.floor((H + gy) / (h + gy));
  return { cols, rows, total: cols * rows };
}

export function rectFit(W: number, H: number, w: number, h: number, opts: FitOptions = {}): FitResult {
  const { gx = 0, gy = 0, allowRotation = true } = opts;
  const natural = _fit(W, H, w, h, gx, gy);
  if (!allowRotation || w === h) return { ...natural, rotated: false, w, h };
  const rotated = _fit(W, H, h, w, gx, gy);
  if (rotated.total >= natural.total) return { ...rotated, rotated: true,  w: h, h: w };
  return                                      { ...natural, rotated: false, w,    h    };
}

export function rectFitSimple(W: number, H: number, w: number, h: number, allowRotation = true): FitResult {
  return rectFit(W, H, w, h, { allowRotation });
}

export function rectFitWithGap(W: number, H: number, w: number, h: number, gx: number, gy: number, allowRotation = true): FitResult {
  return rectFit(W, H, w, h, { gx, gy, allowRotation });
}

export default rectFit;