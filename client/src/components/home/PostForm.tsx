import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import ProfileIcon from "../ProfileIcon";
import { Image, X } from "lucide-react";
import { useUser } from "@/context/UserContext.tsx";
import { createPost } from "@/services/postService.ts";

const MAX_MB = 10; // keep in sync with your server's multer limit
const ALLOWED = ["image/jpeg","image/png","image/webp","image/gif"];

const PostForm = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [label, setLabel] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user, loading, handleLoading } = useUser();

  const revokePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const validateFile = (f: File) => {
    if (f.size > MAX_MB * 1024 * 1024) {
      throw new Error(`File too large. Max ${MAX_MB}MB allowed.`);
    }
    if (!ALLOWED.includes(f.type)) {
      throw new Error("Unsupported file type. Use JPG, PNG, WEBP, or GIF.");
    }
  };

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      validateFile(f);
      revokePreview(); // clean previous
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
    } catch (err) {
      // Show your toast/snackbar here if you have one
      console.error((err as Error).message);
      setFile(null);
      // reset the input so user can pick the same file again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearImage = () => {
    setFile(null);
    revokePreview();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim() && !file) return; // nothing to post

    handleLoading(true);
    try {
      // Build FormData to match your server expectations
      const fd = new FormData();
      fd.append("content", content.trim());
      if (label.trim()) fd.append("label", label.trim());
      if (file) fd.append("image", file);

      await createPost(fd); // ensure your service does api.post(..., fd)

      // reset form
      setContent("");
      setLabel("");
      clearImage();
    } catch (err) {
      console.error(err);
      // toast error if you have a UI lib
    } finally {
      handleLoading(false);
    }
  };

  const avatar = user?.profile;
  const initial = user?.name?.[0] ?? "?";

  return (
    <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
      <div className="flex items-center">
        {avatar ? (
          <img src={avatar} alt={user?.name ?? "User"} className="size-12 rounded-full mr-2" />
        ) : (
          <ProfileIcon className="rounded-3xl size-12 mr-3" title={initial} />
        )}
        <p className="text-2xl font-semibold">What's on your mind?</p>
      </div>

      <textarea
        className="textarea my-6 text-sm textarea-sm border border-purple-400 focus:shadow-purple-600 w-full bg-white"
        rows={8}
        placeholder="Share your thoughts"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="pb-6">
        <label className="font-semibold">Tags (Optional)</label>
        <br />
        <input
          className="input w-full border border-purple-400 focus:shadow-purple-600 bg-white"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="#socialmedia #lifestyle #photography"
        />
        <p className="text-gray-400 text-sm">Separate tags with spaces</p>
      </div>

      {previewUrl && (
        <div className="flex items-start justify-center mb-4">
          <img src={previewUrl} className="max-h-96 rounded" alt="preview" />
          <button
            type="button"                 // ✅ don't submit the form
            className="cursor-pointer border rounded-full ml-3 p-1"
            onClick={clearImage}
            aria-label="Remove image"
            title="Remove image"
          >
            <X className="text-red-500" />
          </button>
        </div>
      )}

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
          ref={fileInputRef}
          type="file"
          accept={ALLOWED.join(",")}
          onChange={uploadImage}
          className="hidden"
        />

        <button
          type="submit"
          disabled={loading || (!content.trim() && !file)}
          className="font-bold bg-linear-to-r from-purple-400 to-indigo-300 p-3 px-4 cursor-pointer hover:shadow text-white rounded-2xl disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
