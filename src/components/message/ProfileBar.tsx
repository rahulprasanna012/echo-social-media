
import ProfileIcon from '../ProfileIcon'
import SecondaryButton from '../SecondaryButton'
import { ChevronLeft } from 'lucide-react'

const ProfileBar = ({onBack}:any) => {

   
  return (
    <div className='flex w-full justify-between px-6 p-2 bg-white'>
        <div className='flex items-center'>
            <ProfileIcon title='p' className='mr-2  rounded-full size-12 '/>
            <div>
                 <p className='font-semibold'>Prasanna</p>
                <p>online</p>


            </div>
           

        </div>

        <SecondaryButton icon={<ChevronLeft />} style='p-1' type='button' onClick={onBack} title=''/>
        
    </div>
  )
}

export default ProfileBar