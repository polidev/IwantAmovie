import { useState, useEffect } from "react";

/**
 * Debounces a rapidly changing value.
 *
 * Returns the latest `value` only after `delay` ms have passed
 * without a new value being received. Useful for delaying API
 * calls until the user stops typing.
 *
 * @param {string} value  The raw/rapidly-changing input
 * @param {number} delay  Milliseconds to wait before updating (default 400)
 * @returns {string}      The stable/deferred value
 *
 * @example
 *   const [input, setInput] = useState("");
 *   const debounced = useDebounce(input, 400);
 *   // debounced only updates 400ms after the user stops typing
 */
export default function useDebounce(value, delay = 400) {
  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDelayedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return delayedValue;
}
