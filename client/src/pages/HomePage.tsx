import Feeds from "@/components/home/Feeds";
import PostForm from "@/components/home/PostForm";
import { useEffect, useRef, useState } from "react";
import { getAllPost} from "@/services/postService";
import type { PostTypes } from "@/types/post.ts";

const HomePage = () => {
  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

 
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async (next?: boolean) => {
    if (loading || (!hasNext && next)) return;
    setLoading(true);
    setError("");

    try {
      const data = await getAllPost({ limit: 5, cursor: next ? cursor : null });
      setPosts((prev) => (next ? [...prev, ...data.posts] : data.posts));
      setCursor(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(false);
    
  }, []);

 
  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          fetchPosts(true);
        }
      },
      { rootMargin: "200px" } 
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [cursor, hasNext, loading]);


  
  return (
    <section className="text-black w-full flex justify-center items-center">
      <div className="w-11/12 md:w-3/5">
        <div className="p-10 md:p-20 text-center">
          <h1 className="text-purple-600 text-3xl font-bold">Welcome to Echo Hubs</h1>
          <p className="text-gray-500">Share your moments with the world</p>
        </div>

        {/* create post */}
        <PostForm />

        {/* error */}
        {error && <p className="text-red-500 my-4">{error}</p>}

        {/* feeds */}
        {posts.map((p,idx) => (
          <Feeds key={idx} post={p} />
        ))}

        {/* sentinel loader */}
        <div ref={loaderRef} className="py-6 flex justify-center">
          {loading && <span className="text-gray-400">Loading...</span>}
          {!hasNext && posts.length > 0 && (
            <span className="text-gray-400">No more posts</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
