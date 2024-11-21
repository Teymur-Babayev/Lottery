import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import TicketSearch from '../../pages/Tickets';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Tickets' element={<TicketSearch />} />
    </Routes>
  )
}

export default AppRoutes;
