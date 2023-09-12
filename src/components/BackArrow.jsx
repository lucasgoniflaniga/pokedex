import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackArrow = ({ ruta }) => {
    const navigate = useNavigate();
    console.log('valor de ruta ', ruta )
    return (
        <button
        className="btn-back btn btn-danger"
        onClick={() => {
          navigate(ruta);
        }}
      >
        <span>←</span>
      </button>

    );
}

export default BackArrow;