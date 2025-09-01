import React from 'react'
import Sidebar from './components/home/Sidebar'
import MainContent from './components/home/MainContent'


const App = () => {
  return (
    <div className='bg-linear-to-tr from-purple-50 to-indigo-50 h-screen'>
        <Sidebar/>
        <MainContent/>

    </div>
  )
}

export default App