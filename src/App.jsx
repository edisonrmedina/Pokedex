import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Pokedex from './Components/Pokedex/Pokedex'
import PokemonId from './pages/PokemonId'
import ProtectedRoute from './Components/auth/ProtectedRoute'
function App() {
  return (
    <>
      <section className='font-["Inter"]'>
        <Routes>
          <Route path = '/' element ={<Home/>}/>
          <Route element ={<ProtectedRoute/>}>
            <Route path = '/pokedex' element ={<Pokedex/>}/>
            <Route path = '/pokedex/:name' element ={<PokemonId/>}/>
          </Route>
        </Routes>
      </section>
    </>
  )
}

export default App
