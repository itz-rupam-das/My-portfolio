"use client";

import { type RefObject, useEffect, useRef } from "react";
import { getGsap, type GsapTools } from "@/lib/gsap";

type SetupGsap<T extends Element> = (
  scope: T,
  tools: GsapTools,
) => void | (() => void);

export function useGsapContext<T extends Element>(
  scopeRef: RefObject<T | null>,
  setup: SetupGsap<T>,
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const scope = scopeRef.current;

    if (!scope) {
      return;
    }

    const tools = getGsap();
    let cleanup: void | (() => void);
    const context = tools.gsap.context(() => {
      cleanup = setupRef.current(scope, tools);
    }, scope);

    return () => {
      cleanup?.();
      context.revert();
    };
  }, [scopeRef]);
}
