import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Font Awesome icons for the hamburger menu
import Logo from '../asset/Abuleshowo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  // Get the current path
  const currentPath = window.location.pathname;

  // Define a helper function to check if a link is active
  const isActive = (path) => currentPath === path;

  // Function to connect to MetaMask and get the user's wallet address
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request accounts from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Set the first account as the wallet address
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask to connect.');
    }
  };

  return (
    <header className="bg-[#066D8E] text-white py-4 px-8 rounded-[24px] flex justify-between items-center relative">
      {/* Logo */}
      <img src={Logo} alt="logo" className="h-6" />

      {/* Hamburger Menu (visible on small screens) */}
      <button
        className="block md:hidden focus:outline-none z-20"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`md:flex md:items-center md:space-x-8 font-normal md:relative md:bg-transparent transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'block absolute top-full right-0 w-full bg-[#066D8E] z-10 mt-2 rounded-[24px]'
            : 'hidden md:block'
        }`}
      >
        <a
          href="/"
          className={`block md:inline-block p-4 md:p-0 hover:text-white ${
            isActive('/') ? 'underline text-white font-medium' : ''
          }`}
        >
          Home
        </a>
        <a
          href="/register"
          className={`block md:inline-block p-4 md:p-0 hover:text-white ${
            isActive('/register') ? 'underline text-white font-medium' : ''
          }`}
        >
          Register
        </a>
        <a
          href="/transfer"
          className={`block md:inline-block p-4 md:p-0 hover:text-white ${
            isActive('/transfer') ? 'underline text-white font-medium' : ''
          }`}
        >
          Transfer
        </a>

        {/* Connect Wallet Button (included in mobile menu) */}
        <button
          className="block md:hidden mt-4 text-[#F7D9BC] hover:text-[#fcc999] py-2 px-4 rounded-lg"
          onClick={connectWallet}
        >
          {walletAddress ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4) : 'Connect Wallet'}
        </button>
      </nav>

      {/* Connect Wallet Button (visible on larger screens) */}
      <button
        className="hidden md:block border-2 border-[#F7D9BC] hover:bg-[#15495a] text-[#F7D9BC] py-2 px-4 rounded-lg"
        onClick={connectWallet}
      >
        {walletAddress ? walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4) : 'Connect Wallet'}
      </button>
    </header>
  );
};

export default Header;
