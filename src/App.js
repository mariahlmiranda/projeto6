import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
      <Cart />
    </>
  );
}

export default App;
