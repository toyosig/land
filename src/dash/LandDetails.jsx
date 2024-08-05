import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useParams } from 'react-router-dom';

const LandDetails = () => {
  const { id } = useParams();

  const lands = [
    { id: 1, owner: 'John Doe', address: '123 Main St', size: '500 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...', ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 2, owner: 'Jane Smith', address: '456 Oak St', size: '300 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...',ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 3, owner: 'John Doe', address: '789 Pine St', size: '700 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...', ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 4, owner: 'Jane Smith', address: '101 Maple St', size: '400 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...',ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
  ];

  const land = lands.find((land) => land.id === parseInt(id));

  if (!land) {
    return <div>Land not found</div>;
  }
  return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 p-4">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-bold mb-4">Land Details</h2>
              <p><strong>Owner:</strong> {land.owner}</p>
              <p><strong>Address:</strong> {land.address}</p>
              <p><strong>Size:</strong> {land.size}</p>
              <p><strong>Crypto Address:</strong> {land.cryptoAddress}</p>
              <p><strong>owner Address:</strong> {land.ownerAddress}</p>

            </div>

          </div>
        </div>
      </div>
  );
};

export default LandDetails;
