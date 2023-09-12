import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PokeGrid from './pages/PokeGrid';
import Pokedex from './pages/Pokedex'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokegrid" element={<PokeGrid />} />
        <Route path="/pokedex/:id" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>

 

  );
}
