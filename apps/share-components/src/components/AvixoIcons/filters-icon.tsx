import { SVGAttributes } from 'react';

const FiltersIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M11.9338 15.8915C11.9338 16.3998 11.6004 17.0665 11.1754 17.3248L10.0005 18.0831C8.90879 18.7581 7.39212 17.9998 7.39212 16.6498V12.1915C7.39212 11.5998 7.05879 10.8415 6.71712 10.4248L3.5171 7.05813C3.0921 6.63313 2.75879 5.88314 2.75879 5.37481V3.44147C2.75879 2.43313 3.51714 1.6748 4.44214 1.6748H15.5588C16.4838 1.6748 17.2421 2.43313 17.2421 3.35813V5.20813C17.2421 5.88313 16.8171 6.7248 16.4005 7.14147"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3913 13.7664C14.864 13.7664 16.058 12.5725 16.058 11.0998C16.058 9.62702 14.864 8.43311 13.3913 8.43311C11.9185 8.43311 10.7246 9.62702 10.7246 11.0998C10.7246 12.5725 11.9185 13.7664 13.3913 13.7664Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.5579 14.2664L15.7246 13.4331"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default FiltersIcon;
