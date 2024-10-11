import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LandRegistry from '../AddressABI/LandRegistry.json'; // Import your ABI JSON file
import Header from '../components/Header';
import { contractAddress } from '../AddressABI/contractAddress'; // Import contract address from the separate file

function Search() {
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [landRegistryContract, setLandRegistryContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          const contract = new web3.eth.Contract(LandRegistry.abi, contractAddress);
          setLandRegistryContract(contract);
          await fetchLands(contract);
        } else {
          setErrorMessage('Please install MetaMask to use this app.');
        }
      } catch (error) {
        console.error('Error loading blockchain data:', error);
        setErrorMessage('Failed to load blockchain data.');
      }
    };

    loadBlockchainData();
  }, []);

  const fetchLands = async (contract) => {
    try {
      const landCount = await contract.methods.landCount().call();
      const fetchedLands = [];
      for (let i = 0; i < landCount; i++) {
        const land = await contract.methods.lands(i).call();
        fetchedLands.push(land);
      }
      console.log(fetchedLands);
      setLands(fetchedLands);
      setFilteredLands(fetchedLands); // Initialize filtered lands
    } catch (error) {
      console.error('Error fetching lands:', error);
      setErrorMessage('Failed to fetch lands from the blockchain.');
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchInput(value);

    // Filter lands based on the owner address
    const filtered = lands.filter(land => land.owner.toLowerCase().includes(value.toLowerCase()));
    setFilteredLands(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Owner Address"
            value={searchInput}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

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
              {filteredLands.length > 0 ? (
                filteredLands.map((land, index) => (
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
      </div>
    </div>
  );
}

export default Search;