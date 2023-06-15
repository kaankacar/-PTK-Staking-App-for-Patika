import React from 'react';
import { UseEthersProvider, Account } from 'ethers-react';
import TokenInfo from './components/TokenInfo.js';
import ConnectWalletButton from './components/ConnectWalletButton.js';
import StakeButton from './components/StakeButton.js';
import ClaimRewardsButton from './components/ClaimRewards.js';
import WithdrawButton from './components/Withdraw.js';
import AirdropButton from './components/Airdrop.js';

const App = () => {
  return (
    <UseEthersProvider>
      <div>
        <h1>PatikaToken Staking Page</h1>
        <Account
          render={(account) => (
            <div>
              <p>Connected Address: {account}</p>
              <ConnectWalletButton />
            </div>
          )}
        />
        <TokenInfo />
        <StakeButton />
        <ClaimRewardsButton />
        <WithdrawButton />
        <AirdropButton />
      </div>
    </UseEthersProvider>
  );
};

export default App;
