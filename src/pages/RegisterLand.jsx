import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LandRegistry from '../AddressABI/LandRegistry.json'; // Import your ABI JSON file
import Header from '../components/Header'; // Assuming you have a Header component
import { contractAddress } from '../AddressABI/contractAddress';

const RegisterLand = () => {
  const [account, setAccount] = useState('');
  const [landRegistryContract, setLandRegistryContract] = useState(null);
  const [location, setLocation] = useState(''); // This will store the generated address
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [size, setSize] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [generatedHash, setGeneratedHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Web3 and contract data
  useEffect(() => {
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const contract = new web3.eth.Contract(LandRegistry.abi, contractAddress);
          setLandRegistryContract(contract);
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

  // Fetch the address using latitude and longitude with Nominatim API
  const generateAddressFromLatLong = async (lat, long) => {
    try {
      console.log('Fetching address with:', lat, long); // Debugging log
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      console.log('Address data:', data); // Debugging log

      if (data && data.display_name) {
        setLocation(data.display_name); // This is the full address
        setErrorMessage('');
      } else {
        setErrorMessage('Address not found');
      }
    } catch (error) {
      setErrorMessage('Failed to fetch address');
      console.error('Error fetching address:', error);
    }
  };

  // Handle document upload and hash generation
  const handleUploadDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = reader.result;

        // Basic document validation
        if (fileContent.includes(location) && fileContent.includes('occupancy')) {
          const combinedContent = `${location}\n${fileContent}`;

          const hash = await generateHash(combinedContent);
          setGeneratedHash(hash);
          setDocumentHash(hash);
          setUploadedDocument(file);
          setErrorMessage('');
        } else {
          setErrorMessage('Invalid or fake document');
          setDocumentHash('');
          setUploadedDocument(null);
        }
      };
      reader.readAsText(file);
    }
  };

  // Function to generate a SHA-256 hash
  const generateHash = async (content) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Handle land registration
  const handleRegisterLand = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!location || !size || !documentHash) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (documentHash !== generatedHash) {
      setErrorMessage('The document hash does not match the generated hash.');
      return;
    }

    if (landRegistryContract) {
      try {
        setLoading(true);
        await landRegistryContract.methods
          .registerLand(location, size, documentHash)
          .send({ from: account });
        setSuccessMessage('Land registered successfully!');
        setLocation('');
        setSize('');
        setDocumentHash('');
        setUploadedDocument(null);

        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (err) {
        console.error('Error registering land:', err);
        setErrorMessage('Failed to register land. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle latitude and longitude input and fetch the address
  const handleLatLongSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked Generate Address with:', latitude, longitude); // Debugging log
    if (latitude && longitude) {
      generateAddressFromLatLong(latitude, longitude);
    } else {
      setErrorMessage('Please provide both latitude and longitude.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Register Land</h2>
          <form onSubmit={handleRegisterLand} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-2">Latitude:</label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter latitude"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Longitude:</label>
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter longitude"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={handleLatLongSubmit} // Ensure button is type "button"
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              >
                Generate Address
              </button>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Location (Generated from Latitude/Longitude):</label>
              <input
                type="text"
                value={location}
                readOnly
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Size (sqm):</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter land size"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Upload Document:</label>
              <input
                type="file"
                accept=".txt"
                onChange={handleUploadDocument}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-2">Document Hash:</label>
              <input
                type="text"
                value={documentHash}
                readOnly
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
            >
              {loading ? 'Registering...' : 'Register Land'}
            </button>
            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLand;
