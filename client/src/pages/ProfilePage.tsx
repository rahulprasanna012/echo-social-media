// pages/ProfilePage.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Feeds from "@/components/home/Feeds";
import ProfileSection from "@/components/profile/ProfileSection";
import { getUserPosts } from "@/services/postService";
import type { PostTypes } from "@/types/post";

const ProfilePage = () => {
  const { userId = "" } = useParams<{ userId: string }>();

  const [posts, setPosts] = useState<PostTypes[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Keep a stable fetch function (changes only when userId changes)
  const fetchPosts = useCallback(
    async (next?: boolean) => {
      if (!userId) return;
      if (loading || (!hasNext && next)) return;

      setLoading(true);
      setError("");

      try {
        const data = await getUserPosts(userId, { limit: 5, cursor: next ? cursor : null });
        setPosts((prev) => (next ? [...prev, ...data.posts] : data.posts));
        setCursor(data.nextCursor);
        setHasNext(data.hasNext);
      } catch (e: any) {
        setError(e?.response?.data?.error || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    },
    // IMPORTANT: depend only on values that should reset the function
    [userId, cursor, hasNext, loading]
  );

  // Initial load (and when userId changes)
  useEffect(() => {
    // reset state first
    setPosts([]);
    setCursor(null);
    setHasNext(true);
    setError("");

    // call once; DON'T include fetchPosts in deps to avoid loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchPosts(false);
  }, [userId]); // <-- only userId

  // IntersectionObserver
  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          // call the current fetch without making this effect depend on it
          fetchPosts(true);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
    // DON'T include fetchPosts here; re-attaching while sentinel is visible
    // can cause rapid consecutive triggers.
  }, [hasNext, loading, userId]); // keep stable; re-create only on these

  return (
    <section className="text-black py-6 w-full m-auto flex flex-col md:flex-row md:items-start justify-center items-center">
      <div className="w-full md:w-[40%]">
        <ProfileSection />
      </div>

      <div className="w-11/12 md:w-1/2">
        {error && <p className="text-red-500 my-4">{error}</p>}

        {posts.map((p,idx) => (
          <Feeds key={idx} post={p} />
        ))}

        <div ref={loaderRef} className="py-6 flex justify-center">
          {loading && <span className="text-gray-400">Loading...</span>}
          {!hasNext && posts.length > 0 && <span className="text-gray-400">No more posts</span>}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
