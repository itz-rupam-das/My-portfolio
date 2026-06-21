import { SOCIAL_LINKS } from "@/lib/constants";
import type { CssVariableStyle } from "@/types/global";

export function SocialLinks() {
  return (
    <nav aria-label="Social media links" className="social-links">
      {SOCIAL_LINKS.map(({ label, href, gradient, path }) => {
        const external = !href.startsWith("mailto:");
        const style: CssVariableStyle = {
          "--social-from": gradient[0],
          "--social-to": gradient[1],
        };

        return (
          <a
            aria-label={label}
            className="social-link"
            href={href}
            key={label}
            rel={external ? "noreferrer" : undefined}
            style={style}
            target={external ? "_blank" : undefined}
          >
            <span className="social-link-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={path} fill="currentColor" />
              </svg>
            </span>
            <span className="social-link-title">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
