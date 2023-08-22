import { useRef } from 'react';
import { SlideFade, Box, usePrefersReducedMotion } from '@chakra-ui/react';

import { useOnScreenPersistent } from './useOnScreen';

const offsetX = {
  left: -25,
  right: 25,
  top: 0,
  bottom: 0,
};
const offsetY = {
  left: 0,
  right: 0,
  top: -25,
  bottom: 25,
};

const FadeAnimation: React.FC<{ origin: 'right' | 'left' | 'bottom' | 'top' }> = ({ children, origin }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const onScreen = useOnScreenPersistent(ref);
  return (
    <Box ref={ref} w={'100%'}>
      <SlideFade
        in={prefersReducedMotion ? true : onScreen}
        offsetX={offsetX[origin] || 0}
        offsetY={offsetY[origin] || 0}
        transition={{ enter: { duration: prefersReducedMotion ? 0 : 0.5 } }}
        unmountOnExit // this prop also makes it mount on appear, and not before
      >
        {children}
      </SlideFade>
    </Box>
  );
};

export default FadeAnimation;
