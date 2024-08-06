import React, { useState } from 'react';

const Wallet = () => {
  const [connectedAddress, setConnectedAddress] = useState(null);

  const handleConnectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Set the connected address
        setConnectedAddress(accounts[0]);
      } else {
        alert('Please install MetaMask to connect your wallet.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };
  const disconnect = () => {
    setConnectedAddress(null)
  }

  return (
    <div>
      {connectedAddress ? (
        <p onClick={disconnect} className='px-4 py-2 cursor-pointer'>Connected Wallet: {connectedAddress}</p>
      ) : (
        <button
          onClick={handleConnectWallet}
          className="bg-white hover:bg-gray-200 text-blue-800 px-4 py-2 rounded-2xl"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
