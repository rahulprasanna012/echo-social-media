import React from 'react'
import ProfileIcon from '../ProfileIcon'
import type { FeedProfileProps } from '@/types/post'

type FeedCommentsListProps=FeedProfileProps&{
    comment:string
}

const FeedCommentsList:React.FC<FeedCommentsListProps> = ({userId,date,comment}) => {
  return (
    <li className="flex items-center mb-2">
        <ProfileIcon className="rounded-3xl size-10 mr-2" title={userId[1]} />
        <div>
          <div className="md:flex items-center space-x-2">
            <p className="font-semibold text-md">{userId}</p>
            <p className="text-[12px] md:text-sm text-gray-400">{date?.toLocaleString()}</p>
          </div>

          <p className="text-sm mt-2">{comment}</p>
        </div>
      </li>
  )
}

export default FeedCommentsList