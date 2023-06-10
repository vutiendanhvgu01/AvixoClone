import { SVGAttributes } from 'react';

const ListItemsIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.667 1.667v2.5M13.333 1.667v2.5M17.5 7.083v7.083c0 2.5-1.25 4.167-4.167 4.167H6.667c-2.917 0-4.167-1.666-4.167-4.166V7.082c0-2.5 1.25-4.167 4.167-4.167h6.666c2.917 0 4.167 1.667 4.167 4.167ZM6.667 9.166h6.666M6.667 13.334H10"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ListItemsIcon;
