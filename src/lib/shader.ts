export const portraitVertexShader = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export const portraitFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uColor;
  uniform sampler2D uMonochrome;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uPointer;
  uniform float uHover;
  uniform float uGrade;
  uniform float uTime;

  varying vec2 vUv;

  vec2 coverUv(vec2 uv, vec2 canvas, vec2 image) {
    float canvasRatio = canvas.x / canvas.y;
    float imageRatio = image.x / image.y;
    vec2 scale = vec2(1.0);

    if (canvasRatio > imageRatio) {
      scale.y = imageRatio / canvasRatio;
    } else {
      scale.x = canvasRatio / imageRatio;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 imageUv = coverUv(vUv, uResolution, uImageResolution);

    if (
      imageUv.x < 0.0 ||
      imageUv.x > 1.0 ||
      imageUv.y < 0.0 ||
      imageUv.y > 1.0
    ) {
      discard;
    }

    vec4 color = texture2D(uColor, imageUv);
    vec4 monochrome = texture2D(uMonochrome, imageUv);

    // Measure in screen-corrected coordinates so the reveal stays blob-shaped
    // instead of stretching with the portrait canvas.
    vec2 delta = vUv - uPointer;
    delta.x *= uResolution.x / uResolution.y;

    float angle = atan(delta.y, delta.x);
    float wobble =
      sin(angle * 3.0 + uTime * 2.6) * 0.016 +
      sin(angle * 5.0 - uTime * 2.0) * 0.011 +
      sin(angle * 7.0 + uTime * 1.45) * 0.006;
    float radius = (0.225 + wobble) * uHover;
    float reveal = 1.0 - smoothstep(radius - 0.018, radius + 0.006, length(delta));

    float grade = clamp(uGrade, 0.0, 1.0);
    float hoverReveal = reveal * uHover;
    vec4 homePortrait = mix(color, monochrome, hoverReveal);

    // Build the scroll portrait from the original color photograph. The
    // separately supplied hover texture is intentionally not used here.
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    vec3 darkGrayscale = vec3(luminance);
    darkGrayscale = (darkGrayscale - 0.5) * 1.05 + 0.5;
    darkGrayscale *= 0.58;

    vec4 portrait = homePortrait;
    portrait.rgb = mix(homePortrait.rgb, clamp(darkGrayscale, 0.0, 1.0), grade);
    portrait.a = mix(homePortrait.a, color.a, grade);
    gl_FragColor = portrait;
  }
`;
