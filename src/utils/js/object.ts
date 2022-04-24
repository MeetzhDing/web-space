export const hasOwnProperty = (() => {
  const has = Object.prototype.hasOwnProperty;
  return <T extends Record<string, any>, K extends keyof T>(t: T, k: K) => Boolean(has.call(t, k));
})();

export function isEmpty<T extends object>(t: T) {
  return !(Object.keys(t || {}).length === 0);
}
