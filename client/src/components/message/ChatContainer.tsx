import ProfileBar from './ProfileBar'
import { useRedirect } from '@/hooks/useRedirect'
import message from '../../assets/message.svg'
import ChatBox from './ChatBox'

import InputBox from './InputBox'
import { useChat } from '@/context/ChatContext.tsx'
import { useEffect } from 'react'
import { useUser } from '@/context/UserContext.tsx'
const ChatContainer = () => {

  const {selectedUser,setSelectedUser,messages,getMessages}=useChat()
  const {user}=useUser()
  const {redirect}=useRedirect();

  


  useEffect(()=>{
    
    if (selectedUser){

    getMessages(selectedUser?._id)
   
      
  }


  },[selectedUser])
  

 
  

  const onBack=()=>{
    setSelectedUser(null)
    redirect("/")
  }

  if (!selectedUser) {
    return (
      <main className="h-screen flex items-center justify-center text-gray-500">
        <div className='flex flex-col items-center '>
        <img src={message} className='size-24'/>
        <p>Select a conversation to start chatting</p>


          </div>  
      </main>
    );
  }

  return (

    

    <main className="h-screen flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex-shrink-0  bg-white">
        <ProfileBar onBack={onBack} />
      </div>

      {/* Scrollable messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-gray-50">
        <ChatBox
        
          currentUserId={user?._id}
          messages={messages}
        />
      </div>

      {/* Fixed input */}
      <div className="flex-shrink-0  bg-white">
        <InputBox  />
      </div>
    </main>
  )
}

export default ChatContainer