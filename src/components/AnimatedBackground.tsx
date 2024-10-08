import React from 'react';
import { Box, keyframes } from '@chakra-ui/react';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedBackground: React.FC = () => {
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="-1"
      bgGradient="linear(to-r, #4158D0, #C850C0, #FFCC70)"
      backgroundSize="200% 200%"
      animation={`${gradientAnimation} 15s ease infinite`}
      opacity="0.1"
    />
  );
};

export default AnimatedBackground;