
import PostForm from '../home/PostForm'
import BackButton from './BackButton'

const CreatePost = () => {

   
  return (
    <div className='w-11/12 md:w-3/5 py-10 md:py-20'>

        <BackButton name="Create New Post" content='Share your thoughts with the world'/>
      <PostForm/>


      </div>
  )
}

export default CreatePost