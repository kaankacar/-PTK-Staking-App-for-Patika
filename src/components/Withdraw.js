import React from 'react';
import { contract } from '../contract.js';

const WithdrawButton = () => {
  const handleWithdraw = async () => {
    try {
      await contract.withdraw();
    } catch (error) {
      console.log('Error withdrawing:', error);
    }
  };

  return (
    <button onClick={handleWithdraw}>
      Withdraw
    </button>
  );
};

export default WithdrawButton;
