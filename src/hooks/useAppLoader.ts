"use client";

import { useEffect, useState } from "react";
import { LOADER } from "@/lib/constants";

export function useAppLoader() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    let timeout: number | undefined;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    root.style.scrollBehavior = "auto";
    root.classList.add("is-app-loading");
    window.scrollTo(0, 0);

    const firstFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      timeout = window.setTimeout(() => {
        window.scrollTo(0, 0);
        root.classList.remove("is-app-loading");
        root.style.scrollBehavior = previousScrollBehavior;
        setIsReady(true);
      }, LOADER.durationMs);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
      root.classList.remove("is-app-loading");
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return isReady;
}
