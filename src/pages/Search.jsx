import React, { useState } from 'react';
import Header from '../components/Header';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Simulate search logic
    const mockResults = [
      { id: 1, name: 'Land Parcel 1', location: 'Location 1' },
      { id: 2, name: 'Land Parcel 2', location: 'Location 2' },
    ];

    // Filter results based on search query
    const filteredResults = mockResults.filter(result =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div>
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Search Land Registry</h2>

        {/* Introduction Section */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">
            Welcome to the Land Registry search page. Here, you can search for land parcels by name and location. 
            Simply enter your search criteria in the input field below and click the "Search" button to see the results.
          </p>
          <p className="mt-4 text-gray-700">
            Our database contains a comprehensive record of land parcels, including details such as location and ownership. 
            Whether you're a potential buyer, a real estate agent, or just curious, our search tool makes it easy to find the information you need.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-md flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-3 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for land parcels..."
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="mt-6">
          {results.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {results.map(result => (
                <li key={result.id} className="bg-white p-6 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-blue-700">{result.name}</h3>
                  <p className="text-gray-700">{result.location}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
