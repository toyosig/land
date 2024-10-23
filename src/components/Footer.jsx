import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#066D8E] py-8 rounded-[24px]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Land Registry</h3>
            <p className="text-sm">© 2024 Land Registry. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="/h" className="text-gray-200 hover:text-white">Privacy Policy</a>
            <a href="/k" className="text-gray-200 hover:text-white">Terms of Service</a>
            <a href="/l" className="text-gray-200 hover:text-white">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
