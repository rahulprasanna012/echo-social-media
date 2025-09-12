
import { useChat } from '@/context/ChatContext.tsx'
import ProfileIcon from '../ProfileIcon'
import SecondaryButton from '../SecondaryButton'
import { ChevronLeft } from 'lucide-react'
import { useUser } from '@/context/UserContext.tsx'

const ProfileBar = ({onBack}:any) => {

  const {selectedUser}=useChat()
  const{onlineUser}=useUser()

   
  return (
    <div className='flex w-full justify-between px-6 p-2 bg-white'>
        <div className='flex items-center'>
            {
            selectedUser?.profile?<img
          src={selectedUser.profile}
          alt={`${selectedUser.username} profile`}
          className="rounded-full size-14 border"
        />:          <ProfileIcon className="rounded-full size-14" title={selectedUser?.username[0].toUpperCase()} />

        }
            <div className='ml-2'>
                 <p className='font-semibold'>{selectedUser?.username}</p>
                <p>{onlineUser.includes(selectedUser?._id)?"online":"offline" }</p>


            </div>
           

        </div>

        <SecondaryButton icon={<ChevronLeft />} style='p-1' type='button' onClick={onBack} title=''/>
        
    </div>
  )
}

export default ProfileBar