import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RegisterLand from './pages/RegisterLand';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TransferOwnership from './pages/TransferOwnership';

const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/view'} element={<Search />} />
            <Route path={'/register'} element={<RegisterLand/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Signup/>} />
            <Route path={'/transfer'} element={<TransferOwnership/>} />


          </Routes>
        </BrowserRouter>
  );
};

export default App;
