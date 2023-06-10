import { SVGAttributes } from 'react';

const DotsIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12.5 14C13.3284 14 14 13.3284 14 12.5C14 11.6716 13.3284 11 12.5 11C11.6716 11 11 11.6716 11 12.5C11 13.3284 11.6716 14 12.5 14Z"
      fill="#32358C"
      stroke="#32358C"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M19.5 14C20.3284 14 21 13.3284 21 12.5C21 11.6716 20.3284 11 19.5 11C18.6716 11 18 11.6716 18 12.5C18 13.3284 18.6716 14 19.5 14Z"
      fill="#32358C"
      stroke="#32358C"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.5 14C6.32843 14 7 13.3284 7 12.5C7 11.6716 6.32843 11 5.5 11C4.67157 11 4 11.6716 4 12.5C4 13.3284 4.67157 14 5.5 14Z"
      fill="#32358C"
      stroke="#32358C"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default DotsIcon;
