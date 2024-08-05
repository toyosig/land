import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div>
        <Hero/>
      </div>
      <div>
        <About/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Home