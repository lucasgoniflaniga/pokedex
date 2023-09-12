import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PokeGrid from './PokeGrid'; 
import {  useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [showPokeGrid, setShowPokeGrid] = useState(false);
  const navigate = useNavigate()
  
  const handleStartClick = () => {
    setShowPokeGrid(true);
  };

  const hidePokeGrid = () => {
    setShowPokeGrid(false);
  };



  return (
    <div>

      <Navbar />
      {!showPokeGrid ? (
        <div className="text-center mt-4">
          <button className="btn-start btn btn-danger" onClick={()  => {navigate('pokegrid')}}>
            START
          </button>
        </div>
      ) : (
        <PokeGrid hidePokeGrid={hidePokeGrid} />
      )}
    </div>
  );
};

export default LandingPage;
