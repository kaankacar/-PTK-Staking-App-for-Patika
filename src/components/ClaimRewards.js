import React from 'react';
import { contract } from '../contract.js';

const ClaimRewardsButton = () => {
  const handleClaimRewards = async () => {
    try {
      await contract.claimReward();
    } catch (error) {
      console.log('Error claiming rewards:', error);
    }
  };

  return (
    <button onClick={handleClaimRewards}>
      Claim Rewards
    </button>
  );
};

export default ClaimRewardsButton;
