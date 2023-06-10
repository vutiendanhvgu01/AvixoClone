import { SVGAttributes } from 'react';

const ArrowUpIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.391 11.078A1.947 1.947 0 0 0 21 10.5c-.499 0-.997.184-1.391.578l-7.875 7.875a1.98 1.98 0 0 0 0 2.782 1.98 1.98 0 0 0 2.782 0l4.515-4.515v13.624c0 1.076.893 1.968 1.969 1.968a1.983 1.983 0 0 0 1.969-1.968V17.22l4.515 4.515a1.98 1.98 0 0 0 2.782 0 1.98 1.98 0 0 0 0-2.782l-7.875-7.875Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <rect width={42} height={42} rx={21} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowUpIcon;
