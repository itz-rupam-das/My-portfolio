import type { CSSProperties } from "react";

export type CssVariableStyle = CSSProperties & Record<`--${string}`, string | number>;
