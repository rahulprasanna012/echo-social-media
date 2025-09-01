import { BellRing, PanelRight } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-white/90 flex items-center justify-around p-4'>
        <button>
            <PanelRight className='text-black' />

        </button>
        <div className=' px-4 flex items-center justify-center mr-4'>
                <div className='text-white font-bold bg-linear-to-br  from-purple-800 to-indigo-600 mr-4  rounded-3xl size-14 flex items-center justify-center shadow-lg  '>
                        <p>EH</p>

                </div>
                <div>
                    <h1 className='text-black font-bold text-2xl'>Echo Hub</h1>
                    <p className='text-purple-600'>Connect & Share</p>
                </div>

            </div> 

            <button>
                <BellRing className='text-purple-600'/>
            </button>



    </header>
  )
}

export default Navbar