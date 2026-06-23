"use client";

import type { CSSProperties, ReactNode } from "react";
import { useAppLoader } from "@/hooks/useAppLoader";
import { LOADER, HERO_MOTION } from "@/lib/constants";
import { SIGNATURE_PATH } from "@/lib/signaturePath";

type AppLoaderProps = {
  children: ReactNode;
};

export function AppLoader({ children }: AppLoaderProps) {
  const isReady = useAppLoader();
  const signatureLength = HERO_MOTION.signatureDashLength;
  const signatureStyle = {
    strokeDasharray: signatureLength,
    strokeDashoffset: signatureLength,
    "--loader-signature-length": signatureLength,
  } as CSSProperties;

  return (
    <>
      <div
        aria-hidden={isReady}
        className={`fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-500 ${
          isReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <div className="loader-shell absolute inset-0" />
        <div className="loader-orb loader-orb-left" />
        <div className="loader-orb loader-orb-right" />
        <div className="loader-grid absolute inset-0 opacity-30" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="loader-panel w-full max-w-4xl rounded-[2rem] border border-white/10 px-8 py-14 text-center shadow-[0_40px_140px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-12">
            <div className="mx-auto mb-8 max-w-[680px]">
              <svg
                className="loader-signature w-full overflow-visible"
                fill="none"
                stroke="#F5F8EB"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
                viewBox="0 0 357 166"
              >
                <path
                  className="loader-signature-path"
                  d={SIGNATURE_PATH}
                  style={signatureStyle}
                />
              </svg>
            </div>

            <div className="mx-auto mb-5 h-px w-24 bg-gradient-to-r from-transparent via-[#D1F82D] to-transparent" />
            <p className="loader-kicker mb-3 text-[10px] font-semibold uppercase tracking-[0.55em] text-[#D1F82D]">
              Signature Loading Sequence
            </p>
            <p className="mx-auto max-w-[32ch] text-sm leading-6 text-[#C5CCBA] sm:text-base">
              {LOADER.label}
            </p>
            <div className="loader-progress mt-8">
              <span className="loader-progress-bar" />
            </div>
          </div>
        </div>
      </div>
      {isReady ? <div>{children}</div> : null}
    </>
  );
}
