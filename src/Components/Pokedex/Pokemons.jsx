import React, { useEffect, useState } from 'react';
import Pokemon from './Pokemon';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Pokemons = ({ filter, pokemons, searchName }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(40); // Cantidad de Pokémon por página
  const [visiblePages, setVisiblePages] = useState([]); // Páginas visibles en el bloque actual
  const [searchedPokemons, setSearchedPokemons] = useState([]);

  useEffect(() => {
    setCurrentPage(1); // Restablecer la página actual al cambiar el filtro o la búsqueda
  }, [filter, searchName]);

  useEffect(() => {
    // Calcular páginas visibles en el bloque actual
    const calculateVisiblePages = () => {
      const totalPages = Math.ceil(searchedPokemons.length / pokemonPerPage);
      const currentPageIndex = currentPage - 1;
      const startPage = Math.floor(currentPageIndex / 5) * 5 + 1;
      const endPage = Math.min(startPage + 4, totalPages);

      const visiblePages = [];
      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
      setVisiblePages(visiblePages);
    };

    calculateVisiblePages();
  }, [currentPage, searchedPokemons, pokemonPerPage]);


  
  // Filtrar y buscar Pokémon
  useEffect(() => {
    const fetchPokemonData = async (pokemonUrl) => {
      try {
        const response = await axios.get(pokemonUrl);
        const pokemonData = response.data;
        return pokemonData;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    const filterPokemons = async () => {
      const filteredPokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          if (filter === 'All') {
            return pokemon;
          } else {
            const pokemonData = await fetchPokemonData(pokemon.url);
            const pokemonTypes = pokemonData?.types?.map(typeData => typeData.type.name);
            return pokemonTypes && pokemonTypes.includes(filter) ? pokemon : null;
          }
        })
      );
  
      const newSearchedPokemons = searchName
        ? filteredPokemons.filter(pokemon => pokemon && pokemon.name.toLowerCase().includes(searchName.toLowerCase()))
        : filteredPokemons.filter(pokemon => pokemon);
  
      setSearchedPokemons(newSearchedPokemons);
      setCurrentPage(1);
    };
  
    filterPokemons();
  }, [filter, pokemons, searchName]);

  // Obtener los índices de los Pokémon en la página actual
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemons = searchedPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  // Cambiar de página
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <section>
  {currentPokemons.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentPokemons.map(pokemon => (
        <Link to={`/pokedex/${pokemon.name}`} key={pokemon.url}>
        <Pokemon key={pokemon.url} pokemonUrl={pokemon.url} />
        </Link>
      ))}
    </div>
  ) : (
    <p>No Pokémon found.</p>
  )}

      {searchedPokemons.length > pokemonPerPage && (
        <div className="flex justify-center mt-5">
          {/* Botón de carga adicional */}
          {currentPage < Math.ceil(searchedPokemons.length / pokemonPerPage) - 1 && (
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => {
                if (currentPage > 5) {
                  handlePageChange(currentPage - 5);
                }
              }}
            >
              -
            </button>
          )}

          {/* Botón de página anterior */}
          {currentPage > 1 && (
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
          )}

          {/* Botones de páginas */}
          {visiblePages.map(pageNumber => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-2 bg-gray-200 rounded cursor-pointer ${
                currentPage === pageNumber ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          {/* Botón de página siguiente */}
          {currentPage < Math.ceil(searchedPokemons.length / pokemonPerPage) && (
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}

          {/* Botón de carga adicional */}
          {currentPage < Math.ceil(searchedPokemons.length / pokemonPerPage) - 1 && (
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded cursor-pointer"
              onClick={() => handlePageChange(currentPage + 5)}
            >
              +
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Pokemons;
