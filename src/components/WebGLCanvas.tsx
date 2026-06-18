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
}: WebGLCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    let disposed = false;
    let frame = 0;

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

    loadTexture(gl, colorSrc).then((color) => {
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
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uImageResolution: { value: [color.width, color.height] },
        },
        transparent: true,
      });

      const mesh = new Mesh(gl, { geometry, program });

      const render = () => {
        if (disposed) {
          return;
        }

        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];

        renderer.render({ scene: mesh });

        frame = requestAnimationFrame(render);
      };

      frame = requestAnimationFrame(render);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [colorSrc]);

  return (
    <div
      ref={hostRef}
      aria-label="Portrait"
      className="h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      role="img"
    />
  );
}
