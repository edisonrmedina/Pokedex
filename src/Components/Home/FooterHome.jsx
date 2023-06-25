import React from 'react'

const FooterHome = () => {
  return (
    <section className='relative'>
        <section className='bg-red-700 h-20'></section>
        <section className='bg-black h-14'></section>
        <div className='h-16 aspect-square bg-white border-[1px] border-black rounded-full absolute bottom-0 
        left-[50%] -translate-x-1/2 -translate-y-1/3
        after:content-[""] after:h-12  after:aspect-square after:bg-gray-700 after:rounded-full after:absolute
        after:top-1/2 after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[7px]
        after:border-black'></div>
    </section>
  )
}

export default FooterHome