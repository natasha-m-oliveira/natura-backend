export function getFromArray<R, K>(array: Array<R>, key: string, value: K): R {
  return array.find((e) => e[key] === value);
}
