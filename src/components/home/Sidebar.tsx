import type { Sidelist } from '@/types/sidebar'
import {v4 as uuidv4} from "uuid"
import React from 'react'
import SlideList from './SlideList'

const Sidebar = () => {
  const SIDEITEMS:Sidelist[]=[

      {
        id:uuidv4(),
        title:"Home",
        link:"/"
      },
      {
        id:uuidv4(),
        title:"Messages",
        link:"/message"
      },
      {
        id:uuidv4(),
        title:"Profile",
        link:"/profile"
      },
       {
        id:uuidv4(),
        title:"Create",
        link:"/post"
      },
      {
        id:uuidv4(),
        title:"Search",
        link:"/search"
      },
      {
        id:uuidv4(),
        title:"Notification",
        link:"/notification"
      },



  ]

  return (
    <section className='bg-white h-full w-72 flex flex-col justify-evenly'>

            <div className=' px-4 flex items-center justify-center mr-4'>
                <div className='text-white font-bold bg-linear-to-br  from-purple-800 to-indigo-600 mr-4  rounded-3xl size-14 flex items-center justify-center shadow-lg  '>
                        <p>EH</p>

                </div>
                <div>
                    <h1 className='text-black font-bold text-2xl'>Echo Hub</h1>
                    <p className='text-purple-600'>Connect & Share</p>
                </div>

            </div> 
            <hr className='text-gray-200'/>

            <div className='px-6'>
                <ul>
                    {
                      SIDEITEMS.map((item)=>(
                        <SlideList id={item.id} title={item.title} link={item.link}/>
                      ))
                    }

                </ul>
               


            </div>
             <hr className='text-gray-200'/>
            <div className='p-4 mr-4 flex items-center justify-center text-black '>
                  <div className="text-white font-bold bg-linear-to-br  from-purple-800 to-indigo-600  rounded-3xl size-12 mr-2 flex items-center justify-center shadow-lg " >
                      <p>P</p>
                  </div>
                  <div > 
                      <p>Prasanna S</p>
                      <p>@rahulprasanna012</p>

                  </div>


            </div>


    </section>
  )
}

export default Sidebar