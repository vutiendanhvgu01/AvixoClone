import { SVGAttributes } from 'react';

const TextIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.44751 7.13126V5.46293C2.44751 4.40876 3.30001 3.56543 4.34501 3.56543H17.655C18.7092 3.56543 19.5525 4.41793 19.5525 5.46293V7.13126"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11 19.552V4.32617" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M7.38843 19.5518H14.6118"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default TextIcon;
