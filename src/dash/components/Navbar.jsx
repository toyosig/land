import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-lg font-bold">Land Registry Dashboard</div>
      <div>
        <button className="bg-blue-500 px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
