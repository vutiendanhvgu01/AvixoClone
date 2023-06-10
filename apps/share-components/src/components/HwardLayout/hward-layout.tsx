import React, { FC } from 'react';

interface IProps {
  children: React.ReactNode;
}

const HwardLayout: FC<IProps> = props => {
  const { children } = props;
  return <main style={{ backgroundColor: '#F8F8F8' }}>{children}</main>;
};
export default HwardLayout;
