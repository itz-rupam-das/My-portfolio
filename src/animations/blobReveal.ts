import { Geometry, Mesh, Program, Renderer, Texture } from "ogl";
import type { OGLRenderingContext } from "ogl";
import { PORTRAIT_MOTION } from "@/lib/constants";
import { clamp, readCssNumber } from "@/lib/helpers";
import {
  portraitFragmentShader,
  portraitVertexShader,
} from "@/shaders/portraitShader";

type TextureResource = {
  texture: Texture;
  width: number;
  height: number;
};

type BlobRevealOptions = {
  colorSrc: string;
  hoverSrc: string;
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

  return new Promise<TextureResource>((resolve, reject) => {
    image.onload = () => {
      texture.image = image;
      resolve({
        texture,
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
    image.onerror = () => reject(new Error(`Failed to load ${src}`));
  });
}

function createGeometry(gl: OGLRenderingContext) {
  return new Geometry(gl, {
    position: {
      size: 2,
      data: new Float32Array([-1, -1, 3, -1, -1, 3]),
    },
    uv: {
      size: 2,
      data: new Float32Array([0, 0, 2, 0, 0, 2]),
    },
  });
}

export function createBlobReveal(
  host: HTMLDivElement,
  { colorSrc, hoverSrc }: BlobRevealOptions,
) {
  const stateSource = host.closest("section") as HTMLElement | null;
  const pointer = { x: 0.5, y: 0.5 };
  let hoverTarget = 0;
  let hoverAmount = 0;
  let scrollFade = 0;
  let disposed = false;
  let frame = 0;

  const renderer = new Renderer({
    alpha: true,
    antialias: true,
    dpr: Math.min(window.devicePixelRatio, PORTRAIT_MOTION.maxDpr),
  });
  const gl = renderer.gl;
  gl.clearColor(1, 1, 1, 0);
  host.appendChild(gl.canvas);

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(Math.max(1, width), Math.max(1, height));
  };
  const onPointerMove = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointer.x = clamp((event.clientX - rect.left) / rect.width);
    pointer.y = clamp(1 - (event.clientY - rect.top) / rect.height);
    hoverTarget = 1;
  };
  const onPointerLeave = () => {
    hoverTarget = 0;
  };

  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  host.addEventListener("pointermove", onPointerMove, { passive: true });
  host.addEventListener("pointerleave", onPointerLeave);

  Promise.all([loadTexture(gl, colorSrc), loadTexture(gl, hoverSrc)])
    .then(([color, hover]) => {
      if (disposed) return;

      const program = new Program(gl, {
        vertex: portraitVertexShader,
        fragment: portraitFragmentShader,
        uniforms: {
          uColor: { value: color.texture },
          uMonochrome: { value: hover.texture },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uImageResolution: { value: [color.width, color.height] },
          uPointer: { value: [pointer.x, pointer.y] },
          uHover: { value: 0 },
          uGrade: { value: 0 },
          uScroll: { value: 0 },
          uTime: { value: 0 },
        },
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry: createGeometry(gl), program });
      const startedAt = performance.now();

      const render = () => {
        if (disposed) return;

        hoverAmount += (hoverTarget - hoverAmount) * PORTRAIT_MOTION.hoverEase;
        const scroll = readCssNumber(stateSource, "--hero-scroll");
        const scrollTarget = scroll > 0.0001 ? 1 : 0;
        scrollFade += (scrollTarget - scrollFade) * PORTRAIT_MOTION.scrollFadeEase;
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
        program.uniforms.uPointer.value = [pointer.x, pointer.y];
        program.uniforms.uHover.value = hoverAmount;
        program.uniforms.uGrade.value = readCssNumber(stateSource, "--portrait-grade");
        program.uniforms.uScroll.value = scrollFade;
        program.uniforms.uTime.value = (performance.now() - startedAt) / 1000;
        renderer.render({ scene: mesh });
        frame = requestAnimationFrame(render);
      };

      frame = requestAnimationFrame(render);
    })
    .catch((error: unknown) => {
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
}
