import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ABI } from '../AddressABI/ABI'; // ABI file
import { contractAddress } from '../AddressABI/contractAddress'; // Contract address
import Header from '../components/Header';

function ViewAllLands() {
  const [account, setAccount] = useState('');
  const [landRegistry, setLandRegistry] = useState(null);
  const [lands, setLands] = useState([]);
  const [newOwner, setNewOwner] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
        const [locations, sizes, owners, documentHashes] = result;

        const allLands = locations.map((location, index) => ({
          landId: index,
          location,
          size: sizes[index],
          owner: owners[index],
          documentHash: documentHashes[index],
        }));

        setLands(allLands);
      } catch (err) {
        console.error('Error fetching all lands:', err);
        setErrorMessage('Failed to fetch lands. Please try again.');
      }
    }
  };

  const transferLand = async (landId) => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!newOwner) {
      setErrorMessage('Please enter a new owner address.');
      return;
    }

    if (landRegistry) {
      try {
        await landRegistry.methods.transferLand(landId, newOwner).send({ from: account });
        setSuccessMessage(`Land ${landId} transferred successfully to ${newOwner}.`);
        setNewOwner(''); // Clear the input field after transfer
        fetchAllLands(); // Refresh the land list
      } catch (err) {
        console.error('Error transferring land:', err);
        setErrorMessage('Failed to transfer land. Please try again.');
      }
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
          {successMessage && (
            <p className="mt-4 text-green-600 text-center font-medium">{successMessage}</p>
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
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lands.map((land) => (
                  <tr key={land.landId}>
                    <td className="px-4 py-2 border text-center">{land.landId}</td>
                    <td className="px-4 py-2 border">{land.location}</td>
                    <td className="px-4 py-2 border text-center">{land.size}</td>
                    <td className="px-4 py-2 border">{land.owner}</td>
                    <td className="px-4 py-2 border">{land.documentHash}</td>
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="text"
                        className="border p-1 mr-2"
                        placeholder="New owner address"
                        value={newOwner}
                        onChange={(e) => setNewOwner(e.target.value)}
                      />
                      <button
                        onClick={() => transferLand(land.landId)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition duration-300"
                      >
                        Transfer
                      </button>
                    </td>
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
