import { SVGAttributes } from 'react';

type Type = 'active' | 'inactive';

interface StatusIconType extends SVGAttributes<SVGElement> {
  type: Type;
}

const StatusIcon: React.FC<StatusIconType> = (props: StatusIconType) => {
  const { type } = props;
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="4" cy="4" r="4" fill={type === 'active' ? '#3FC79A' : '#D14343'} />
    </svg>
  );
};

export default StatusIcon;
