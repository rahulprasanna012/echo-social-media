import  {  useState, type ChangeEvent, type FormEvent } from "react";
import ProfileIcon from "../ProfileIcon";
import { Image, X } from "lucide-react";
import { useUser } from "@/context/UserContext.tsx";
import { createPost } from "@/services/postService.ts";



const PostForm = () => {
  const [prevfile, setPrevFile] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [content,setContent]=useState("")
  const [label,setLabel]=useState("")

  const {user,loading,handleLoading}=useUser();


  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPrevFile(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0])
    }
  };

   


  const handleSubmit=async (e:FormEvent<HTMLFormElement>)=>{

    e.preventDefault()
    handleLoading(true)
    const formaData={
      content,
      label,
      file
    }

    try{

      await createPost(formaData)

      setContent("")
      setFile(null)
      setLabel("")
      setPrevFile("")

    }catch(err){

      console.error(err)
    }finally{
      handleLoading(false)
    }
    


  }

  
  
  return (
    <form className=" bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="flex items-center ">

        {
          user?.profile?    <img src={user.profile} alt={user.name} className="size-12 rounded-full mr-2"/>    :<ProfileIcon className="rounded-3xl size-12 mr-3" title={user?.name[0]}/>
        }
        

        <p className="text-2xl font-semibold">What's on your mind?</p>
      </div>

      <textarea
        className="textarea my-6 text-sm textarea-sm border border-purple-400 focus:shadow-purple-600 w-full bg-white"
        rows={8}
        placeholder="Share your Thoughts"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      ></textarea>
      <div className="pb-6">
        <label className="font-semibold">Tags (Optinal)</label>
        <br />
        <input
          className="input w-full border border-purple-400 focus:shadow-purple-600  bg-white"
          type="text"
          value={label}
          onChange={(e)=>setLabel(e.target.value)}
          placeholder="#socialmedia #lifestyle #photograph"
        />
        <p className="text-gray-400 text-sm">Separate tags with spaces</p>
      </div>
    
            {
                prevfile&&(<div className="flex items-start justify-center">
               
                
                    <img src={prevfile} className="size-96"/>
                    <button className="cursor-pointer border rounded-full ml-11" onClick={()=>setFile(null)}><X className="text-red-500"/> </button>
                

                


            </div>)

            }
            
            
        


      <hr />
      <div className="py-6 flex items-center justify-between">
        <label
          htmlFor="image-upload"
          className="flex items-center font-medium gap-2 border border-purple-200 text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md cursor-pointer"
        >
          <Image className="w-4 h-4" />
          <span>Add Photo</span>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="hidden"
        />
        <button type="submit" className="font-bold bg-linear-to-r from-purple-400  to-indigo-300 p-3 px-4 cursor-pointer hover:shadow text-white rounded-2xl">
          {loading?"posting...":"post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
