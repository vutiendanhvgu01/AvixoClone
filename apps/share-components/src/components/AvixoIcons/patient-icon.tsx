import { SVGAttributes } from 'react';

const PatientIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.2581 4.875L11.3081 2.01666C10.4998 1.55 9.49977 1.55 8.68311 2.01666L3.74144 4.875C2.93311 5.34166 2.43311 6.20833 2.43311 7.15V12.85C2.43311 13.7833 2.93311 14.65 3.74144 15.125L8.69144 17.9833C9.49977 18.45 10.4998 18.45 11.3164 17.9833L16.2664 15.125C17.0748 14.6583 17.5748 13.7917 17.5748 12.85V7.15C17.5664 6.20833 17.0664 5.35 16.2581 4.875ZM9.99977 6.11666C11.0748 6.11666 11.9414 6.98333 11.9414 8.05833C11.9414 9.13333 11.0748 10 9.99977 10C8.92477 10 8.05811 9.13333 8.05811 8.05833C8.05811 6.99166 8.92477 6.11666 9.99977 6.11666ZM12.2331 13.8833H7.76644C7.09144 13.8833 6.69977 13.1333 7.07477 12.575C7.64144 11.7333 8.74144 11.1667 9.99977 11.1667C11.2581 11.1667 12.3581 11.7333 12.9248 12.575C13.2998 13.125 12.8998 13.8833 12.2331 13.8833Z"
      fill="currentColor"
    />
  </svg>
);

export default PatientIcon;