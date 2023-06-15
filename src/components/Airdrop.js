import React from 'react';
import { contract } from '../contract.js';

const AirdropButton = () => {
  const handleAirdrop = async () => {
    try {
      await contract.airdrop();
    } catch (error) {
      console.log('Error airdropping:', error);
    }
  };

  return (
    <button onClick={handleAirdrop}>
      Airdrop
    </button>
  );
};

export default AirdropButton;
