import { Calendar } from 'lucide-react'


const ProfileSection = () => {
  return (
    <section className='m-6  my-10 md:my-0   bg-white rounded-lg'>

            <div className=' relative h-36 bg-linear-to-tr rounded-t-lg from-purple-600 via-purple-600 to-indigo-600 px-6'>

                <div className='absolute -bottom-16 bg-linear-to-tr from-purple-600 via-purple-600 to-indigo-600  text-2xl font-bold text-white size-28 rounded-full flex justify-center items-center  border-white border-4'><span>P</span></div>
            </div>
            <div className='mt-18 p-6'>
                    <div>
                        <p className='font-bold text-2xl'>Prasanna</p>
                        <p className='text-purple-600 text-sm font-semibold '>@rahulprasanna012</p>
                        <div className='flex my-6 text-gray-500 items-center text-sm'>
                            <Calendar size={16}/> Joined September 2025
                        </div>

                    </div>
                      <hr className='text-purple-100'/>

            </div>

          

            <ul className='flex w-60 justify-between p-6'>{
                
                ["posts","Followers","Following"].map((item,idx)=>(

                    <li key={idx} className='text-center'>
                        <p className='font-bold text-3xl'>0</p>
                        <p className='text-stone-500'>{item}</p>


                    </li>
                ))
                
                }

            </ul>
            <div className='p-6'>
                <button className='text-center hover:bg-gray-50 hover:text-black w-full rounded-lg cursor-pointer  border border-purple-300 text-purple-600 font-medium p-2'>
                Edit Profile
            </button>

            </div>
            

    </section>
  )
}

export default ProfileSection