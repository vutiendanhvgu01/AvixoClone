import { SVGAttributes } from 'react';

const PatientInfoIcon: React.FC<SVGAttributes<SVGElement>> = props => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x={0.5} y={0.5} width={31} height={31} rx={5.5} stroke="#E6E8F0" />
    <path
      d="M16.001 7.664a3.962 3.962 0 0 0-3.958 3.958c0 2.142 1.675 3.875 3.858 3.95a.675.675 0 0 1 .184 0h.058a3.948 3.948 0 0 0 3.817-3.95A3.962 3.962 0 0 0 16 7.664ZM20.233 17.795c-2.325-1.55-6.117-1.55-8.459 0-1.058.709-1.641 1.667-1.641 2.692 0 1.025.583 1.975 1.633 2.675 1.167.783 2.7 1.175 4.233 1.175 1.534 0 3.067-.392 4.234-1.175 1.05-.708 1.633-1.658 1.633-2.692-.008-1.025-.583-1.975-1.633-2.675Z"
      fill="#7681F3"
    />
  </svg>
);

export default PatientInfoIcon;
