import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";

const ContractComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [totalSupply, setTotalSupply] = useState("1,000,000 PTK");
  const [contractBalance, setContractBalance] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [stakedAmount, setStakedAmount] = useState("");

  const contractAddress = "0xdb7CA9F0b7687687A01C134CF9b8F5D3eC7Bf3eA"; 
  const abi = [
    {
      inputs: [],
      name: "airdrop",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimRewardsAndUnstake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "stake",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalStakedTokens",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalTokenSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  useEffect(() => {
    connectToWeb3();
  }, []);

  const connectToWeb3 = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);

        setConnected(true);
        await retrieveData();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask to connect your wallet");
    }
  };

  const retrieveData = async () => {
    await getTotalSupply();
    await getContractBalance();
    await getWalletBalance();
    await getStakedAmount();
  };

  const getTotalSupply = async () => {
    if (contract) {
      try {
        const supply = await contract.methods.totalSupply().call();
        setTotalSupply(supply.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getContractBalance = async () => {
    if (contract) {
      try {
        const balance = await contract.methods
          .balanceOf(contractAddress)
          .call();
        setContractBalance(balance.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getWalletBalance = async () => {
    if (contract && account) {
      try {
        const balance = await contract.methods.balanceOf(account).call();
        setWalletBalance(balance.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const formatTokenAmount = (amount) => {
    const decimals = 18;
    const formattedAmount = (amount / 10 ** decimals).toLocaleString("en-US");
    return formattedAmount;
  };

  const getStakedAmount = async () => {
    if (contract && account) {
      try {
        const amount = await contract.methods.getTotalStakedTokens().call();
        setStakedAmount(amount.toString());
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAirdrop = async () => {
    if (contract && account) {
      try {
        await contract.methods.airdrop().send({ from: account });
        await retrieveData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStake = async () => {
    if (contract && account && stakeAmount) {
      try {
        const amount = web3.utils.toWei(stakeAmount.toString(), "ether");
        await contract.methods.stake(amount).send({ from: account });
        await retrieveData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleWithdraw = async () => {
    if (contract && account) {
      try {
        await contract.methods.claimRewardsAndUnstake().send({ from: account });
        await retrieveData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="app-title">PATIKA($PTK) STAKING APP</h1>
      <p className="daily-return">Staking Reward: %1 a day (for now)</p>

      {connected ? (
        <div className="staking-container">
          <h2>Contract Information</h2>
          <p>Total Token Supply: {formatTokenAmount(totalSupply)}</p>
          <p>Contract Balance: {formatTokenAmount(contractBalance)}</p>
          <p>Wallet Balance: {formatTokenAmount(walletBalance)}</p>
          <p>Staked Amount: {formatTokenAmount(stakedAmount)}</p>

          <h2>Airdrop</h2>
          <button className="button airdrop-button" onClick={handleAirdrop}>
            Claim Airdrop (100 $PTK)
          </button>

          <h2>Staking</h2>
          <input
            className="input stake-input"
            type="text"
            placeholder="Stake amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
          />
          <button className="button stake-button" onClick={handleStake}>
            Stake
          </button>

          <h2>Withdraw</h2>
          <button className="button withdraw-button" onClick={handleWithdraw}>
            Claim Rewards and Unstake
          </button>
        </div>
      ) : (
        <button className="button connect-button" onClick={connectToWeb3}>
          Connect to Web3
        </button>
      )}
    </div>
  );
};

export default ContractComponent;
