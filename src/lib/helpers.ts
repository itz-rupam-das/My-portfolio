export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function readCssNumber(element: HTMLElement | null, property: string) {
  if (!element) {
    return 0;
  }

  const value = Number.parseFloat(element.style.getPropertyValue(property));
  return Number.isFinite(value) ? value : 0;
}
