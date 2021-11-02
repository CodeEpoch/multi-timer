// From https://github.com/amrlabib/react-timer-hook/tree/f345d7bf6f0e303eefaa8008d35afdeefc784c25/src
import { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const callbacRef = useRef();

  // update callback function with current render callback that has access to latest props and state
  useEffect(() => {
    callbacRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      callbacRef.current && callbacRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
