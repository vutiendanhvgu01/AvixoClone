import { SVGAttributes } from 'react';

const DollarSquareIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7.22656 11.9422C7.22656 13.0172 8.05156 13.8839 9.07656 13.8839H11.1682C12.0599 13.8839 12.7849 13.1255 12.7849 12.1922C12.7849 11.1755 12.3432 10.8172 11.6849 10.5839L8.32656 9.41719C7.66823 9.18385 7.22656 8.82552 7.22656 7.80885C7.22656 6.87552 7.95156 6.11719 8.84323 6.11719H10.9349C11.9599 6.11719 12.7849 6.98385 12.7849 8.05885"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 5V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12.5013 18.3327H7.5013C3.33464 18.3327 1.66797 16.666 1.66797 12.4993V7.49935C1.66797 3.33268 3.33464 1.66602 7.5013 1.66602H12.5013C16.668 1.66602 18.3346 3.33268 18.3346 7.49935V12.4993C18.3346 16.666 16.668 18.3327 12.5013 18.3327Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DollarSquareIcon;
