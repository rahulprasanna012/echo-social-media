
import type { FeedReactionProps } from '@/types/post'
import  { type FC } from 'react'



const FeedReaction:FC<FeedReactionProps> = ({icon,content}) => {


  return (
    <button className='flex items-center cursor-pointer  hover:bg-red-50 p-1.5 rounded-md hover:text-red-400'>
                        {icon}
                        <p className='ml-2'>{content}</p>
                    </button>
  )
}

export default FeedReaction