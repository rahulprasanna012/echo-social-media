
import BackButton from '../create/BackButton'
import { CameraIcon, CloudUpload, Save, X } from 'lucide-react'
import UploadImage from '../UploadImage'
import Input from '../Input'
import SecondaryButton from '../SecondaryButton'
import { useRedirect } from '@/hooks/useRedirect'
import PrimaryButton from '../PrimaryButton'

const EditProfile = () => {

  const {redirect}=useRedirect()
  return (
    <div className='w-11/12 md:w-3/5 py-10 md:py-20 font-semibold'>
            <BackButton name='Edit Profile' content='Update your personal information'/>

      <form className=''>
          <h1 className='text-3xl'>Profile Information</h1>

          <div className='my-6'>
              <p className='my-3'>Cover Photo</p>

              <div className='bg-linear-to-r flex  rounded-lg items-center justify-center  from-purple-600 to-indigo-600 h-46'>
                <UploadImage classAdd="bg-white " id="cover-upload" image={<CloudUpload className='h-4 w-4' />}  title='Change cover'/>
              </div>
              
            
          </div>

        {/* profile photo */}
        <div className='my-3'>
            <p className='font-semibold'>Profile Photo</p>
            <div className='flex items-center'>

              <div className='bg-linear-to-tr from-purple-600 via-purple-600 to-indigo-600  text-2xl font-bold text-white size-24 rounded-full flex justify-center items-center  border-white border-4'><span>P</span></div>

              <UploadImage id="profile-upload" image={<CameraIcon className='h-4 w-4' />}  title='Change Photo'/>


            </div>

        </div>

        <Input title='Full Name' placeholder='Enter name' value=''type="text"  onChange={()=>{}}/>
        <label className='font-semibold '>Bio</label>
        <textarea
        className="textarea mb-3 mt-2 text-sm textarea-sm border border-purple-400 focus:shadow-purple-600 w-full bg-white"
        rows={5}
        placeholder="Tell us about youself...."
      ></textarea>

              <Input title='Location' placeholder='Where are you based' value=''type="text"  onChange={()=>{}}/>
              <Input title='Websites' placeholder='https://yourwebsites.com' value=''type="text"  onChange={()=>{}}/>
        <div className='flex items-center justify-end mt-4'>
          <SecondaryButton title='Cancel' icon={<X/>} onClick={()=>redirect('/profile')} style='mr-4' type='submit'/>
          <PrimaryButton title='Cancel' icon={<Save size={20}/>} onClick={()=>redirect('/profile')} style='' type='submit'/>
          
        </div>

      </form>

    </div>
  )
}

export default EditProfile