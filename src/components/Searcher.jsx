import React, { useState } from 'react';

const Searcher = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="input-group">
      <div className="col-sm-6">
        <input
          className="form-control search-input mt-4"
          type="search"
          placeholder="Busca tu Pokémon..."
          value={searchTerm}
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
};

export default Searcher;
