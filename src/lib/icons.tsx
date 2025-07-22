import React from "react";

// Icon component to standardize props
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const Icon: React.FC<IconProps> = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
};

// Specific icons
export const ChartLineUp: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </Icon>
);

export const Bot: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </Icon>
);

export const Bolt: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </Icon>
);

export const ChartBar: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
  </Icon>
);

export const Gauge: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Icon>
);

export const RefreshCcw: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 2v6h6" />
    <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
    <path d="M21 22v-6h-6" />
    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
  </Icon>
);

export const Shield: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
);

export const GitBranch: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9v3a3 3 0 0 1-3 3H9" />
    <path d="m6 15 4-4" />
  </Icon>
);

export const Bell: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);

export const Settings: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const Monitor: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </Icon>
);

export const Crown: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M18 3a3 3 0 0 0-3 3M6 3a3 3 0 0 1 3 3M12 9h.01M12 3a3 3 0 0 0-3 3m3-3a3 3 0 0 1 3 3m0 0v1M6 6v1m12-1v1M6 21h12a2 2 0 0 0 2-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5a2 2 0 0 0 2 2Z" />
  </Icon>
);

export const GraduationCap: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </Icon>
);

export const UserTie: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="7" r="5" />
    <path d="M12 22a8 8 0 0 0 8-8v-1.5m-.834-.859A8 8 0 0 0 12 6m0 0a8 8 0 0 0-7.165 5.641m0 0L4 22l4.762-3.796A8 8 0 0 0 12 22" />
  </Icon>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

export const ChevronDown: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const Check: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const Menu: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </Icon>
);

export const X: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

export const ChartArea: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M3 3v18h18" />
    <path d="M3 9 8 4 13 9 21 1" />
    <path d="M21 7v14H3l18-14Z" />
  </Icon>
);

export const Lock: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

export const Smartphone: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </Icon>
);

export const Expand: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
    <path d="M3 16.2V21m0 0h4.8m-4.8 0 6-6" />
    <path d="M21 7.8V3m0 0h-4.8m4.8 0-6 6" />
    <path d="M3 7.8V3m0 0h4.8m-4.8 0 6 6" />
  </Icon>
);

export const Star: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </Icon>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </Icon>
);

export const DollarSign: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <line x1="12" x2="12" y1="1" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Icon>
);

export const Calendar: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Icon>
);

export const AlertTriangle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </Icon>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </Icon>
);

export const BookOpen: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </Icon>
);

export const Target: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);
