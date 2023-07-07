// @ts-ignore
import { scrypt, syncScrypt } from "./scrypt.js";

export const stringToNumArray = (s: string) => {
  return s.split("").map((c) => c.charCodeAt(0));
};

export const randomSalt = (length: number) => {
  let res = [];
  for (let i = 0; i < length; i++) {
    res.push(Math.floor(Math.random() * 256));
  }
  return res;
};

export const myScrypt = (password: string, salt: number[]) =>
  scrypt(stringToNumArray(password), salt, Math.pow(2, 15), 1, 1, 100).then(
    Array.from
  );

export const hashesEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

export const optClasses = (...arr: [boolean, string][]) =>
  arr.flatMap(([condition, cls]) => (condition ? [cls] : [])).join(" ");

export const zip = <A, B>(as: A[], bs: B[]): [A, B][] =>
  as.map((a, i) => [a, bs[i]]);

export const sortedBy = <T>(arr: T[], fn: (t: T) => number) => {
  const copy = [...arr];
  return copy.sort((a, b) => fn(a) - fn(b));
};
