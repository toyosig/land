import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`fixed inset-0 bg-blue-600 text-white w-64 min-h-screen p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:relative lg:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        <ul>
          <li className="mb-4"><a href="/">Home</a></li>
          <li className="mb-4"><a href="#lands">Lands</a></li>
          <li className="mb-4"><a href="#register">Register Land</a></li>
        </ul>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-4 bg-blue-600 text-white fixed top-0 left-0 z-50">
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
    </>
  );
};

export default Sidebar;
