import React from 'react';
import LandList from '../components/LandList';

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-2/3 p-4">
        <LandList />
      </div>
    </div>
  );
};

export default Dashboard;
