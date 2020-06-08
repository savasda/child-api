export const distinctByProperty =
  <T>(arr: Array<T>, objKey: keyof T) =>
    arr.reduce<Array<T>>((acc, curr) =>
      acc.some(a => a[objKey] === curr[objKey])
        ? acc
        : [...acc, curr], [])