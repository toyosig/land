import React from 'react';
import city from '../asset/city.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-blue-800 sm:text-5xl">
              Welcome to Land Registry
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              The Land Registry is a very sensitive part of the Bureau that is saddled with the responsibility of keeping an up-to-date record of all land transactions in the State.
            </p>
            <div className='flex flex-row space-x-4 mt-8'>
              <Link to="/register">
                <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Register
                </button>
              </Link>
              <Link to="/view">
                <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  View Land
                </button>
              </Link>
              <Link to="/transfer">
                <button className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Transfer
                </button>
              </Link>
            </div>


          </div>
          <div className="lg:col-span-1 relative">
            <img
              src={city} // Replace with your image URL
              alt="Land registry"
              className="w-full h-auto rounded-md shadow-lg"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-blue-800 opacity-25 rounded-md"></div>
            <div className="absolute -bottom-10 -right-10 hidden sm:w-64 sm:h-64 bg-white rounded-full border-4 border-dashed border-gray-200 overflow-hidden">
              <img
                src={city} // Replace with your image URL
                alt="Circle"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-20 -left-10 hidden sm:w-32 sm:h-32 bg-white rounded-full border-4 border-dashed border-gray-200 overflow-hidden">
              <img
                src={city} // Replace with your image URL
                alt="Small Circle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
