const RAINBOWS = [
  ["#e879f9", "#60a5fa", "#5eead4"],
  ["#e879f9", "#5eead4", "#60a5fa"],
  ["#5eead4", "#e879f9", "#60a5fa"],
  ["#5eead4", "#60a5fa", "#e879f9"],
  ["#60a5fa", "#5eead4", "#e879f9"],
  ["#60a5fa", "#e879f9", "#5eead4"],
];

const RAINBOW_COUNT = 25;
const ANIMATION_TIME = 45;

export function RainbowBackground() {
  return (
    <div aria-hidden="true" className="rainbow-bg">
      {Array.from({ length: RAINBOW_COUNT }, (_, index) => {
        const colors = RAINBOWS[index % RAINBOWS.length];
        const duration =
          ANIMATION_TIME - (ANIMATION_TIME / RAINBOW_COUNT / 2) * (index + 1);

        return (
          <span
            className="rainbow-bg-streak"
            key={index}
            style={{
              "--rainbow-one": colors[0],
              "--rainbow-two": colors[1],
              "--rainbow-three": colors[2],
              "--rainbow-duration": `${duration}s`,
              "--rainbow-delay": `-${((index + 1) / RAINBOW_COUNT) * ANIMATION_TIME}s`,
            } as React.CSSProperties}
          />
        );
      })}
      <span className="rainbow-bg-haze-x" />
      <span className="rainbow-bg-haze-y" />
    </div>
  );
}
