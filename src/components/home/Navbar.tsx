import { BellRing, PanelRight } from 'lucide-react'
import React, { type FC } from 'react'

type Props={
  handleClick:()=>void;
}

const Navbar:FC<Props> = ({handleClick}) => {


  
  return (
    <header className='md:hidden  bg-blue flex items-center justify-around p-4'>
        <button className='cursor-pointer group' onClick={handleClick}>
            <PanelRight className='text-black group-hover:scale-105' />

        </button>
        <div className=' px-4 flex items-center justify-center mr-4'>
                <div className='text-white font-bold bg-linear-to-br  from-purple-600 to-indigo-600 mr-4  rounded-3xl size-14 flex items-center justify-center shadow-lg  '>
                        <p>EH</p>

                </div>
                <div>
                    <h1 className='text-black font-bold text-2xl'>Echo Hub</h1>
                    <p className='text-purple-600'>Connect & Share</p>
                </div>

            </div> 

            <button className='cursor-pointer group'>
                <BellRing className='text-purple-600 group-hover:scale-105'/>
            </button>



    </header>
  )
}

export default Navbar