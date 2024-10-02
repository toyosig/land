import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Wallet = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request accounts access
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]); // Set the first account
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        console.error("Non-Ethereum browser detected. Please install MetaMask!");
      }
    };

    loadWeb3();
  }, []);

  return (
    <div>
      {account ? (
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </button>
      ) : (
        <button
          onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
