import React from 'react';
import '../css/ButtonStart.css';

const ButtonStart = ({ onStartClick }) => {
  return (
    <div className="text-center mt-4">
      <button className="btn btn-danger" onClick={onStartClick}>
        START
      </button>
    </div>
  );
};

export default ButtonStart;
