import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Header from '../components/Header';
import { contractAddress } from '../AddressABI/contractAddress'; // Import the contract address
import { ABI } from '../AddressABI/ABI'; // Import the contract ABI

function RegisterLand() {
  const [account, setAccount] = useState('');
  const [landRegistry, setLandRegistry] = useState(null);
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      // Create contract instance using contract address and ABI
      const contract = new web3.eth.Contract(ABI, contractAddress);
      setLandRegistry(contract);

      // Fetch land data
      const landCount = await contract.methods.landCount().call();
      const landsList = [];
      for (let i = 0; i < landCount; i++) {
        const land = await contract.methods.lands(i).call();
        landsList.push({ ...land, id: i });
      }
      setLands(landsList);
    };

    loadBlockchainData();
  }, []);

  const transferLand = async (landId, newOwner) => {
    if (!newOwner || !Web3.utils.isAddress(newOwner)) {
      alert('Please provide a valid new owner address.');
      return;
    }

    try {
      await landRegistry.methods.transferLand(landId, newOwner).send({ from: account });
      alert(`Land with ID ${landId} successfully transferred to ${newOwner}`);
    } catch (error) {
      console.error('Error transferring land:', error);
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registered Lands</h2>
        <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Size (sqm)</th>
              <th className="py-3 px-6 text-left">Owner</th>
              <th className="py-3 px-6 text-left">Document Hash</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land) => (
              <tr key={land.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{land.id}</td>
                <td className="py-3 px-6">{land.location}</td>
                <td className="py-3 px-6">{land.size}</td>
                <td className="py-3 px-6">{land.owner}</td>
                <td className="py-3 px-6">{land.documentHash}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <input
                      type="text"
                      placeholder="New Owner Address"
                      id={`newOwner-${land.id}`}
                      className="mr-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() =>
                        transferLand(land.id, document.getElementById(`newOwner-${land.id}`).value)
                      }
                      className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
                    >
                      Transfer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegisterLand;
