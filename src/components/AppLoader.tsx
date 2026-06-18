"use client";

import { type ReactNode, useEffect, useState } from "react";

type AppLoaderProps = {
  children: ReactNode;
};

export function AppLoader({ children }: AppLoaderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeout: number | undefined;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

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
      }, 2100);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (timeout) {
        window.clearTimeout(timeout);
      }
      root.classList.remove("is-app-loading");
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] grid place-items-center bg-[#1F221A] transition-opacity duration-500 ${
          isReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="loader-name-type permanent-marker-regular" data-text="RUPAM DAS">
            RUPAM DAS
          </div>
          <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D1F82D]">
            Loading Portfolio
          </div>
        </div>
      </div>
      {isReady ? <div>{children}</div> : null}
    </>
  );
}
