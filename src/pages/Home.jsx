import React from 'react'
import FooterHome from '../Components/Home/FooterHome'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => { 
    e.preventDefault();
    const nameTraine = e.target.nameTrainer.value
    dispatch(setNameTrainerGlobal(nameTraine))
    // Proteger rutas
    navigate("/pokedex")
  }

  return (
    <>
    <main className="grid grid-rows-[1fr_auto] px-52  pt-[2rem] pb-[8rem]">
      {/* Seccion superior */}
      <section className="flex flex-col gap-2 items-center justify-center ">
        <div>
          <img src="/images/logo.png" alt="Logo Pokedex" className="mx-auto" />
        </div>
        <h3 className='text-red-700 text-4xl p-10'>¡Hello, Trainer!</h3>
        <p>For start, give me your name:</p>
        <form onSubmit={handleSubmit}>
          <input className="p-2 mr-2 border border-gray-300 rounded" id="nameTrainer" type="text" required />
          <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:bg-red-700">
            Start!!
          </button>
        </form>
      </section>
    </main>

    <FooterHome/>
    </>
  )
}

export default Home