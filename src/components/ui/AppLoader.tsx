"use client";

import type { ReactNode } from "react";
import { useAppLoader } from "@/hooks/useAppLoader";
import { LOADER, SITE } from "@/lib/constants";

type AppLoaderProps = {
  children: ReactNode;
};

export function AppLoader({ children }: AppLoaderProps) {
  const isReady = useAppLoader();

  return (
    <>
      <div
        aria-hidden={isReady}
        className={`fixed inset-0 z-[9999] grid place-items-center bg-[#1F221A] transition-opacity duration-500 ${
          isReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <div className="loader-name-type permanent-marker-regular" data-text={SITE.name}>
            {SITE.name}
          </div>
          <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#D1F82D]">
            {LOADER.label}
          </div>
        </div>
      </div>
      {isReady ? <div>{children}</div> : null}
    </>
  );
}
