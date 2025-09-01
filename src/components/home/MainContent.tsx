
import Feeds from "./Feeds";
import PostForm from "./PostForm";
import { posts } from "@/lib/data";

const MainContent = () => {
  return (
    <section className="  text-black  w-full  flex justify-center items-center ">
      <div className="w-11/12 md:w-4/6 ">
        <div className= "p-10 md:p-20 text-center">
          <h1 className="text-purple-600 text-3xl font-bold">Welcome to Echo Hubs</h1>
          <p className="text-gray-500">Share your moments with the world</p>
        </div>
        
        {/* create post  */}
        <PostForm/>

        {/* displays feeds */}

        {
          posts?.map((post)=>(
            <Feeds post={post}/>
          ))

        }




      </div>
    </section>
  );
};

export default MainContent;
