"use client";

import type { CSSProperties, ReactNode, SVGProps } from "react";

type SocialLink = {
  label: string;
  href: string;
  gradient: [string, string];
  Icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
};

type SocialStyle = CSSProperties & {
  "--social-from": string;
  "--social-to": string;
};

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.42.36.78 1.06.78 2.14v3.15c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z"
      />
    </svg>
  );
}

function GmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.22L4.58 7H4v.73l8 5.63 8-5.63V7h-.58L12 12.22Z"
      />
    </svg>
  );
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Github",
    href: "https://github.com/rdas4",
    gradient: ["#2f3437", "#111111"],
    Icon: GithubIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rdas4",
    gradient: ["#f58529", "#dd2a7b"],
    Icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/rdas4",
    gradient: ["#56ccf2", "#1877f2"],
    Icon: FacebookIcon,
  },
  {
    label: "Gmail",
    href: "mailto:rdas4@gmail.com",
    gradient: ["#ea4335", "#fbbc05"],
    Icon: GmailIcon,
  },
];

export function SocialLinks() {
  return (
    <nav aria-label="Social media links" className="social-links">
      {SOCIAL_LINKS.map(({ label, href, gradient, Icon }) => (
        <a
          aria-label={label}
          className="social-link"
          href={href}
          key={label}
          rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
          style={{
            "--social-from": gradient[0],
            "--social-to": gradient[1],
          } as SocialStyle}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
        >
          <span className="social-link-icon">
            <Icon />
          </span>
          <span className="social-link-title">{label}</span>
        </a>
      ))}
    </nav>
  );
}
