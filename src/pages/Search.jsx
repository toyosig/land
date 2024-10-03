import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LandRegistry from '../AddressABI/LandRegistry.json'; // Import your ABI JSON file
import Header from '../components/Header';

function Search() {
  const [lands, setLands] = useState([]);
  const [landRegistryContract, setLandRegistryContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        const networkId = await web3.eth.net.getId();
        const networkData = LandRegistry.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(LandRegistry.abi, networkData.address);
          setLandRegistryContract(contract);
          fetchLands(contract);
        } else {
          alert('Smart contract not deployed on this network.');
        }
      } else {
        alert('Please install MetaMask to use this app.');
      }
    };

    loadBlockchainData();
  }, []);

  const fetchLands = async (contract) => {
    const landCount = await contract.methods.landCount().call();
    const fetchedLands = [];
    for (let i = 0; i < landCount; i++) {
      const land = await contract.methods.lands(i).call();
      fetchedLands.push(land);
    }
    setLands(fetchedLands);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Land #</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Size (sqm)</th>
              <th className="px-4 py-2 border">Owner</th>
              <th className="px-4 py-2 border">Document Hash</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{land.location}</td>
                <td className="px-4 py-2 border">{land.size}</td>
                <td className="px-4 py-2 border">{land.owner}</td>
                <td className="px-4 py-2 border">{land.documentHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
