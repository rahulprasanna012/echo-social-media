import { MessageCircle } from 'lucide-react'

const NoChatList = () => {
  return (
    <div className='h-1/2  flex flex-col justify-center items-center'>
            <div className='bg-gradient-to-bl from-purple-600 to-indigo-600 size-16 rounded-full flex justify-center items-center'>

                <MessageCircle className='text-white '/>
            </div>
            <h1 className='font-bold'>No conversations yet</h1>
            <p className='text-gray-400'>Start a conversation with someone!</p>


    </div>
  )
}

export default NoChatList