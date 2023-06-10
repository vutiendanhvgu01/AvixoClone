import React from 'react';

const useScroll = (): number => {
  const [positionY, setPositionY] = React.useState(0);

  const onScroll = React.useCallback(() => {
    const { scrollY } = window;
    setPositionY(scrollY);
  }, []);

  React.useEffect(() => {
    // add eventlistener to window
    window.addEventListener('scroll', onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return positionY;
};

export default useScroll;
