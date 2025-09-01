import React from 'react'
import Sidebar from './components/home/Sidebar'
import MainContent from './components/home/MainContent'
import Navbar from './components/home/Navbar'


const App = () => {
  return (
    <div>
      <Navbar/>
       <div className='bg-linear-to-tr from-purple-50 to-indigo-50 h-screen flex justify-start items-center'>
    
        <Sidebar/>
        <MainContent/>

    </div>
    </div>
   
  )
}

export default App