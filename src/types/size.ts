export type SizeUnit = "mm" | "in" | "pt";

export type SizeValue = {
  name?: string;
  width: number;
  height: number;
  unit: SizeUnit;
};
