import React, { useState } from 'react';
import { contract } from '../contract.js';

const StakeButton = () => {
  const [stakeAmount, setStakeAmount] = useState(0);

  const handleStake = async () => {
    try {
      await contract.stake(stakeAmount);
    } catch (error) {
      console.log('Error staking:', error);
    }
  };

  const handleInputChange = (e) => {
    setStakeAmount(e.target.value);
  };

  return (
    <div>
      <input type="number" value={stakeAmount} onChange={handleInputChange} />
      <button onClick={handleStake}>Stake</button>
    </div>
  );
};

export default StakeButton;
