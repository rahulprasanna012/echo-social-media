import ProfileBar from './ProfileBar'
import { useRedirect } from '@/hooks/useRedirect'
import message from '../../assets/message.svg'
import ChatBox from './ChatBox'
import { messagesDummyData } from '@/assets/chat-app-assets/assets'
import InputBox from './InputBox'
import { useChat } from '@/context/ChatContext.tsx'
const ChatContainer = () => {

  const {selectedUser,setSelectedUser}=useChat()
  const {redirect}=useRedirect();

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
        
          currentUserId="680f5116f10f3cd28382ed02"
          messages={messagesDummyData}
        />
      </div>

      {/* Fixed input */}
      <div className="flex-shrink-0  bg-white">
        <InputBox onSend={()=>{}}   />
      </div>
    </main>
  )
}

export default ChatContainer