import axios from 'axios'
import React, { useEffect, useState } from 'react'

  const Pokemon = ({pokemonUrl}) => {
    // Vamos a traernos el pokemon por la url 
    const [pokemonData, setpokemonData] = useState(null)
    
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

    useEffect(() => {
        axios.get(pokemonUrl).then(({data}) => { 
          setpokemonData(data);
         }).catch((error) => { console.log(error); })
    }, [])

    return (
      <div className={`border-[10px] rounded-l`}>
        {/* seccion superior */}
        <section className={`relative h-20 ${pokeLinearGradients[pokemonData?.types[0].type.name]}`}>
          <div className="absolute px-[26%] -bottom-14 flex justify-center items-center">
            <img
              src={pokemonData?.sprites.other["official-artwork"].front_default}
              alt={pokemonData?.name}
              className="max-h-[200px] max-w-[150px]"
            />
          </div>
        </section>
        {/* seccion inferior */}
        <section className="flex flex-col items-center justify-center">
          <h3 className={` mt-12 `} style={{ color: pokeLinearGradients[pokemonData?.types[0].type.name] }}>
            {pokemonData?.name}
          </h3>
          <h5>{pokemonData?.types.map(type => type.type.name).join(" / ")}</h5>
          <span className='p-4'>type</span>
          <hr className="h-[1px] w-80 border-none bg-black " />
            <section className="grid grid-cols-2 gap-x-16 py-1">
              {/* lista de stats */}
              {pokemonData?.stats.slice(0, 4).map((stat) => (
                <div key={stat.stat.url}>
                  <h6 style={{ color: pokeLinearGradients[pokemonData?.types[0].type.name] }}>
                    {stat.stat.name}
                  </h6>
                  <p className="pr-4 py-2 rounded-md ">
                    {stat.base_stat}
                  </p>
                </div>
              ))}
            </section>

        </section>
      </div>
    );
    
}

export default Pokemon
