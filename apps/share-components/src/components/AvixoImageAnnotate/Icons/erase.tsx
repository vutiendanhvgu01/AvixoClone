import { SVGAttributes } from 'react';

const EraseIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.5 22.5586H21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M3.40997 18.1383L6.91998 21.6483C8.08998 22.8183 9.99997 22.8183 11.16 21.6483L21.59 11.2183C22.76 10.0483 22.76 8.13831 21.59 6.97831L18.08 3.46832C16.91 2.29832 15 2.29832 13.84 3.46832L3.40997 13.8983C2.23997 15.0583 2.23997 16.9683 3.40997 18.1383Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.62012 9.68848L15.3701 17.4385"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EraseIcon;
