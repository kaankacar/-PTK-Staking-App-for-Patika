import React, { useEffect, useState } from 'react';
import { contract } from '../contract.js';

const TokenInfo = () => {
  const [tokenBalance, setTokenBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    const fetchTokenInfo = async () => {
      const balance = await contract.balanceOf(window.ethereum.selectedAddress);
      setTokenBalance(balance);
      const supply = await contract.totalSupply();
      setTotalSupply(supply);
    };

    fetchTokenInfo();
  }, []);

  return (
    <div>
      <p>Token Balance: {tokenBalance}</p>
      <p>Total Supply: {totalSupply}</p>
    </div>
  );
};

export default TokenInfo;
