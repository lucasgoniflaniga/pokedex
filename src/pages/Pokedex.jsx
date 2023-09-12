import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'

import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import BackArrow from '../components/BackArrow'
import '../css/Pokedex.css';

export default function Pokedex() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = response.data;

        const pokemonInfo = {
          id: data.id,
          name: data.name,
          types: data.types.map((type) => type.type.name),
          weight: data.weight,
          height: data.height,
          sprites: data.sprites,
        };

        setPokemonData(pokemonInfo);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    getPokemonData();
  }, [id]);

  return (
    
    <>
    <Navbar />

    <div className="container-pokedex">
      

      <div className='back-arrow'>

      <BackArrow ruta={'/pokegrid'} />

      </div>

      <div className="body-pokedex">
        
        {pokemonData ? (
          <div>
            <h2>{`#${pokemonData.id} ${pokemonData.name}`}</h2>
            <p>Type(s): {pokemonData.types.join(', ')}</p>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
            <p>Weight (WT): {pokemonData.weight}</p>
            <p>Height (HT): {pokemonData.height}</p>
            </div>
        ) : (
          <p>Loading Pokémon data...</p>
        )}
      </div>
    </div>
    </>
  );
};


