import SecondaryButton from '../SecondaryButton'
import { PlusIcon, Search } from 'lucide-react'
import { userDummyData } from '@/assets/chat-app-assets/assets'
import ChatProfile from './ChatProfile'

const ChatList = ({ setUserSelected, userSelected }: any) => {
  const getSelectedUser = (id: string) => setUserSelected(id)

  return (
    <section className="bg-white h-full w-full max-w-full md:max-w-[360px] shadow flex flex-col">
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-bold text-2xl">Message</h1>
          <SecondaryButton
            icon={<PlusIcon size={16} />}
            onClick={() => {}}
            style=""
            title=""
            type="button"
          />
        </div>

        <div className="flex items-center border border-purple-200 p-2 rounded-md">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="border-0 outline-none ml-2 flex-1"
          />
        </div>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide min-h-0">
        {userDummyData?.map((profile) => (
          <ChatProfile
            name={profile.fullName}
            key={profile._id}
            profile={profile.profilePic}
            id={profile._id}
            getSelectedUser={getSelectedUser}
            userSelected={userSelected}
          />
        ))}
      </div>
    </section>
  )
}

export default ChatList
