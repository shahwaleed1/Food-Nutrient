import React from 'react'
import Navbar from './Navbar'
import Home from './Home'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-4'>
        <Home />
      </div>
    </div>
  )
}

export default App