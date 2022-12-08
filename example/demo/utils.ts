/**
 * 在范围内生成随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function random(min: number, max: number): number {
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
