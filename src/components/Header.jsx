import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import Wallet from './Wallet';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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
          <div className='flex flex-1 items-center justify-center'>
            <Wallet/>

          </div>

        </div>
      )}
    </div>
  );
};

export default Header;