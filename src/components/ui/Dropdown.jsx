import React, { useState } from 'react';

const Dropdown = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="relative">
      <button className="text-white hover:text-white" onClick={toggleDropdown}>
        User
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[250px] sm:w-[180px] lg:w-[200px] z-20 flex flex-col items-center bg-white rounded-md shadow-lg transform translate-x-[-20%] ut:translate-x-[-50%] se:translate-x-[-30%]  md:translate-x-[30%]  lg:translate-x-[50%] translate-y-[10%]">
            <React.Fragment>
              <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-blue-200">
                Login
              </a>
              <a href="/register" className="block px-4 py-2 text-gray-800 hover-bg-blue-200">
                Create Account
              </a>
            </React.Fragment>
        </div>
      )}
    </div>
  );
};

export default Dropdown;