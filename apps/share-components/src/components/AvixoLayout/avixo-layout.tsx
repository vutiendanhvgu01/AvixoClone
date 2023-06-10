import React, { FC } from 'react';
import AvixoBg2 from 'share-components/assets/background/rectangle-71.png';
import AvixoLayoutProps from './avixo-layout-type';

const AvixoLayout: FC<AvixoLayoutProps> = props => {
  const { children } = props;
  return (
    <main
      style={{
        backgroundImage: `linear-gradient(294.83deg, #C1369E -8.26%, #7337B3 59.68%, #44189B 98.44%), url(${AvixoBg2.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'lighten',
        backgroundAttachment: 'fixed',
      }}
    >
      {children}
    </main>
  );
};
export default AvixoLayout;
