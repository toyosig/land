import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LandRegistry from '../AddressABI/LandRegistry.json'; // Import your ABI JSON file
import Header from '../components/Header';

function Search() {
  const [lands, setLands] = useState([]);
  const [landRegistryContract, setLandRegistryContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.enable();

          const networkId = await web3.eth.net.getId();
          const networkData = LandRegistry.networks[networkId];

          if (networkData) {
            const contract = new web3.eth.Contract(LandRegistry.abi, networkData.address);
            setLandRegistryContract(contract);
            await fetchLands(contract);
          } else {
            setErrorMessage('Smart contract not deployed on this network.');
            console.error('Smart contract not deployed on this network.');
          }
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
      console.log(fetchedLands); // Log fetched lands to the console
      setLands(fetchedLands);
    } catch (error) {
      console.error('Error fetching lands:', error);
      setErrorMessage('Failed to fetch lands from the blockchain.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="overflow-x-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (sqm)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Hash</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lands.length > 0 ? (
                lands.map((land, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.size.toString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.owner}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{land.documentHash}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
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
