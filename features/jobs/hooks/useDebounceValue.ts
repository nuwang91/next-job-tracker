import { useEffect, useState } from "react";

export const useDebounceValue = <T>(value: T, delay: number): T | undefined => {
  const [result, setResult] = useState<T>();
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
