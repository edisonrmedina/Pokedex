import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../../store/slices/nameTrainer.slice';

const PokedexHeader = () => {

  const dispatch = useDispatch();

  const handleLogout = () => { 
    dispatch(setNameTrainerGlobal(""));
   }

   return (
    <section className='relative'>
      <section className='bg-red-700 h-20 relative'>
        <div className='absolute left-0 bottom-0 w-[220px] sm:w-[450px]'>
          <img src="/images/logo.png" alt="" />
        </div>
        <button className="absolute top-1 right-1 text-white font-bold text-xl"
                onClick={handleLogout}>Logout</button>
      </section>
      <section className='bg-black h-12'></section>
      <div className='h-16 aspect-square bg-white border-[3px] border-black rounded-full absolute -bottom-10 right-0 -translate-x-1/2 -translate-y-1/3 after:content-[""] after:h-12  after:aspect-square after:bg-gray-700 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[8px] after:border-black'></div>
    </section>
  );
  
}

export default PokedexHeader