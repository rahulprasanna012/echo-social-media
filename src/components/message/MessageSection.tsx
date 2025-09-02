import ChatList from './ChatList'
import ChatContainer from './ChatContainer'
import { useState } from 'react'

const MessageSection = () => {
  const [userSelected, setUserSelected] = useState<string>("")

  return (
    <div className="w-full grid grid-cols-6 h-screen overflow-hidden">
      {/* List (full width on mobile until a user is selected; fixed column on desktop) */}
      <aside
        className={`${userSelected ? "hidden" : "block"} md:block col-span-6 md:col-span-2 min-h-0`}
      >
        <ChatList setUserSelected={setUserSelected} userSelected={userSelected} />
      </aside>

      {/* Chat (hidden on mobile until a user is selected; always visible on desktop) */}
      <section
        className={`${userSelected ? "block" : "hidden"} md:block col-span-6 md:col-span-4 min-h-0`}
      >
        <ChatContainer setUserSelected={setUserSelected} userSelected={userSelected}/>
      </section>
    </div>
  )
}

export default MessageSection
