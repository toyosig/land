import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from './ui/Dropdown';
import Wallet from './Wallet';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className='text-white'>
      <nav className="flex flex-row justify-between items-center w-screen xs:h-[64px] h-[56px] bg-blue-800">
        <section className="lg:mx-[120px] sm:mx-[60px] mx-[24px] flex flex-row justify-between items-center w-screen">
          <Link to="/">
            <h1 className=" text-white font-bold">Regisry</h1>
          </Link>

          <div className="hidden sm:flex">

            <Wallet/>
          </div>

          <div className="sm:hidden">
            <button
              className=""
              onClick={toggleMobileMenu}
            >
              Menu
            </button>
          </div>
        </section>
      </nav>

      {mobileMenuOpen && (
        <div className="bg-blue-800 py-4 sm:hidden">
          <Link
            to="/"
            className={`block text-center py-2 ${
              activeTab === '/' && 'text-blue-200 font-semibold'
            }`}
            onClick={() => {
              setActiveTab('Home');
              setMobileMenuOpen(false);
            }}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`block text-center py-2 ${
              activeTab === '/search' && 'text-blue-200 font-semibold'
            }`}
            onClick={() => {
              setActiveTab('search');
              setMobileMenuOpen(false);
            }}
          >
            Search
          </Link>
          <Wallet/>

        </div>
      )}
    </div>
  );
};

export default Header;