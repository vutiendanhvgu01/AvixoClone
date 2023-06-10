import { SVGAttributes } from 'react';

const ActionClockIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.7583 12.25L9.0083 13.5L12.3416 10.1666"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33341 4.99996H11.6667C13.3334 4.99996 13.3334 4.16663 13.3334 3.33329C13.3334 1.66663 12.5001 1.66663 11.6667 1.66663H8.33341C7.50008 1.66663 6.66675 1.66663 6.66675 3.33329C6.66675 4.99996 7.50008 4.99996 8.33341 4.99996Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 3.34998C16.1083 3.49998 17.5 4.52498 17.5 8.33331V13.3333C17.5 16.6666 16.6667 18.3333 12.5 18.3333H7.5C3.33333 18.3333 2.5 16.6666 2.5 13.3333V8.33331C2.5 4.53331 3.89167 3.49998 6.66667 3.34998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ActionClockIcon;
