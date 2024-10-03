import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ABI } from '../AddressABI/ABI'; // ABI file
import { contractAddress } from '../AddressABI/contractAddress'; // Contract address
import Header from '../components/Header';

function ViewAllLands() {
  const [account, setAccount] = useState('');
  const [landRegistry, setLandRegistry] = useState(null);
  const [lands, setLands] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
          setErrorMessage('Failed to connect to Ethereum. Please try again.');
        }
      } else {
        window.alert('Please install MetaMask to use this feature.');
      }
    };

    loadBlockchainData();
  }, []);

  const fetchAllLands = async () => {
    setErrorMessage('');
    setLands([]);

    if (landRegistry) {
      try {
        const result = await landRegistry.methods.getAllLands().call();
        console.log('Fetched lands result:', result);

        if (!result || result.length === 0) {
          throw new Error('No lands returned from the contract.');
        }

        const landsData = result.map((land) => ({
          location: land[0],        // string
          size: land[1].toString(),  // uint256 - convert to string for display
          owner: land[2],           // address
          documentHash: land[3]     // string
        }));

        setLands(landsData);
      } catch (err) {
        console.error('Error fetching all lands:', err); // Log the entire error object
        setErrorMessage('Failed to fetch lands. Please try again or check the contract.');
      }
    } else {
      setErrorMessage('Land registry contract not loaded.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center mt-10 justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">View All Registered Lands</h2>
          <button
            onClick={fetchAllLands}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
          >
            Fetch All Lands
          </button>

          {errorMessage && (
            <p className="mt-4 text-red-600 text-center font-medium">{errorMessage}</p>
          )}

          {lands.length > 0 && (
            <table className="min-w-full bg-white mt-6">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Land ID</th>
                  <th className="px-4 py-2 border">Location</th>
                  <th className="px-4 py-2 border">Size (sqm)</th>
                  <th className="px-4 py-2 border">Owner</th>
                  <th className="px-4 py-2 border">Document Hash</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-center">{index}</td>
                    <td className="px-4 py-2 border">{land.location}</td>
                    <td className="px-4 py-2 border text-center">{land.size}</td>
                    <td className="px-4 py-2 border">{land.owner}</td>
                    <td className="px-4 py-2 border">{land.documentHash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllLands;
