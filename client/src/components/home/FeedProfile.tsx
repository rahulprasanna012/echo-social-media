import  { type FC } from 'react'
import ProfileIcon from '../ProfileIcon'
import type { FeedProfileProps } from '@/types/post'

const FeedProfile:FC<FeedProfileProps> = ({userId,date}) => {
  return (
    <div className='flex items-center py-6'>
                <ProfileIcon className='rounded-3xl size-12 mr-2' title="P"/>
            <div>
                <p className='font-bold'>{userId}</p>
                <p className='text-purple-600 text-sm'>{date?.toLocaleString()}</p>

            </div>


            </div>
  )
}

export default FeedProfile