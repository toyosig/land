import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {ABI} from '../AddressABI/ABI'; // ABI file
import { contractAddress } from '../AddressABI/contractAddress'; // Contract address
import Header from '../components/Header';

function RegisterLand() {
  const [account, setAccount] = useState('');
  const [landRegistry, setLandRegistry] = useState(null);
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const contract = new web3.eth.Contract(ABI, contractAddress);
          setLandRegistry(contract);
        } catch (error) {
          console.error('User denied account access or error:', error);
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const contract = new web3.eth.Contract(ABI, contractAddress);
        setLandRegistry(contract);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    loadBlockchainData();
  }, []);

  const handleRegisterLand = async (e) => {
    e.preventDefault();
    if (landRegistry) {
      try {
        await landRegistry.methods.registerLand(location, size, documentHash).send({ from: account });
        setSuccessMessage('Land registered successfully!');
        setLocation('');
        setSize('');
        setDocumentHash('');
      } catch (err) {
        console.error('Error registering land:', err);
        setSuccessMessage('Failed to register land.');
      }
    }
  };

  return (
      <div className="min-h-screen bg-gray-100 ">
      <Header/>
      <div className='flex items-center mt-10 justify-center'>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Register Land</h2>
          <form onSubmit={handleRegisterLand} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter land location"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Size (sqm):</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter land size"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Document Hash:</label>
              <input
                type="text"
                value={documentHash}
                onChange={(e) => setDocumentHash(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter document hash"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              Register
            </button>
          </form>
          {successMessage && (
            <p className="mt-4 text-green-600 text-center font-medium">{successMessage}</p>
          )}
        </div>
        </div>
      </div>


  );
}

export default RegisterLand;
