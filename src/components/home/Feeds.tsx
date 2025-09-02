import type { FeedReactionProps, PostTypes } from '@/types/post'
import { Bookmark, ChevronDown, ChevronUp, HeartIcon, MessageCircle,  Send } from 'lucide-react'
import  { useState, type FC } from 'react'

import FeedProfile from './FeedProfile'
import FeedLabel from './FeedLabel'
import FeedReaction from './FeedReaction'
import FeedComments from './FeedComments'

interface PropsTypes{
    post:PostTypes
}


const Feeds:FC<PropsTypes> = ({post}) => {
   const { id, userId, content, date, image, likes_count, comments_count, share_count, labels,comments }=post

   const [isComment,setIsComment]=useState<boolean>(false)
   const reactions:FeedReactionProps[]=[{

                    icon:<HeartIcon/>,
                    content:likes_count
                },
                {

                    icon:<MessageCircle/>,
                    content:comments_count
                },
                {

                    icon:<Send/>,
                    content:share_count
                },
                

            
            ]
   
  return (
    <section className='bg-white  p-6 rounded-lg my-6  shadow hover:shadow-purple-300' key={id}>

       
            <FeedProfile userId={userId} date={date}/>
            {
                content&&<div >{content}</div>
            }
            {
                image&&<img src={image} alt="post" className=' w-full rounded-2xl mt-6'/>
            }

            <ul className='flex items-center justify-start py-6'>
                {
                    labels?.map((item,idx)=>(
                    <FeedLabel key={idx} label={item}/>))
                }
            </ul>
            <div className='flex justify-between py-6'>
                <ul className='flex justify-around w-60'>
                    {
                        reactions.map((item,idx)=>(
                            <FeedReaction key={idx} icon={item.icon} content={item.content}/>
                        ))
                    }
                    
                </ul>
                <Bookmark />
            </div>

               <hr className='text-gray-200'/>
            <button className='my-6 p-2.5 rounded-md flex items-center justify-between w-full cursor-pointer hover:bg-purple-100 hover:text-purple-600' onClick={()=>setIsComment(!isComment)}>
                <div className='flex items-center '>
                    <MessageCircle/>
                    <p className='ml-2'>Comments</p>
                </div>

                {
                    isComment?<ChevronUp/>:<ChevronDown />
                }
                
            </button>
            
            <div>
                {
                    isComment&&<FeedComments userId={userId} date={date} content={comments_count} commentsList={comments}/>
                }


            </div>
            
          

        



    </section>
  )
}

export default Feeds