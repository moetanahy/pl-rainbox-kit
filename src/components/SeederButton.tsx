import React from 'react';
import { Button } from '@chakra-ui/react';
import { isAllowedToSeed } from '../utils/WalletUtils';

interface SeederButtonProps {
  connectedAddress: string | null;
}

const SeederButton: React.FC<SeederButtonProps> = ({ connectedAddress }) => {
  if (!connectedAddress || !isAllowedToSeed(connectedAddress)) {
    return null;
  }

  const handleSeed = () => {
    // Implement seeding functionality here
    console.log('Seeding initiated');
  };

  return (
    <Button
      onClick={handleSeed}
      backgroundColor="#15263e"
      color="white"
      size="sm"
      _hover={{ backgroundColor: "#1e3a5f" }}
    >
      Seed Pools
    </Button>
  );
};

export default SeederButton;