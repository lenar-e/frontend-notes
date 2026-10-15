/**
 * Аналог встроенного `Pick<T, K>`: оставляет в `T` только ключи `K`.
 */
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
