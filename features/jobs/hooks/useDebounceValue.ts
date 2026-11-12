import { useEffect, useState } from "react";

export const useDebounceValue = <T>(value: T, delay: number): T => {
  const [result, setResult] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => {
      setResult(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return result;
};
