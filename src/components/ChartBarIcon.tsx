
import React from 'react';

const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="3" height="10" x="4" y="8" rx="1" />
      <rect width="3" height="14" x="10.5" y="4" rx="1" />
      <rect width="3" height="6" x="17" y="12" rx="1" />
      <path d="M4 20h16" />
    </svg>
  );
};

export default ChartBarIcon;
