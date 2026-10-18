/**
 * An equivalent of the built-in `Pick<T, K>`: keeps only the keys `K` of `T`.
 */
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
