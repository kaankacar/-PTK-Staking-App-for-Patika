import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const ContractComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [totalSupply, setTotalSupply] = useState('');
  const [contractBalance, setContractBalance] = useState('');
  const [walletBalance, setWalletBalance] = useState('');

  const contractAddress = '0x7767d03fA08cFebd7cc9C78C84877eC09d0f902E';
  const abi = [
    {
      "inputs": [],
      "name": "airdrop",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "claimReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "isStaked",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    const init = async () => {
      // Connect to MetaMask
      if (window.ethereum) {
        try {
          const provider = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(provider);
          setConnected(true);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (web3) {
      // Load contract
      const contractInstance = new web3.eth.Contract(abi, contractAddress);
      setContract(contractInstance);

      // Get current account
      web3.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });

      // Get total supply
      contractInstance.methods.totalSupply().call().then(supply => {
        setTotalSupply(supply);
      });

      // Get contract balance
      web3.eth.getBalance(contractAddress).then(balance => {
        setContractBalance(balance);
      });
    }
  }, [web3]);

  useEffect(() => {
    if (web3 && account) {
      // Get wallet balance
      web3.eth.getBalance(account).then(balance => {
        setWalletBalance(balance);
      });
    }
  }, [web3, account]);

  const connectWallet = async () => {
    if (!connected) {
      try {
        await window.ethereum.enable();
        setConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      // Disconnect wallet
      web3.currentProvider.disconnect();
      setConnected(false);
    }
  };

  const handleStake = async () => {
    if (contract && account && stakeAmount !== '') {
      try {
        // Dönüşüm işlemi: stakeAmount'i büyük bir sayıya çeviriyoruz
        const stakeValue = web3.utils.toWei(stakeAmount, 'ether');
  
        // Perform stake transaction
        await contract.methods.stake(stakeValue).send({ from: account });
        alert('Stake successful!');
        setStakeAmount('');
      } catch (error) {
        console.error('Stake error:', error);
        alert('Stake failed!');
      }
    }
  };

  const handleClaimRewards = async () => {
    if (contract && account) {
      try {
        // Perform claim rewards transaction
        await contract.methods.claimReward().send({ from: account });
        alert('Claim rewards successful!');
      } catch (error) {
        console.error('Claim rewards error:', error);
        alert('Claim rewards failed!');
      }
    }
  };

  const handleWithdraw = async () => {
    if (contract && account) {
      try {
        // Perform withdraw transaction
        await contract.methods.withdraw().send({ from: account });
        alert('Withdraw successful!');
      } catch (error) {
        console.error('Withdraw error:', error);
        alert('Withdraw failed!');
      }
    }
  };
  


  const handleAirdrop = async () => {
    if (contract && account) {
      try {
        // Perform airdrop transaction
        await contract.methods.airdrop().send({ from: account });
        alert('Airdrop successful!');
      } catch (error) {
        console.error('Airdrop error:', error);
        alert('Airdrop failed!');
      }
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
      <br />
      {connected && (
        <div>
          <h3>PTK Total Supply: {totalSupply}</h3>
          <h3>Contract Balance: {contractBalance}</h3>
          <h3>Wallet Balance: {walletBalance}</h3>
          <h3>Staked Amount: {stakeAmount}</h3>
          <br />
          <label>
            Stake Amount:
            <input
              type="text"
              value={stakeAmount}
              onChange={e => setStakeAmount(e.target.value)}
            />
          </label>
          <button onClick={handleStake}>Stake</button>
          <button onClick={handleClaimRewards}>Claim Rewards</button>
          <button onClick={handleWithdraw}>Withdraw</button>
          <button onClick={handleAirdrop}>Airdrop</button>
        </div>
      )}
    </div>
  );
};

export default ContractComponent;
