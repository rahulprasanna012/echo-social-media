import type { Sidelist } from '@/types/sidebar'
import { BellRing, House, MessageCircle, Search, SquarePen, User } from 'lucide-react'
import  { type FC, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'


type IconType={
    id:string,
    icon:ReactNode
}


const Icons:IconType[]=[

    {id:"home",
        icon:<House/>},
        {id:"messages",
        icon:<MessageCircle />},
        {id:"profile",
        icon:<User />},
        {id:"create",
        icon:<SquarePen />},
         {id:"search",
        icon:<Search />},
         {id:"notification",
        icon:<BellRing />},
          

]


const SlideList :FC<Sidelist>= ({id,title,link}) => {

    const location=useLocation();

    const isActive=link===location.pathname

  const foundIcon=Icons.find((i)=>i.id===title.toLowerCase())
  return (
    <li key={id}>
        <Link to={link}>
            <div className={`text-black flex p-2 hover:text-purple-600 hover:bg-purple-300/20  rounded-xl my-1 ${isActive?"text-purple-600 bg-purple-300/20":""}`} >
                {foundIcon?.icon}
                <p className='ml-3'>{title}</p>
            </div>
        </Link>
    </li>
  )
}

export default SlideList