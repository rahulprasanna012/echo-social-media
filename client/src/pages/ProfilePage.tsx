import Feeds from '@/components/home/Feeds'
import ProfileSection from '@/components/profile/ProfileSection'
import { posts } from '@/lib/data'


const ProfilePage = () => {
  return (
    <section className='text-black py-6  w-full  m-auto flex flex-col md:flex-row   md:items-start justify-center items-center '>
      <div className='w-full md:w-[40%] '>
         <ProfileSection/>

      </div>
     

      <ul className='w-11/12 md:w-1/2 '>
        {
            posts?.map((post,idx)=>(
              <Feeds key={idx} post={post}/>
            ))
        }


      </ul>
      
      



    </section>
  )
}

export default ProfilePage