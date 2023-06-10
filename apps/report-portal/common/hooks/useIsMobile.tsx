import { useEffect, useState } from 'react';

const useIsMobile = (breakpoints = 900): boolean => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < breakpoints);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, [breakpoints]);

  return isMobile;
};

export default useIsMobile;
