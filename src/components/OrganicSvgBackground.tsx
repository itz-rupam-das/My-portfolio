"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const blobs = [
  {
    d: "M94 210C45 174 32 103 83 65C143 21 236 39 274 98C316 163 265 240 194 252C153 259 122 231 94 210Z",
    transform: "translate(28 92) scale(1.12)",
  },
  {
    d: "M111 263C49 238 26 160 63 96C103 28 197 13 262 57C328 102 351 198 302 256C260 305 170 287 111 263Z",
    transform: "translate(328 22) scale(0.82)",
  },
  {
    d: "M91 178C48 136 55 62 112 34C175 3 254 30 283 95C312 158 260 228 192 229C150 229 119 205 91 178Z",
    transform: "translate(650 112) scale(1.24)",
  },
  {
    d: "M107 301C44 259 28 166 79 91C129 18 229 15 294 69C361 124 364 229 307 287C257 338 167 341 107 301Z",
    transform: "translate(1048 8) scale(0.92)",
  },
  {
    d: "M82 207C24 160 31 78 98 37C171 -7 268 26 293 102C318 178 249 246 172 239C135 236 111 230 82 207Z",
    transform: "translate(1426 96) scale(1.06)",
  },
  {
    d: "M74 169C33 119 53 45 117 22C184 -2 259 42 271 114C285 194 205 244 136 218C107 207 92 191 74 169Z",
    transform: "translate(168 376) scale(0.94)",
  },
  {
    d: "M107 282C54 250 31 173 64 112C103 41 189 18 257 52C326 87 347 177 303 238C262 295 168 319 107 282Z",
    transform: "translate(472 342) scale(1.18)",
  },
  {
    d: "M88 244C33 199 40 112 101 59C169 0 271 22 310 99C349 176 292 270 205 282C155 289 119 270 88 244Z",
    transform: "translate(842 356) scale(0.86)",
  },
  {
    d: "M81 198C32 158 26 84 77 42C131 -3 224 4 271 59C323 119 300 212 229 247C175 273 119 230 81 198Z",
    transform: "translate(1196 318) scale(1.3)",
  },
  {
    d: "M112 269C52 237 24 151 66 85C113 13 220 10 284 68C346 124 333 224 269 270C222 304 164 297 112 269Z",
    transform: "translate(1504 402) scale(0.84)",
  },
  {
    d: "M102 223C47 183 32 95 91 48C152 -1 253 20 291 91C328 160 283 237 207 253C159 263 133 245 102 223Z",
    transform: "translate(-32 658) scale(1.2)",
  },
  {
    d: "M81 235C30 184 44 90 113 47C182 4 281 30 313 109C348 194 278 276 190 273C142 271 109 263 81 235Z",
    transform: "translate(314 640) scale(0.78)",
  },
  {
    d: "M93 276C32 232 25 141 81 76C139 9 243 12 301 82C356 148 326 246 246 285C191 312 136 307 93 276Z",
    transform: "translate(590 594) scale(1.36)",
  },
  {
    d: "M87 202C39 159 39 80 100 38C164 -6 252 19 282 91C313 165 259 238 181 240C137 241 111 224 87 202Z",
    transform: "translate(1038 648) scale(1.04)",
  },
  {
    d: "M112 286C45 243 29 148 85 77C141 5 251 15 309 90C363 160 338 252 264 295C212 325 159 316 112 286Z",
    transform: "translate(1374 632) scale(1.2)",
  },
  {
    d: "M77 188C34 139 50 62 111 28C177 -8 258 25 279 99C301 174 239 238 165 229C125 224 101 216 77 188Z",
    transform: "translate(1662 684) scale(0.82)",
  },
  {
    d: "M101 255C41 211 35 125 94 66C153 8 249 15 300 79C353 145 319 239 242 275C188 300 140 284 101 255Z",
    transform: "translate(108 934) scale(0.9)",
  },
  {
    d: "M98 214C42 176 32 93 88 45C147 -7 248 11 291 80C334 149 294 237 214 258C162 272 127 235 98 214Z",
    transform: "translate(452 900) scale(1.18)",
  },
  {
    d: "M78 224C29 175 45 85 113 43C180 1 275 32 306 107C338 185 279 265 197 270C150 273 105 252 78 224Z",
    transform: "translate(824 942) scale(0.96)",
  },
  {
    d: "M94 267C35 231 21 139 75 75C132 9 238 11 297 77C357 144 334 244 259 286C202 319 145 298 94 267Z",
    transform: "translate(1178 898) scale(1.12)",
  },
  {
    d: "M83 198C32 155 35 75 96 34C164 -11 257 16 288 91C320 168 259 241 181 240C136 239 111 221 83 198Z",
    transform: "translate(1518 920) scale(1.28)",
  },
];

const drift = [
  { x: 38, y: -22, duration: 2.0 },
  { x: -44, y: 26, duration: 1.7 },
  { x: 28, y: 18, duration: 2.4 },
  { x: -32, y: -24, duration: 1.6 },
  { x: 46, y: 14, duration: 2.8 },
  { x: -26, y: 28, duration: 1.9 },
  { x: 50, y: -18, duration: 2.2 },
  { x: -36, y: 20, duration: 1.7 },
  { x: 31, y: -30, duration: 2.6 },
  { x: -48, y: -16, duration: 2.0 },
  { x: 42, y: 24, duration: 1.5 },
  { x: -30, y: -28, duration: 2.4 },
  { x: 24, y: 22, duration: 1.9 },
  { x: -50, y: 12, duration: 2.2 },
  { x: 34, y: -26, duration: 1.7 },
  { x: -40, y: 30, duration: 3.0 },
  { x: 48, y: -14, duration: 1.9 },
  { x: -22, y: 18, duration: 1.4 },
  { x: 36, y: 27, duration: 2.6 },
  { x: -46, y: -21, duration: 2.0 },
  { x: 29, y: 16, duration: 1.5 },
];

export function OrganicSvgBackground() {
  const rootRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.utils
        .toArray<SVGGElement>("[data-blob-drift]")
        .forEach((path, index) => {
          const movement = drift[index % drift.length];

          gsap.to(path, {
            x: movement.x,
            y: movement.y,
            duration: movement.duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            force3D: true,
          });
        });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <svg
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080"
    >
      <g
        className="organic-svg-g"
        fill="none"
        stroke="#d8d8d8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {blobs.map((blob, index) => (
          <g data-blob-path key={index} transform={blob.transform}>
            <g data-blob-drift>
              <path d={blob.d} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
