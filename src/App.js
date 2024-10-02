import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RegisterLand from './pages/RegisterLand';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homedash from './dash/Homedash';

const App = () => {
  return (
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/register'} element={<Search />} />
            <Route path={'/view'} element={<RegisterLand/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Signup/>} />
            <Route path={'/dash'} element={<Homedash/>} />


          </Routes>
        </BrowserRouter>
  );
};

export default App;
