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
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;

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

    gl_FragColor = texture2D(uColor, imageUv);
  }
`;
