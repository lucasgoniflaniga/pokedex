import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Searcher from '../components/Searcher';
import BackArrow from '../components/BackArrow';
import Navbar from '../components/Navbar';
import '../css/PokeGrid.css';

export default function PokeGrid({ hidePokeGrid }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonData, setPokemonData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritePokemon, setFavoritePokemon] = useState(
    JSON.parse(localStorage.getItem('favoritePokemon')) || {}
  );

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('favoritePokemon');
    });

    return () => {
      window.removeEventListener('beforeunload', () => {
        localStorage.removeItem('favoritePokemon');
      });
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${(currentPage - 1) * 30}`
        );
        const results = response.data.results;
        const detailedData = [];

        const fetchPokemonDetails = async (pokemonUrl) => {
          const detailedResponse = await axios.get(pokemonUrl);
          return detailedResponse.data;
        };

        for (const pokemon of results) {
          const pokemonDetails = await fetchPokemonDetails(pokemon.url);
          detailedData.push(pokemonDetails);
        }

        setPokemonData(detailedData);
        setSearchResults(detailedData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const toggleFavorite = (id) => {
    const updatedFavorites = { ...favoritePokemon };
    updatedFavorites[id] = !updatedFavorites[id];
    setFavoritePokemon(updatedFavorites);
    localStorage.setItem('favoritePokemon', JSON.stringify(updatedFavorites));
  };

  const searchPokemon = (searchTerm) => {
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredPokemon);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredResults = showFavorites
    ? searchResults.filter((pokemon) => favoritePokemon[pokemon.id])
    : searchResults;

  return (
    <>
      <Navbar />
      <div className="poke-grid">
        <BackArrow ruta={'/'} />
        <div className="row">
          <div className="col-md-6 mb-3">
            <Searcher onSearch={searchPokemon} />
          </div>
          <div className="col-md-6 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check form-check-inline">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="favoriteFilter"
                  checked={showFavorites}
                  onChange={() => setShowFavorites(!showFavorites)}
                />
                <label className="form-check-label" htmlFor="favoriteFilter">
                  Mostrar Favoritos
                </label>
              </div>
              <div className="pagination">
                <button
                  className="btn btn-danger"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <button className="btn btn-danger ml-2" onClick={nextPage}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row">
            {filteredResults.map((pokemon) => (
              <div className="col-md-4 mb-4" key={pokemon.id}>
                <div className="card h-100" style={{ position: 'relative' }}>
                  <button
                    className="btn btn-favorite"
                    onClick={() => toggleFavorite(pokemon.id)}
                  >
                    {favoritePokemon[pokemon.id] ? '❤️' : '🤍'}
                  </button>
                  <Link to={`/pokedex/${pokemon.id}`}>
                    <img
                      src={pokemon.sprites.other.dream_world.front_default}
                      alt={pokemon.name}
                      className="card-img-top p-2"
                      loading="lazy"
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title mt-auto">
                        #{pokemon.id} {pokemon.name}
                      </h5>
                      <p className="card-text">
                        Type(s):{' '}
                        {pokemon.types.map((typeInfo) => (
                          <span key={typeInfo.type.name}>
                            {typeInfo.type.name}{' '}
                          </span>
                        ))}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
