import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mx-[16px] md:mx-[60px] mt-[32px]'>
      <div>
        <Header/>
      </div>
      <div className='mt-[32px]'>
        <Hero/>
      </div>
      <div className='mt-[32px] mb-[32px]'>
        <Footer/>
      </div>
    </div>
  )
}

export default Home