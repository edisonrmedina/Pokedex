import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokedexHeader from '../Components/Pokedex/PokedexHeader';

const URL = "https://pokeapi.co/api/v2/pokemon/";

const pokeLinearGradients = {
  grass: "bg-gradient-to-t from-green-400 to-green-600",
  fire: "bg-gradient-to-t from-red-600 to-yellow-400",
  normal: "bg-gradient-to-t from-gray-400 to-gray-600",
  ice: "bg-gradient-to-t from-blue-200 to-blue-400",
  fighting: "bg-gradient-to-t from-red-800 to-yellow-600",
  rock: "bg-gradient-to-t from-yellow-600 to-yellow-800",
  poison: "bg-gradient-to-t from-purple-400 to-purple-600",
  flying: "bg-gradient-to-t from-blue-400 to-blue-600",
  ground: "bg-gradient-to-t from-yellow-800 to-yellow-900",
  steel: "bg-gradient-to-t from-gray-600 to-gray-800",
  bug: "bg-gradient-to-t from-green-600 to-green-800",
  ghost: "bg-gradient-to-t from-purple-600 to-purple-800",
  electric: "bg-gradient-to-t from-yellow-400 to-yellow-600",
  psychic: "bg-gradient-to-t from-pink-400 to-pink-600",
  dragon: "bg-gradient-to-t from-purple-900 to-indigo-700",
  dark: "bg-gradient-to-t from-gray-800 to-gray-900",
  fairy: "bg-gradient-to-t from-pink-300 to-pink-500",
  unknown: "bg-gradient-to-t from-gray-300 to-gray-500",
  shadow: "bg-gradient-to-t from-gray-700 to-black",
  water: "bg-gradient-to-t from-blue-500 to-blue-700",
};

const PokemonId = () => {
  const { name } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);

  useEffect(() => {
    axios
      .get(URL + name)
      .then(({ data }) => {
        setPokemonDetail(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [name]);

  const calculateBarWidth = (baseStat) => {
    return (baseStat / 255) * 100 + "%";
  };

  return (
    <>
      <PokedexHeader />
      <section className='p-12 grid grid-cols-1 gap-4'>
        
        <div className={`${pokeLinearGradients[pokemonDetail?.types[0].type.name]} shadow-md rounded-lg p-4 transform`}>
            <div className='grid grid-cols-2'>
              <img
                src={pokemonDetail?.sprites.other["official-artwork"].front_default}
                alt={pokemonDetail?.name}
                className=""
              />
              <div className="align-middle relative grid-cols-2">
                <h1 className="absolute left-[31%] top-[35%] text-white text-2xl md:text-6xl sm:text-4xl">
                  {pokemonDetail?.name}
                </h1>
                <h3 className="absolute left-[20%] top-[50%] text-white text-1xl md:text-4xl sm:text-2xl">
                  Peso
                </h3>
                <h3 className="absolute left-[20%] top-[57%] text-base md:text-3xl sm:text-2xl">
                  {pokemonDetail?.weight}
                </h3>
                <h3 className="absolute left-[70%] top-[50%] text-white text-1xl md:text-4xl sm:text-2xl">
                  Altura
                </h3>
                <h3 className="absolute left-[70%] top-[57%] text-base md:text-3xl sm:text-2xl">
                  {pokemonDetail?.height}
                </h3>
              </div>
            </div>
        </div>

        <div className='bg-gray-200 shadow-md rounded-lg p-4 transform grid grid-cols-2'>
            <div className='bg-gray-100 shadow-md rounded-lg p-4 transform '>
              <h1 className='text-center'>Tipo</h1>
              <div className='flex gap-3'>
                  {/* <div className='bg-gray-200 shadow-md rounded-lg p-4 transform flex gap-1'>1</div>
                  <div className='bg-gray-200 shadow-md rounded-lg p-4 transform flex gap-1'>2</div> */}
                  {pokemonDetail?.types.map(type => 
                    <div className={`${pokeLinearGradients[pokemonDetail?.types[0].type.name]}shadow-md rounded-lg p-4`} >{type.type.name}</div>)
                  }
              </div>
            </div>
            <div className='bg-gray-100 shadow-md rounded-lg p-4 transform '>
              <h1 className='text-center'>Habilidades</h1>
              <div className="flex gap-3">
                {pokemonDetail?.abilities.map((abilitie, i) => {
                    return (<div className="bg-slate-50-100 shadow-md rounded-lg p-4">
                    {abilitie.ability.name}
                  </div>)
                  
                })}
              </div>
            </div>
        </div>

        <div className='bg-gray-200 shadow-md rounded-lg p-4 transform '>
        <article>
          <section>
            <h4>Stats</h4>
            <section>
              {pokemonDetail?.stats.map((stat) => (
                <div key={stat.stat.url}>
                  <h6>{stat.stat.name}</h6>
                  <span>{stat.base_stat}</span>
                  <div
                    className="bg-gray-300 h-8 rounded-md overflow-hidden"
                    
                  >
                      <div 
                        style={{width: calculateBarWidth(stat.base_stat)}}
                        className='h-full bg-yellow-500'
                        >

                      </div>
                  </div>
                  
                </div>
              ))}
            </section>
          </section>
        </article>
        </div>
      </section>
    </>
  );
};

export default PokemonId;
