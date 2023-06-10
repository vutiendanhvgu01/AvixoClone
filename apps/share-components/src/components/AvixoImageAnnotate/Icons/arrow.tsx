import { SVGAttributes } from 'react';

const ArrowIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4.31645 18.3393L4.31658 18.3388L7.17768 5.70328C7.60719 3.80643 9.98306 3.16982 11.3034 4.59778L20.0979 14.1087C20.0981 14.1089 20.0983 14.1091 20.0985 14.1093C21.6881 15.8367 20.1368 18.5821 17.8434 18.1128L14.333 17.3945C13.1266 17.1476 11.8737 17.4833 10.9524 18.3003L8.27143 20.6776C6.5154 22.2348 3.79694 20.6257 4.31645 18.3393Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ArrowIcon;
