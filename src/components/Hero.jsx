import React from 'react';
import house from '../asset/Gorgeous-Modern-Apartment-Design-removebg-preview.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <main className="flex flex-col md:flex-row items-center rounded-[24px] justify-between bg-[#066D8E] text-white h-auto md:h-[560px] px-4 md:px-6 py-8">
      {/* Text Section */}
      <div className="w-full md:hidden mt-8 mb-8 ">
        <img
          src={house} // Replace with the actual image URL or local path
          alt="Modern house with pool"
          className="w-full h-auto"
        />
      </div>
      <div className="w-full md:w-[560px]">
        <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
          Register, View And Transfer Land
        </h1>
        <p className="text-gray-300 text-base mt-4 md:text-lg">
          Simplify your real estate transactions with our seamless platform. Effortlessly register new properties, view detailed land records, and transfer ownership with just a few clicks.
        </p>
        <Link to={'/view'}>
          <button className="mt-8 bg-[#F7D9BC] hover:bg-[#f8d5b4] text-[#000000] w-[200px] md:w-[250px] h-[56px] md:h-[64px] rounded-lg">
            View Land
          </button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={house} // Replace with the actual image URL or local path
          alt="Modern house with pool"
          className="w-full h-auto"
        />
      </div>
    </main>
  );
};

export default Hero;
