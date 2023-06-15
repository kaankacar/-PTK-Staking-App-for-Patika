import React from 'react';
import { useEthers } from 'ethers-react';

const ConnectWalletButton = () => {
  const { connect } = useEthers();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  return (
    <button onClick={handleConnectWallet}>
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;
