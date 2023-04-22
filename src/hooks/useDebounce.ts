import { useTimeout } from "./useTimeout";
import { useEffect } from "react";

export function useDebounce(
  cb: () => void,
  delay: number,
  dependencies: any[]
) {
  const { reset, clear } = useTimeout(cb, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
