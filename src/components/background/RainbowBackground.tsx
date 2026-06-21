import { RAINBOW } from "@/lib/constants";
import type { CssVariableStyle } from "@/types/global";

export function RainbowBackground() {
  return (
    <div aria-hidden="true" className="rainbow-bg">
      {Array.from({ length: RAINBOW.count }, (_, index) => {
        const colors = RAINBOW.palettes[index % RAINBOW.palettes.length];
        const duration = RAINBOW.duration -
          (RAINBOW.duration / RAINBOW.count / 2) * (index + 1);
        const style: CssVariableStyle = {
          "--rainbow-one": colors[0],
          "--rainbow-two": colors[1],
          "--rainbow-three": colors[2],
          "--rainbow-duration": `${duration}s`,
          "--rainbow-delay": `-${((index + 1) / RAINBOW.count) * RAINBOW.duration}s`,
        };

        return <span className="rainbow-bg-streak" key={index} style={style} />;
      })}
      <span className="rainbow-bg-haze-x" />
      <span className="rainbow-bg-haze-y" />
    </div>
  );
}
