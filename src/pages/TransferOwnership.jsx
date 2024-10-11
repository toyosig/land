import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LandRegistry from '../AddressABI/LandRegistry.json'; // Assuming you have the contract ABI JSON here
import Header from '../components/Header'; // Assuming you have a Header component
import { contractAddress } from '../AddressABI/contractAddress'; // Import the contract address

const TransferOwnership = () => {
  const [landRegistryContract, setLandRegistryContract] = useState(null);
  const [landId, setLandId] = useState('');
  const [lands, setLands] = useState([]);
  const [newOwner, setNewOwner] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  // Load Web3 and contract data
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0]; // Get the first account
          setCurrentAccount(account); // Save the current account

          // Use the imported contract address directly
          const contract = new web3.eth.Contract(LandRegistry.abi, contractAddress);
          setLandRegistryContract(contract);
          // Fetch lands after setting the contract and current account
          await fetchLands(contract, account); 
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
          setErrorMessage('Failed to connect to MetaMask.');
        }
      } else {
        alert('Please install MetaMask to use this app.');
      }
    };

    loadBlockchainData();
  }, []);

  const fetchLands = async (contract, account) => {
    try {
      const landCount = await contract.methods.landCount().call();
      const fetchedLands = [];
      for (let i = 0; i < landCount; i++) {
        const land = await contract.methods.lands(i).call();
        // Only add the land if the owner matches the current account
        if (land.owner.toLowerCase() === account.toLowerCase()) {
          fetchedLands.push(land);
        }
      }
      console.log(fetchedLands); // Log filtered lands to the console
      setLands(fetchedLands);
    } catch (error) {
      console.error('Error fetching lands:', error);
      setErrorMessage('Failed to fetch lands from the blockchain.');
    }
  };

  // Handle land ownership transfer
  const handleTransferOwnership = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!landId || !newOwner) {
      setErrorMessage('Please fill in both the Land ID and the new owner address.');
      return;
    }

    if (landRegistryContract) {
      try {
        setLoading(true);
        await landRegistryContract.methods
          .transferLand(landId, newOwner)
          .send({ from: currentAccount });
        setSuccessMessage(`Ownership of land ID ${landId} transferred to ${newOwner}`);
        setLandId('');
        setNewOwner('');

        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        console.error('Error transferring ownership:', err);
        setErrorMessage('Failed to transfer ownership. Please ensure you are the owner and try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (sqm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Longitude</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latitude</th>

            </tr>
          </thead>
          <tbody>
            {lands.length > 0 ? (
              lands.map((land, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.size.toString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.documentHash}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.longitude}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.latitude}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-2 border text-center">
                  {errorMessage || 'No lands found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Transfer Land Ownership</h2>
          <form onSubmit={handleTransferOwnership} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Land ID:</label>
              <input
                type="number"
                value={landId}
                onChange={(e) => setLandId(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the land ID"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">New Owner Address:</label>
              <input
                type="text"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter the new owner's address"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Transferring...' : 'Transfer Ownership'}
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 text-center font-medium">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-600 text-center font-medium">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferOwnership;
