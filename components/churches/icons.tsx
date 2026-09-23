import type { ReactNode, SVGProps } from "react";

// Small stroke icons used across the /churches sections (paths match the approved prototype).

type IconProps = SVGProps<SVGSVGElement> & { size?: number; weight?: number };

function Icon({ size = 16, weight = 2.4, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const CheckIcon = (p: IconProps) => (
  <Icon weight={2.6} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const CrossIcon = (p: IconProps) => (
  <Icon weight={2.6} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2.5" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

export const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const ArrowDownIcon = (p: IconProps) => (
  <Icon weight={2.2} {...p}>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1Z" />
  </Icon>
);

export const ReturnIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 0 12h-2" />
  </Icon>
);

export const MicIcon = (p: IconProps) => (
  <Icon weight={2} {...p}>
    <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z" />
    <path d="M19 11a7 7 0 0 1-14 0M12 18v3" />
  </Icon>
);

export const BookIcon = (p: IconProps) => (
  <Icon weight={2} {...p}>
    <path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z" />
    <path d="M9 7h6M9 11h6" />
  </Icon>
);

export const ShieldIcon = (p: IconProps) => (
  <Icon weight={2} {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
  </Icon>
);

export const InfoIcon = (p: IconProps) => (
  <Icon weight={2} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </Icon>
);
