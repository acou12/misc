type Color = [number, number, number];

export const mix = (color1: Color, color2: Color, percent: number) =>
  color1.map((c, i) => c * (1 - percent) + color2[i] * percent) as Color;
