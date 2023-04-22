import { useCallback, useEffect, useRef } from "react";
import { IUseTimeout } from "../interfaces";

export function useTimeout(cb: () => void, delay: number): IUseTimeout {
  const callbackRef = useRef(cb);
  const timeoutRef = useRef();

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  const set = useCallback(() => {
    //@ts-ignore
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return {
    reset,
    clear,
  };
}