import type { Sidelist } from '@/types/sidebar'
import {v4 as uuidv4} from "uuid"

import SlideList from './SlideList'
import ProfileIcon from '../ProfileIcon'
import { useState } from 'react'

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


  const [isActive, setActive]=useState<boolean>(false)



  return (
    <section className='  bg-purple-50/70  h-full w-72 flex flex-col justify-evenly'>

            <div className=' px-4 flex items-center justify-center mr-4'>
                <div className='text-white font-bold bg-linear-to-br  from-purple-600 to-indigo-600 mr-4  rounded-3xl size-14 flex items-center justify-center shadow-lg  '>
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
                        <SlideList key={item.id} id={item.id} title={item.title} link={item.link}/>
                      ))
                    }

                </ul>
               


            </div>
             <hr className='text-gray-200'/>
            <div className='p-4 mr-4 flex items-center justify-center text-black '>
                <ProfileIcon/>
                  <div > 
                      <p>Prasanna S</p>
                      <p className='text-purple-600'>@rahulprasanna012</p>

                  </div>


            </div>


    </section>
  )
}

export default Sidebar