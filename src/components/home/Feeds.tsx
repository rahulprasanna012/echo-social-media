import type { PostTypes } from '@/types/post'
import { Bookmark, ChevronDown, HeartIcon, MessageCircle,  Send,  Share2Icon } from 'lucide-react'
import  { type FC } from 'react'
import ProfileIcon from '../ProfileIcon'

interface PropsTypes{
    post:PostTypes
}


const Feeds:FC<PropsTypes> = ({post}) => {
   const { id, userId, content, date, image, likes_count, comments_count, share_count, labels }=post
   
  return (
    <section className='bg-white  p-6 rounded-lg my-6  shadow hover:shadow-purple-300' key={id}>

        <div >
            <div className='flex items-center py-6'>
                <div className='text-white font-bold bg-linear-to-br  from-purple-600 to-indigo-600  rounded-3xl size-12 mr-2 flex items-center justify-center shadow-lg border-2 border-purple-300'>
                    <p>P</p>

                </div>
            <div>
                <p className='font-bold'>{userId}</p>
                <p className='text-purple-600 text-sm'>{date.toLocaleString()}</p>

            </div>


            </div>
            
            {
                content&&<div >{content}</div>
            }
            {
                image&&<img src={image} alt="post" className=' w-full rounded-2xl mt-6'/>
            }

            <ul className='flex items-center justify-start py-6'>
                {
                    labels?.map((item)=>(
                    <li key={item} className='bg-purple-100 text-sm mx-4 text-purple-600 rounded-4xl px-2 p-1'>{item}</li>))
                }
            </ul>

            <div className='flex justify-between py-6'>
                <div className='flex justify-around w-60'>
                    <button className='flex items-center cursor-pointer group hover:bg-red-50 p-1.5 rounded-md'>
                        <HeartIcon className='group-hover:text-red-400'/>
                        <p className='ml-2 group-hover:text-red-400'>{likes_count}</p>
                    </button>
                    <button className='flex items-center cursor-pointer group hover:bg-red-50 p-1.5 rounded-md'>
                        <MessageCircle className='group-hover:text-red-400'/>
                        <p className='ml-2 group-hover:text-red-400'>{comments_count}</p>
                      
                    </button>
                    <button className='flex items-center cursor-pointer group hover:bg-red-50 p-1.5 rounded-md'>
                        <Share2Icon className='group-hover:text-red-400'/>
                        <p className='ml-2 group-hover:text-red-400'>{share_count}</p>

                    
                    </button>

                </div>
                <Bookmark />
            </div>

               <hr className='text-gray-200'/>
            <button className='my-6 p-2.5 rounded-md flex items-center justify-between w-full cursor-pointer hover:bg-purple-100 hover:text-purple-600'>
                <div className='flex items-center '>
                    <MessageCircle/>
                    <p className='ml-2'>Comments</p>
                </div>

                
                <ChevronDown />

            </button>

            <div>
                
                    <div className=' flex '>
                        
                        <ProfileIcon/>
                        <textarea className='border border-purple-400 w-full textarea textarea-sm bg-white text-black' placeholder='Write a Comment....' ></textarea>

                    </div>
                <div className='flex justify-end items-center'>    
                    <button className='  bg-linear-to-r from-purple-400  to-indigo-300 p-2 flex items-center px-4 text-white rounded-lg mt-2 cursor-pointer'>
                        <Send size={20}/>
                        <span className='ml-2'>Comment</span>

                    </button>



                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-purple-100 rounded-full'>
                        <MessageCircle className=" p-2 w-12 h-12 text-purple-600 " />
                    </div>
                    
                    <p className='text-gray-500'>No comments yet</p>
                    <p className='text-gray-300 textarea-md'>Be the first to share your thoughts!</p>

                </div>


            </div>
          

        </div>



    </section>
  )
}

export default Feeds