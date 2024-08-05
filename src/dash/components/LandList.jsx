import React from 'react';
import { Link } from 'react-router-dom';

const LandList = () => {
  const lands = [
    { id: 1, owner: 'John Doe', address: '123 Main St', size: '500 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...', ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 2, owner: 'Jane Smith', address: '456 Oak St', size: '300 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...',ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 3, owner: 'John Doe', address: '789 Pine St', size: '700 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...', ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
    { id: 4, owner: 'Jane Smith', address: '101 Maple St', size: '400 sqm', cryptoAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...',ownerAddress: '0x095418a82bc2439703b69fbe1210824f2247d77c...'  },
  ];

  return (
    <div className=" shadow rounded">
      <h2 className="text-xl font-bold mb-4">Registered Lands</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-8 py-2">Owner</th>
            <th className="px-8 py-2">Address</th>
            <th className="px-8 py-2">Size</th>
            <th className="px-8 py-2">Crypto Address</th>
            <th className="px-8 py-2">owner Address</th>

          </tr>
        </thead>
        <tbody>
          {lands.map((land) => (
            <tr key={land.id}>
              <td className="border px-4 py-2">
                <Link to={`/land/${land.id}`} className="text-blue-500 hover:underline">
                  {land.owner}
                </Link>
              </td>
              <td className="border px-8 py-2">{land.address}</td>
              <td className="border px-8 py-2">{land.size}</td>
              <td className="border px-8 py-2">{land.cryptoAddress}</td>
              <td className="border px-8 py-2">{land.ownerAddress}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LandList;
