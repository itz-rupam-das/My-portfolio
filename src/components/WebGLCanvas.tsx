"use client";

import { useEffect, useRef } from "react";
import { Geometry, Mesh, Program, Renderer, Texture } from "ogl";
import type { OGLRenderingContext } from "ogl";
import {
  portraitFragmentShader,
  portraitVertexShader,
} from "@/lib/shader";

type WebGLCanvasProps = {
  colorSrc: string;
  monochromeSrc: string;
};

function loadTexture(gl: OGLRenderingContext, src: string) {
  const texture = new Texture(gl, {
    generateMipmaps: false,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
  });

  const image = new Image();
  image.decoding = "async";
  image.src = src;

  return new Promise<{ texture: Texture; width: number; height: number }>(
    (resolve, reject) => {
      image.onload = () => {
        texture.image = image;
        resolve({
          texture,
          width: image.naturalWidth,
          height: image.naturalHeight,
        });
      };
      image.onerror = () => reject(new Error(`Failed to load ${src}`));
    },
  );
}

export function WebGLCanvas({
  colorSrc,
  monochromeSrc,
}: WebGLCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const gradeSource = host.closest("section") as HTMLElement | null;

    let disposed = false;
    let frame = 0;
    const pointer = { x: 0.5, y: 0.5 };
    let hoverTarget = 0;
    let hoverAmount = 0;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 0);
    host.appendChild(gl.canvas);

    const resize = () => {
      const rect = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointer.y = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height));
      hoverTarget = 1;
    };

    const onPointerLeave = () => {
      hoverTarget = 0;
    };

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);

    Promise.all([loadTexture(gl, colorSrc), loadTexture(gl, monochromeSrc)]).then(([color, monochrome]) => {
      if (disposed) {
        return;
      }

      const geometry = new Geometry(gl, {
        position: {
          size: 2,
          data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: {
          size: 2,
          data: new Float32Array([0, 0, 2, 0, 0, 2]),
        },
      });

      const program = new Program(gl, {
        vertex: portraitVertexShader,
        fragment: portraitFragmentShader,
        uniforms: {
          uColor: { value: color.texture },
          uMonochrome: { value: monochrome.texture },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uImageResolution: { value: [color.width, color.height] },
          uPointer: { value: [pointer.x, pointer.y] },
          uHover: { value: 0 },
          uGrade: { value: 0 },
          uTime: { value: 0 },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });
      const startedAt = performance.now();

      const render = () => {
        if (disposed) {
          return;
        }

        hoverAmount += (hoverTarget - hoverAmount) * 0.12;
        const grade = Number.parseFloat(
          gradeSource?.style.getPropertyValue("--portrait-grade") || "0",
        );
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
        program.uniforms.uPointer.value = [pointer.x, pointer.y];
        program.uniforms.uHover.value = hoverAmount;
        program.uniforms.uGrade.value = Number.isFinite(grade) ? grade : 0;
        program.uniforms.uTime.value = (performance.now() - startedAt) / 1000;

        renderer.render({ scene: mesh });

        frame = requestAnimationFrame(render);
      };

      frame = requestAnimationFrame(render);
    }).catch((error: unknown) => {
      console.error("Unable to load portrait textures.", error);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [colorSrc, monochromeSrc]);

  return (
    <div
      ref={hostRef}
      aria-label="Portrait"
      className="h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      role="img"
    />
  );
}
