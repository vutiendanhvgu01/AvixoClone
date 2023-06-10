import { SVGAttributes } from 'react';

const CopyIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M13.3327 10.7498V14.2498C13.3327 17.1665 12.166 18.3332 9.24935 18.3332H5.74935C2.83268 18.3332 1.66602 17.1665 1.66602 14.2498V10.7498C1.66602 7.83317 2.83268 6.6665 5.74935 6.6665H9.24935C12.166 6.6665 13.3327 7.83317 13.3327 10.7498Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3327 5.74984V9.24984C18.3327 12.1665 17.166 13.3332 14.2494 13.3332H13.3327V10.7498C13.3327 7.83317 12.166 6.6665 9.24935 6.6665H6.66602V5.74984C6.66602 2.83317 7.83268 1.6665 10.7493 1.6665H14.2494C17.166 1.6665 18.3327 2.83317 18.3327 5.74984Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CopyIcon;
