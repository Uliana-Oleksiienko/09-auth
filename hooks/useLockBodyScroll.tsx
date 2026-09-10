import { useLayoutEffect } from "react";

export const useLockBodyScroll = (isLocked: boolean) => {
  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
};