import React, { useEffect, useState } from 'react';
import PokedexHeader from './PokedexHeader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Pokemons from './Pokemons';

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon?limit=1281';
const URL_TYPES = 'https://pokeapi.co/api/v2/type/';

const Pokedex = () => {
  const nameTrainer = useSelector(store => store.nameTrainer);
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get(URL_BASE)
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios.get(URL_TYPES)
      .then(({ data }) => {
        setTypes(data.results);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    axios.get(URL_TYPES)
      .then(({ data }) => {
        setTypes(data.results);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    setSearchName(event.target.form[0].value);
  };

  return (
    <main>
      <PokedexHeader />
      <div className="p-8">
      <p>
        <span>Welcome {nameTrainer},</span> Here you can find your favorite Pokemon
      </p>
      </div>
      <div className="p-8">
      <form>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded"
              placeholder="Search"
            />
            <button
              className="px-5 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 focus:bg-red-800"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

          <select
            className="p-2 border rounded border-gray-300  "
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {types.map((type) => (
              <option
                key={type.name}
                value={type.name}
                
              >
                {type.name}
              </option>
            ))}
          </select>
      </form>
      </div>
      <div className="p-10">
        <Pokemons filter={filter} pokemons={pokemons} searchName={searchName} />
      </div>
    </main>
  );
};

export default Pokedex;
