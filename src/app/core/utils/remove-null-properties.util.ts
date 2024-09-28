export function removeNullProperties<T>(obj: T): T {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key as keyof T];
      if (value !== null && value !== undefined) {
        acc[key as keyof T] = value;
      }
      return acc;
    }, {} as T);
  }