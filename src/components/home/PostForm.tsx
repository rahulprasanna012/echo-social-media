import  { useState, type ChangeEvent } from "react";
import ProfileIcon from "../ProfileIcon";
import { Image, X } from "lucide-react";

const PostForm = () => {
  const [file, setFile] = useState<string | null>(null);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <form className=" bg-white p-6 rounded-lg">
      <div className="flex items-center ">
        <ProfileIcon className="rounded-3xl size-12 mr-3" title="P"/>

        <p className="text-2xl font-semibold">What's on your mind?</p>
      </div>

      <textarea
        className="textarea my-6 text-sm textarea-sm border border-purple-400 focus:shadow-purple-600 w-full bg-white"
        rows={8}
        placeholder="Share your Thoughts"
      ></textarea>
      <div className="pb-6">
        <label className="font-semibold">Tags (Optinal)</label>
        <br />
        <input
          className="input w-full border border-purple-400 focus:shadow-purple-600  bg-white"
          type="text"
          placeholder="#socialmedia #lifestyle #photograph"
        />
        <p className="text-gray-400 text-sm">Separate tags with spaces</p>
      </div>
    
            {
                file&&(<div className="flex items-start justify-center">
               
                
                    <img src={file} className="size-96"/>
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
        <button className="font-bold bg-linear-to-r from-purple-400  to-indigo-300 p-3 px-4 cursor-pointer hover:shadow text-white rounded-2xl">
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
