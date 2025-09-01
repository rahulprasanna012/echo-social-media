import { MessageCircle } from 'lucide-react'
import React from 'react'

const NoComments = () => {
  return (
    <div className="flex flex-col justify-center items-center">
        <div className="bg-purple-100 rounded-full">
          <MessageCircle className=" p-2 w-12 h-12 text-purple-600 " />
        </div>

        <p className="text-gray-500">No comments yet</p>
        <p className="text-gray-300 textarea-md">
          Be the first to share your thoughts!
        </p>
      </div>
  )
}

export default NoComments